pragma solidity 0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";

contract Crowdfunding is ReentrancyGuard {
    // List of existing projects
    Project[] private projects;

    // Event that will be emitted whenever a new project is started
    event ProjectStarted(
        address contractAddress,
        address payable projectStarter,
        uint256 deadline,
        uint256 goalAmount
    );
 

    /** @dev Function to start a new project.
      * @param durationInHours Project deadline in days
      * @param amountToRaise Project goal in wei
      */
    function startProject(
        uint durationInHours,
        uint amountToRaise
    ) external payable returns(address) {
        uint raiseUntil = block.timestamp + (durationInHours * (1 hours));
        Project newProject = new Project(payable(msg.sender), raiseUntil, amountToRaise);
        projects.push(newProject);
        require(msg.value >= amountToRaise/400, "Need to pay a fee");
        require(amountToRaise>=500000000000000000, "Minimum buy not met");
        emit ProjectStarted(
            address(newProject),
            payable(msg.sender),
            raiseUntil,
            amountToRaise
        );
        return address(newProject);
    }      
    /** @dev Function to withdraw any fees collected from proposers to the Multisig wallet.
      */
    function Withdraw() public nonReentrant {
        require(msg.sender == 0x7A9f92eC451Cfad5684ee2eA957e8592C2B7928a, "Only Multisig can withdraw");         //only Multisig can withdraw                                                                                                                  
        payable(msg.sender).transfer(address(this).balance);
    }

    /** @dev Function to view the balance aka all the fees collected from proposers.
      */
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    /** @dev Function to get all projects' contract addresses.
      * @return A list of all projects' contract addreses
      */
    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }
    
}


contract Project {    
    // Data structures
    enum State {
        Fundraising,
        Expired,
        Successful
    }

    // State variables
    address payable public creator; // proposer
    uint public amountGoal; // price of the nft
    uint public completeAt;
    uint256 public currentBalance; // amount raised so far
    uint public raiseBy; // expiry
    State public state = State.Fundraising; // initialize on create
    mapping (address => uint) public contributions;
    address payable public multisig = payable(0x7A9f92eC451Cfad5684ee2eA957e8592C2B7928a);
    
    // Event that will be emitted whenever funding will be received
    event FundingReceived(address contributor, uint amount, uint currentTotal);
    // Event that will be emitted whenever the project starter has received the funds
    event CreatorPaid(address recipient);
    //Event that Multisig vault is paid
    event MultisigPaid(address _multisig);

    // Modifier to check current state
    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    constructor
    (
        address payable projectStarter,
        uint fundRaisingDeadline,
        uint goalAmount
        
    ) public {
        creator = projectStarter;
        amountGoal = goalAmount;
        raiseBy = fundRaisingDeadline;
        currentBalance = 0;
        
    }


    /** @dev Function to calculate the maximum amount that needs to be collected for that proposal (NFT PRICE + 1% FEE TO PROPOSER + 3% FEE TO OMNIPOOLS).
      */
    function getMaximumAmount() public view returns(uint) {
        uint maximumAmount = amountGoal * 104 / 100;
        return maximumAmount;
    } 


    /** @dev Function to fund a certain project.
      */
    function contribute() external inState(State.Fundraising) payable {
       // need to cap the total contributions of the party to the goal amount
        require(currentBalance + msg.value <= getMaximumAmount(), "Cannot contribute more than the max amount");

        contributions[msg.sender] = contributions[msg.sender] + (msg.value);
        currentBalance = currentBalance + (msg.value);
        emit FundingReceived(msg.sender, msg.value, currentBalance);
        checkIfFundingCompleteOrExpired();
    }

    /** @dev Function to change the project state depending on conditions.
      */
    function checkIfFundingCompleteOrExpired() public {
        if (currentBalance >= getMaximumAmount()) {
            state = State.Successful;
            payOut();
            completeAt = block.timestamp;
        } else if (block.timestamp > raiseBy)  {
            state = State.Expired;
            completeAt = block.timestamp;
        }
    }

    /** @dev Function to give the received funds to proposer and to the Multisig wallet which we will use to buy the NFT.
      */
    function payOut() internal inState(State.Successful) returns (bool) {
        uint256 totalRaised = currentBalance;
        currentBalance = 0;

        uint totalWallet = totalRaised / 104 * 103;
        uint totalProposer = totalRaised / 104;

        uint gasLimit = 50000;

        (bool success, ) = multisig.call{value: totalWallet, gas: gasLimit}(""); // High gas limit due to nature of gnosis safe
        (bool _success, ) = creator.call{value: totalProposer, gas: gasLimit}("");
        require(success && _success, "both transactions successful");
        return true;
    }
            

    /** @dev Function to retrieve donated amount when a project expires.
      */
    function getRefund() public inState(State.Expired) returns (bool) {
        require(contributions[msg.sender] > 0);

        uint amountToRefund = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if (!payable(msg.sender).send(amountToRefund)) {
            contributions[msg.sender] = amountToRefund;
            return false;
        } else {
            currentBalance = currentBalance - (amountToRefund);
        }

        return true;
    }

    /** @dev Function to get specific information about the project.
      */
    function getDetails() public view returns 
    (
        address payable projectStarter,
        uint256 deadline,
        State currentState,
        uint256 currentAmount,
        uint256 nftPrice,
        uint goalAmount
    ) {
        projectStarter = creator;
        deadline = raiseBy;
        currentState = state;
        currentAmount = currentBalance;
        nftPrice = amountGoal;
        goalAmount = getMaximumAmount();
    }
    
    /** @dev Function to get the amount in the contract for test purposes
      */
    function getThisProjectBalance() public view returns(uint) {
        return address(this).balance;
    }
}
