pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
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

    function createNewRaffle(
        address _erc721Address, 
        uint _tokenId
    ) public returns (address _newRaffleAddress) {

        ERC721 collectibleContract = ERC721(_erc721Address);

        require(collectibleContract.exists(_tokenId));
        require(collectibleContract.ownerOf(_tokenId) == msg.sender);


        address raffleAddress = new Raffle(_erc721Address, _tokenId);

        emit RaffleCreated(msg.sender, raffleAddress);
        return raffleAddress;
    }

}