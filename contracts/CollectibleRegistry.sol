pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract CollectibleRegistry is AragonApp {

    mapping(bytes32 => address) public collectibles;
    
}