//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Interfaces/IWETH.sol";
import "./OpenZeppelin/token/ERC721/ERC721.sol";
import "./OpenZeppelin/upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./OpenZeppelin/upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

contract TokenVault is ERC20Upgradeable, ERC721HolderUpgradeable {
    /** @dev Function to initialise the ERC20 tokens 
     */
    function initialize(address _curator, uint256 _supply, string memory _name, string memory _symbol) external initializer {
        // initialize inherited contracts
        __ERC20_init(_name, _symbol);
        __ERC721Holder_init();

        _mint(_curator, _supply);
    }
}
