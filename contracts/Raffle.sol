pragma solidity ^0.4.23;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


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
    uint16 public length;
    uint256 public ticketPrice;
    uint32 public maxTickets;
    uint256 public minThreshold;
    Asset public selectedAsset;

    // Currently registered player that bought a ticket.
    address[] public players;

    address public winner;


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
        require(msg.value >= ticketPrice, "Ticket price is higher");
        require(players.length < maxTickets, "All tickets sold out");
        // TODO: Require that the raffle has not expired/ended.
        //       This might be for time ended or a winner already declared.
        
        players.push(msg.sender);
    }
    
    function pickWinner() public payable restricted {
        // At least one player must be subscribed.
        require(players.length > 0);

        // Pick the winner randomly.
        uint index = random() % players.length;
        address tmpWinner = players[index];

        // Transfer the ERC721 token to the winner.
        ERC721 erc721Token = ERC721(selectedAsset.contractAddr);
        erc721Token.transferFrom(
            address(this), tmpWinner, selectedAsset.tokenId);

        // Mutate contract state declaring a winner.
        winner = tmpWinner;
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
        // TODO: Improve with a stronger random function and entropy sources.
        return uint(keccak256(block.difficulty, now, players));
    }
}
