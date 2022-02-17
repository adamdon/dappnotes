// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DappNotes is ERC721, ERC721URIStorage, Ownable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(string => uint8) public existingURIs;
    mapping(string => string) public storedNotes;

    constructor() ERC721("DappNotes", "DAP") {}


    function _baseURI() internal pure override returns (string memory)
    {
        return "ipfs://";
    }


    function safeMint(address to, string memory uri) public onlyOwner
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }







    function getContentByKey(string memory key) public view returns (string memory)
    {
        console.log("getContentByKey");
        console.log(key);
        console.log(storedNotes[key]);
        console.log("getContentByKey");


        return storedNotes[key];
    }

    function isContentOwned(string memory uri) public view returns (bool)
    {
        return existingURIs[uri] == 1;
    }




    function mintNote(address recipient, string memory keyId, string memory note) public payable returns (uint256)
    {
        require(existingURIs[keyId] != 1, 'Note Already Minted');
        require (msg.value >= 0.001 ether, 'Sent funds too low');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[keyId] = 1;
        storedNotes[keyId] = note;



        _mint(recipient, newItemId);
        _setTokenURI(newItemId, keyId);

        return newItemId;
    }


}