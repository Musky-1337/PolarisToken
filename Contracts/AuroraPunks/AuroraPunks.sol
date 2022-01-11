// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./IERC2981.sol";

contract AuroraPunks is ERC721, ERC721Enumerable, IERC2981, Ownable {
    using Counters for Counters.Counter;
    using Address for address;

    //royalities
    address public treasury = 0xEfedB086048E300df3e1BaCf045E00fF02Cbe409;
    uint256 saleCut = 200; //2%
    uint256 constant DIVISOR = 10000;

    Counters.Counter private _tokenIdCounter;

    string private baseURI = "ipfs:// /";
    string private _contractURI = "ipfs://";

    string public constant PROVANCE = "";

    bool public frozenMetadata;
    event PermanentURI(string _baseURI, string _contractURI);

    uint256 public constant PRICE = 0.02 ether;
    uint public constant MAXPURCHASE = 40;
    uint256 public MAXSUPPLY = 10000;

    uint256 public saleStart = 1000;
    uint256 public promo = 30;   

    constructor() ERC721("AuroraPunks", "APunks") {
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseUri(string memory baseURI_) external onlyOwner {
        require(!frozenMetadata,"Metadata already frozen");
        baseURI = baseURI_;
    }

    function contractURI() public view returns (string memory) {        
        return _contractURI;
    }

    function setContractURI(string memory contractURI_) external onlyOwner {
        require(!frozenMetadata,"Metadata already frozen");
        _contractURI = contractURI_;
    }

    function freezeMetadata() external onlyOwner {
        frozenMetadata = true;
        emit PermanentURI(baseURI, _contractURI);
    }

    function mint(uint numberOfTokens) public payable {
        require(block.timestamp >= saleStart, "Sale must be active to mint new KuDoge");
        require(numberOfTokens <= MAXPURCHASE, "You can't mint that many at once");
        require(totalSupply() + numberOfTokens < MAXSUPPLY, "Purchase would exceed max supply");
        require(PRICE * numberOfTokens <= msg.value, "to little value has been sent");       

        for(uint i = 0; i < numberOfTokens; i++) {
            _safeMint(_msgSender(), _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }      
    }

    function promoMint(uint numberOfTokens) public onlyOwner {
        require(_tokenIdCounter.current() + numberOfTokens < MAXSUPPLY, "Purchase would exceed max supply");
        require(promo >= numberOfTokens, "More minted than available for promos");   

        for(uint i = 0; i < numberOfTokens; i++) {
            _safeMint(_msgSender(), _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }      

        promo -= numberOfTokens;
    }   

    function tokensOwned(address owner) public view returns (uint256 [] memory) {
        uint256 [] memory Tokens = new uint256[](balanceOf(owner));
        if (balanceOf(owner) == 0) return (Tokens);
        for (uint256 index = 0; index < balanceOf(owner); index++) {
           Tokens[index] = tokenOfOwnerByIndex(owner, index);
        }
        return (Tokens);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC2981).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    function setSaleStart(uint256 _saleStart) public onlyOwner {
        saleStart = _saleStart;
    }

    /**
     * @dev get mint fees out of the contract
     */
    function withdrawETH() external onlyOwner {
        Address.sendValue(payable(owner()), address(this).balance);
    }

    /**
     * @dev Fallback to help users get their funds out, not token should ever go to this
     */
    function withdrawAnyToken(address _contract) public onlyOwner {
		IERC20(_contract).transfer(owner(), IERC20(_contract).balanceOf(address(this)));
	}  

    /**
     * @dev implement EIP 2981
     */
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view override returns (
        address receiver,
        uint256 royaltyAmount
    )
    {
        receiver = treasury;
        royaltyAmount = _salePrice * saleCut / DIVISOR;
    }

     /**
     * @dev change treasury and sale cut down the line
     */
    function changeRoyality(address _treasury, uint256 _saleCut) public onlyOwner {
        require(_saleCut <= 1000, "Max sale Cut is 10%");
        treasury = _treasury;
        saleCut = _saleCut;
    }    
}
