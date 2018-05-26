pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "./CollectibleRegistry.sol";
import "./Raffle.sol";

contract RaffleFactory is AragonApp {

    CollectibleRegistry public registry;

    event RaffleCreated(
        address indexed raffleOwner, 
        address indexed raffleAddress
    );

    constructor(address _registryAddress) {
        registry = CollectibleRegistry(_registryAddress);
    }

    function createNewRaffle() public returns (address _newRaffleAddress) {
        address raffleAddress = new Raffle();

        emit RaffleCreated(msg.sender, raffleAddress);
        return raffleAddress;
    }

}