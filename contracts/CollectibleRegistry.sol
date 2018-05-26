pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract CollectibleRegistry is AragonApp, Ownable {

    event CollectibleContractAdded(
        address indexed collectibleAddress, 
        bytes32 id
    );

    mapping(bytes32 => address) public collectibles;

    function addCollectibleContract(bytes32 _id, address _contract) public onlyOwner {
        collectibles[_id] = _contract;

        emit CollectibleContractAdded(_contract, _id);
    }

    function getCollectibleContract(bytes32 id) public view returns (address) {
        require(collectibles[id] != address(0x0));

        return collectibles[id];
    }
   
}