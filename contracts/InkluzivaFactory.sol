// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./InklusivaEstudologia.sol";
import '@openzeppelin/contracts/access/Ownable.sol';


contract Factory is Ownable {
    event CollectionCreated(address collection, address owner);

    function deployCollection(string memory _name, string memory _symbol, address _owner) external onlyOwner {
        InklusivaEstudologia newCollection = new InklusivaEstudologia(_name, _symbol, msg.sender);
        emit CollectionCreated(address(newCollection), _owner);
    }
}
