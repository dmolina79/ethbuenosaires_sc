pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "./Raffle.sol";

contract RaffleFactory is AragonApp {
    event RaffleCreated(
        address indexed raffleOwner,
        address indexed raffleAddress,
        address indexed erc721Address,
        uint tokenId
    );

    function createNewRaffle(
        // Raffle data.
        string _title,
        string _orgName,
        uint16 _length,
        uint256 _ticketPrice,
        uint32 _maxTickets,
        uint256 _minThreshold,
        // Asset data.
        address _erc721Address,
        uint256 _tokenId,
        uint256 _price,
        string _briefDescription) public returns (address _newRaffleAddress) {

        // Require that the raffle's underlying asset does belong to the
        // creator of the raffle.
        address owner = msg.sender;
        ERC721 erc721Token = ERC721(_erc721Address);
        require(erc721Token.ownerOf(_tokenId) == owner);

        address raffleAddress = new Raffle(
            // Raffle data.
            owner, _title, _orgName, _length, _ticketPrice, _maxTickets,
            _minThreshold,
            // Asset data.
            _erc721Address, _tokenId, _price, _briefDescription);

        emit RaffleCreated(msg.sender, raffleAddress, _erc721Address, _tokenId);
        return raffleAddress;
    }

}