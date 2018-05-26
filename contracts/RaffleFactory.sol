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

    constructor(address _registryAddress) public {
        registry = CollectibleRegistry(_registryAddress);
    }

    function createNewRaffle(
        // Raffle data.
        string _title,
        string _orgName,
        uint16 _length,
        uint256 _ticketPrice,
        uint32 _maxTickets,
        uint256 _minThreshold,
        // Asset data.
        address _contractAddr,
        uint256 _tokenId,
        uint256 _price,
        string _briefDescription) public returns (address _newRaffleAddress) {

        address raffleAddress = new Raffle(
            // Raffle data.
            msg.sender, _title, _orgName, _length, _ticketPrice, _maxTickets,
            _minThreshold,
            // Asset data.
            _contractAddr, _tokenId, _price, _briefDescription);

        emit RaffleCreated(msg.sender, raffleAddress);
        return raffleAddress;
    }

}