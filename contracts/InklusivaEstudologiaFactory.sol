// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./InklusivaEstudologia.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title InklusivaEstudologiaFactory
 * @author Incript
 * @dev A contract for deploying new instances of InklusivaEstudologia.
 */
contract InklusivaEstudologiaFactory is Ownable {
    event CollectionCreated(address collection, address owner);

    /**
     * @dev Initializes the contract.
     */
    constructor() {}

    address[] public collections;

    /**
     * @dev Deploys a new InklusivaEstudologia collection.
     * @param _name The name of the new collection.
     * @param _symbol The symbol of the new collection.
     * @param _owner The owner of the new collection.
     * @notice Only the owner of the factory can call this function.
     */
    function deployCollection(
        string memory _name,
        string memory _symbol,
        address _owner
    ) external onlyOwner {
        InklusivaEstudologia newCollection = new InklusivaEstudologia(
            _name,
            _symbol,
            msg.sender
        );
        address collectionAddress = address(newCollection);
        emit CollectionCreated(collectionAddress, _owner);
        collections.push(collectionAddress);
    }

    function getCollectionsDeployed() external view returns(uint256) {
        return collections.length;
    }

    function getCollectionAddress(uint256 id) external view returns(address) {
        return collections[id];
    }
}
