//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./OpenZeppelin/access/Ownable.sol";
import "./OpenZeppelin/utils/Pausable.sol";

import "./OpenZeppelin/token/ERC721/ERC721.sol";
import "./OpenZeppelin/token/ERC721/ERC721Holder.sol";

import "./InitializedProxy.sol";
import "./ERC721TokenVault.sol";

contract ERC721VaultFactory is Ownable, Pausable {
  /// @notice the number of ERC721 vaults
  uint256 public vaultCount;

  /// @notice the mapping of vault number to vault contract
  mapping(uint256 => address) public vaults;

  /// @notice the TokenVault logic contract
  address public immutable logic;

  event Mint(address indexed token, uint256 id, uint256 price, address vault, uint256 vaultId);

  constructor() {
    logic = address(new TokenVault());
  }

  /** @dev Function to mint ERC20 tokens to be sent to recipients 
  */
  function mint(string memory _name, string memory _symbol, address _token, uint256 _id, uint256 _supply, uint256 _listPrice) external returns(uint256) {
    bytes memory _initializationCalldata =
      abi.encodeWithSignature(
        "initialize(address,uint256,string,string)",
          msg.sender,
          _supply,
          _name,
          _symbol
    );

    address vault = address(
      new InitializedProxy(
        logic,
        _initializationCalldata
      )
    );

    emit Mint(_token, _id, _listPrice, vault, vaultCount);

    IERC721(_token).safeTransferFrom(msg.sender, vault, _id);
    
    vaults[vaultCount] = vault;
    vaultCount++;

    return vaultCount - 1;
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

}
