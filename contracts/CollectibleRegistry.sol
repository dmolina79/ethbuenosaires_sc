pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract CollectibleRegistry is AragonApp, Ownable {

    mapping(bytes32 => address) public collectibles;

    // function addCollectibleContract(bytes32 id, address contract) onlyOwner {

    // }

    
}