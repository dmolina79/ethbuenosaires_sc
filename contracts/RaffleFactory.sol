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

    function createNewRaffle(
        bytes32 _collectibleContractId, 
        uint tokenId
    ) public returns (address _newRaffleAddress) {
        require(registry.getCollectibleContract(_collectibleContractId) != address(0x0));

        address erc721 = registry.getCollectibleContract(_collectibleContractId);

        address raffleAddress = new Raffle(erc721, tokenId);

        emit RaffleCreated(msg.sender, raffleAddress);
        return raffleAddress;
    }

}