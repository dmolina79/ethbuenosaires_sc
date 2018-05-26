pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract AnyToken is ERC721Token {
    uint256 _tokenCount = 0;

    constructor() ERC721Token("TOKEN_NAME", "TOKEN_SYMBOL") public {}

    function mint() public payable {
        _tokenCount++;
        super._mint(msg.sender, _tokenCount);
    }
}
