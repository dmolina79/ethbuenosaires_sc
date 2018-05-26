pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";


contract Raffle is AragonApp {
    struct Asset {
        address contractAddr;
        uint256 tokenId;
        uint256 price;
        string briefDescription;
    }

    address private owner;
    string public title;
    string public orgName;
    uint16 length;
    uint256 ticketPrice;
    uint32 maxTickets;
    uint256 minThreshold;
    Asset selectedAsset;

    // Currently registered player that bought a ticket.
    address[] public players;


    constructor(
            // Raffle data.
            address _owner,
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
            string _briefDescription) public {
        // Set raffle data.
        owner = _owner;
        title = _title;
        orgName = _orgName;
        length = _length;
        ticketPrice = _ticketPrice;
        maxTickets = _maxTickets;
        minThreshold = _minThreshold;
        // Set asset data.
        selectedAsset.contractAddr = _contractAddr;
        selectedAsset.tokenId = _tokenId;
        selectedAsset.price = _price;
        selectedAsset.briefDescription = _briefDescription;
    }

    function buyTicket() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function pickWinner() public restricted {
        require(players.length > 0);

        uint index = random() % players.length;
        address winner = players[index];
        ERC721Token remoteContract = ERC721Token(selectedAsset.contractAddr);
        remoteContract.transferFrom(owner, winner, selectedAsset.tokenId);
    }
    
    modifier restricted() {
        require(msg.sender == owner);
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getPlayerCount() public view returns (uint256) {
        return players.length;
    }

    function isTheOwner(address _owner) public view returns (bool) {
        return owner == _owner;
    }

    function random() private view returns (uint) {        
        return uint(keccak256(block.difficulty, now, players));
    }
}
