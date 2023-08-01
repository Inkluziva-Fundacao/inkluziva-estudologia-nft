// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract InklusivaEstudologia is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    constructor(string memory _name, string memory _symbol, address _owner) ERC721(_name, _symbol) {
        _transferOwnership(_owner);
    }

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) internal _tokensURI;

    function mint(address _to) external onlyOwner {
        _mint(_to, _tokenIds.current());
        _tokenIds.increment();
    }

    function tokenURI(uint256 tokenID) public override view returns(string memory) {
        return _tokensURI[tokenID];
    }

    function setTokenURI(string memory _URI, uint256 tokenID) external onlyOwner {
        _tokensURI[tokenID] = _URI;
    }
}

