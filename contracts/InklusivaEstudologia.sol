// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';


/**
 * @title InklusivaEstudologia
 * @author Incript
 * @dev An ERC721 contract for creating and managing NFTs with additional functionality.
 */
contract InklusivaEstudologia is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    /**
     * @dev Initializes the contract.
     * @param _name The name of the NFT contract.
     * @param _symbol The symbol of the NFT contract.
     * @param _owner The initial owner of the contract.
     */
    constructor(string memory _name, string memory _symbol, address _owner) ERC721(_name, _symbol) {
        _transferOwnership(_owner);
    }

    Counters.Counter public _tokenIds;
    mapping(uint256 => string) internal _tokensURI;

    /**
     * @dev Mints a new NFT and assigns it to the specified address.
     * @param _to The address to which the minted NFT will be assigned.
     * @notice Only the owner of the contract can call this function.
     */
    function mint(address _to) external onlyOwner {
        _mint(_to, _tokenIds.current());
        _tokenIds.increment();
    }

    /**
     * @dev Returns the token URI associated with the specified token ID.
     * @param tokenID The token ID.
     * @return The token URI.
     */
    function tokenURI(uint256 tokenID) public override view returns (string memory) {
        return _tokensURI[tokenID];
    }

    /**
     * @dev Sets the token URI for a specified token ID.
     * @param _URI The token URI to be set.
     * @param tokenID The token ID for which the URI will be set.
     * @notice Only the owner of the contract can call this function.
     */
    function setTokenURI(string memory _URI, uint256 tokenID) external onlyOwner {
        _tokensURI[tokenID] = _URI;
    }

    /**
     * @dev Returns the current token ID.
     * @return The current token ID.
     */
    function currentTokenID() external view returns (uint256) {
        if (_tokenIds.current() > 0) {
            return _tokenIds.current() - 1;
        } else {
            return 0;
        }
    }
}
