pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "./Raffle.sol";

contract RaffleFactory is AragonApp {

    event RaffleCreated(
        address indexed raffleOwner, 
        address indexed raffleAddress
    );

    function createNewRaffle() public returns (address _newRaffleAddress) {
        address raffleAddress = new Raffle();

        emit RaffleCreated(msg.sender, raffleAddress);
        return raffleAddress;
    }

}