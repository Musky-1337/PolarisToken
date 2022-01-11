 // Imports
import Link from "next/link"; // Local routing
import Layout from "@components/Layout"; // Layout wrapper
//import { defaultBags } from "@utils/constants"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles
//import { Contract } from 'web3-eth-contract';
//import { AbiItem } from 'web3-utils/types'
import MintContractABI from '../contracts/MintContractABI.json';
import { useWeb3React } from "@web3-react/core"
import { injected } from "../MMConnect"
import Web3 from 'web3'
//import { useRouter } from 'next/router'
import { useState, useEffect} from 'react';
import { MintContractAddy } from "../contracts/MintContract"




//Web3 Connect
const web3 = new Web3(Web3.givenProvider);
const saveSvgAsPng = require('save-svg-as-png')

export default function MyPunks(){

  const imageOptions = {

  }
  

  const { active, account, activate} = useWeb3React()
  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {}
  }

/*  interface MyPunks {
  name: string,
  image: string,
  attributes: [{
    trait_type: string,
    value: string,
  }]
}*/

  //hooks
  
  //const [ contract, setContract ] = useState<Contract | null>(null);
  //Loading Mint section
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isLoadingCards, setIsLoadingCards ] = useState(true);
  const [ hasPunks, setHasPunks ] = useState(false);
  const [ totalBalance, setTotalBalance ] = useState(0);
  const [ isMetamask, setIsMetamask ] = useState(false);
  const [ isNetwork, setIsNetwork ] = useState(false);
  const [ isLoadingNetwork, setIsLoadingNetwork ] = useState(true);
  const [ hookLoaded, setHookLoaded ] = useState(false);
  const [ pages, setPages ] = useState([0])
  const [ currentPage, setCurrentPage ] = useState(0);
  
  //const [ totalSupply, setTotalSupply ] = useState(0);
  //const [ chosenPunks, setChosenPunks ] = useState([0]);
  //I hope whoever created typescript dies from the shock of intense pain
  const[ myPunks, setMyPunks ] = useState([[{}]]);

  const MintContract = new web3.eth.Contract(MintContractABI, MintContractAddy);



  function networkCheck(id){
    //BSC Testnet
    if(id === 1313161554)
    {
      setIsNetwork(true);
      
    }
    else
    {
      setIsNetwork(false);
      setHookLoaded(false);
    }
    setIsLoadingNetwork(false);
  }

  //Execute only once every render
  useEffect(() => {
    
    const id = setInterval(() => {
      if (web3.givenProvider !== null) 
      {
        setIsMetamask(true);
        web3.eth.net.getId()
        .then(function (result){
          networkCheck(result);  
      })
      }
      else
      {
        setIsMetamask(false);
      } // <-- (3) invoke in interval callback
      }, 5000);
      // <-- (2) invoke on mount
  
    return () => clearInterval(id);
    
    
    
    
  }, []);


  useEffect(() => {
    //When wallet just connected, the check looks redundant but we don't really know if active is true
    if (web3.givenProvider !== null) 
    {
      setIsMetamask(true);
      web3.eth.net.getId()
      .then(function (result){
        networkCheck(result);  
    })
    }
    else
    {
      setIsMetamask(false);
    }
    if(active && !hookLoaded)
    {
      setHookLoaded(true);

      const fetchContractData = async ()=> {
      
        //const supply = await MintContract.methods.totalSupply().call();
        const balance = await MintContract.methods.balanceOf(account).call();
    
        setTotalBalance(balance);
        //If the address has no minted NFT
        var hasPunks = false;
        if(balance > 0)
        {
          hasPunks = true;
          //For some reason hooks update like a few microseconds later and desync everything
          setHasPunks(true);
        }
        if(hasPunks)
        {
          
          
    
          //const json = 
          let punkArr = new Array();
          //Obtain array of every Punk owned by user
          var punkID = new Array();
          let punkPage = new Array();
          let pageCounter = 0;
          let pageSize = 12
          try{
            punkID = await MintContract.methods.tokensOwned(account).call();
            //First, render every NFT by index
            const fetch = require('node-fetch');
            
            for(var i = 0; i < balance; i++)
            {
              let url = "https://ipfs.io/ipfs/QmZEpoBeJbmTkcJpWpoSmTL8kmHLMPYupuJ1GqzSiNL34i/"+punkID[i];
              let settings = { method: "Get" };
              let json = await fetch(url, settings).then(res => res.json())
              let rarityVal = '#FFF';
              //Retrieve attribute amount before splicing it
              let attrN = json.attributes[json.attributes.length-2].value.charAt(0);
              let bg = json.attributes[json.attributes.length-1].value;
              if(attrN == "3")
              {
                rarityVal = "#0055ff";
              }
              else if(attrN > 3 && attrN <6)
              {
                rarityVal = "#aa1dd1";
              }
              else if(attrN > 5 && attrN < 8)
              {
                rarityVal = "#f2d724";
              }
              //If it's a silver or gold background, set as gold anyway
              if(bg == "Silver" || bg == "Gold")
              {
                rarityVal = "#f2d724";
              }
              //If you own a numbered token
              if(punkID[i] < 40)
              {
                rarityVal = "#f2d724";
              }
              json.attributes.splice(json.attributes.length-2,1)
              const punk = 
              {
                name: json.name,
                image:"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/"+punkID[i]+".svg",
                rarityColor:rarityVal,
                attributes:json.attributes,
              }
              punkArr.push(punk);
              pageCounter = pageCounter+1
              if(pageCounter >= pageSize || i == balance-1)
              {
                //Add new page, then reset counter
                punkPage.push(punkArr)
                pageCounter = 0;
                punkArr = new Array();
                if(i >= pageSize)
                {
                  //Create new page
                  let pageArr = pages;
                  let pageN = pages[pages.length-1];
                  pageN = pageN + 1
                  pageArr.push(pageN);
                  setPages(pageArr);
                }
                
              }
                  
            }
            setMyPunks(punkPage);
          }
          //IF FOR SOME REASON THE USER HAS TOO MANY NFT, LOAD MANUALLY
          catch(ex)
          {
            for(var i = 0; i < balance; i++)
            {
              let reply = '';
              while(reply = '');
              {
                try{reply = await MintContract.methods.tokenOfOwnerByIndex(account,i).call();}catch(ex){}
                
              }
              
              const fetch = require('node-fetch');
              let url = "https://ipfs.io/ipfs/QmZEpoBeJbmTkcJpWpoSmTL8kmHLMPYupuJ1GqzSiNL34i/"+reply;
              let settings = { method: "Get" };
              let json = await fetch(url, settings).then(res => res.json())
              let rarityVal = '#FFF';
              //Retrieve attribute amount before splicing it
              let attrN = json.attributes[json.attributes.length-2].value.charAt(0);
              let bg = json.attributes[json.attributes.length-1].value;
              if(attrN == "3")
              {
                rarityVal = "#0055ff";
              }
              else if(attrN > 3 && attrN <6)
              {
                rarityVal = "#aa1dd1";
              }
              else if(attrN > 5 && attrN < 8)
              {
                rarityVal = "#f2d724";
              }
              //If it's a silver or gold background, set as gold anyway
              if(bg == "Silver" || bg == "Gold")
              {
                rarityVal = "#f2d724";
              }
              if(reply < 40)
              {
                rarityVal = "#f2d724";
              }
              
              //console.log(attrN);
              json.attributes.splice(json.attributes.length-2,1)
              
            
              const punk = 
              {
                name: json.name,
                image:"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/"+reply+".svg",
                rarityColor: rarityVal,
                attributes:json.attributes,
              }
              punkArr.push(punk);
              //console.log(punkArr);
              pageCounter = pageCounter+1
              if(pageCounter >= pageSize || i == balance-1)
              {
                //Add new page, then reset counter
                punkPage.push(punkArr)
                pageCounter = 0;
                punkArr = new Array();
                
                
                if(i >= pageSize)
                {
                  //Create new page
                  let pageArr = pages;
                  let pageN = pages[pages.length-1];
                  pageN = pageN + 1
                  pageArr.push(pageN);
                  setPages(pageArr);
                }
                
                
                setIsLoading(true);
                setMyPunks(punkPage);
                setIsLoading(false);
                
                
              }
              
             
            }
          }
          
          setIsLoading(false);
          
          
        }
        setIsLoadingCards(false);
    }
      fetchContractData();
    }
  }, [active])

  const handlePaginate = (nextPage) => {
    if(nextPage >= 0 && nextPage < pages.length )
    {
      setCurrentPage(nextPage);
    }
  }

  const handleDownload = (id,name) => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById(id), name, imageOptions);
  }

  /**/

  

  // Quicklinks to render


  /*<a
              href={`https://opensea.io/assets/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className={styles.home__bag}
            >/*
  
  /**
   * Selects 3 random bags from defaultBags
   * @returns {Record<string, string>[]} randomized bags
   */
  //Useful for when NFT get minted on mainnet
  /*const getRandomThreeBags = () => {
    const shuffled = defaultBags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };*/

  return (
    <Layout>
      <div>
        <div className={styles.home__cta}>
          {/* CTA title */}
          <h1 style={{textShadow:"0px 0px 15px rgba(255, 255, 255, 1)"}}>AuroraPunks</h1>

          {/* Quicklinks */}
          <ul >
          <li style={{padding:"12px"}}>

                    <Link href={"/"}>
                      <a >Mint AuroraPunks</a>
                    </Link> 
                </li>
                <li style={{padding:"12px"}}>

                    <Link href={"/rarities"}>
                      <a >About Rarities</a>
                    </Link> 
                </li>
                <li style={{padding:"12px"}}>

                    <Link href={"/links"}>
                      <a >Project Links</a>
                    </Link> 
                </li>
          </ul>

          {/* CTA Description */}
          </div>
          <div className={styles.home__cta} >
            <h1 style={{textShadow:"0px 0px 15px rgba(255, 255, 255, 1)",fontSize:"52px"}}>My AuroraPunks</h1>
          </div>
          {isMetamask ?
            <>
              {!isLoadingNetwork ? 
                <>
                  {isNetwork ?
                  <>
                    {active ? 
                    <>
                    {hasPunks ? 
                    <>
                        {!isLoading ?
                        <>
                        <div className={styles.home__feature} >
                          <p>You own {totalBalance} AuroraPunks.</p>
                        </div>
                        <div className={styles.home__feature} >
                        <p style={{fontSize:"48px",textShadow:"0px 0px 15px rgba(255, 255, 255, 1)"}}><b>Page {currentPage+1}</b></p>
                          <div className={styles.pagination}>
                            <a style={{cursor:"pointer"}} onClick={() => handlePaginate(currentPage-1)}>&laquo;</a>
                              {pages.map((page,i) => (
                                <a key={i} style={{cursor:"pointer"}} onClick={() => handlePaginate(page)}>{page+1}</a>
                              ))}
                              <a style={{cursor:"pointer"}} onClick={() => handlePaginate(currentPage+1)}>&raquo;</a>
                            </div>
                          
                        </div>
                          
                        <div className={styles.mypunks__feature}>
                          {myPunks[currentPage].map((punk,i) => (
                            <div style={{border: "2px groove "+punk.rarityColor, boxShadow: "0px 0px 5px 0px "+punk.rarityColor }}className={styles.mypunks__box} key={i} >
                              
                              <p>
                                <img src={punk.image} alt={String(i)}width={'256px'} height={'256px'} style={{border: "4px groove "+punk.rarityColor, boxShadow: "0px 0px 15px 0px "+punk.rarityColor }}/>
                              </p>
                              
                                
                                <b style={{ color:punk.rarityColor, fontSize:"24px", textShadow:"0px 0px 10px "+punk.rarityColor}}>
                                {
                                  punk.name } 
                                </b>
                              <div className={styles.mypunks__boxdiv}>
                           
                                {punk.attributes.map((attributes,i) => (
                                  <p key ={i}>
                                    <b style={{textShadow:"0px 0px 5px rgba(255, 255, 255, 1)"}}>{attributes.trait_type}: </b> {attributes.value}
                                  </p>
                                ))}
                              
                              </div>
                              
                            </div>
                            
                          
                          ))}
                          
                          
                        </div> 
                        <div className={styles.home__feature} >
                          
                            <div className={styles.pagination}>
          
                              <a style={{cursor:"pointer"}} onClick={() => handlePaginate(currentPage-1)}>&laquo;</a>
                                {pages.map((page,i) => (
                   
                                  <a key={i} style={{cursor:"pointer"}} onClick={() => handlePaginate(page)}>{page+1}</a>
                                ))}
                   
                                <a style={{cursor:"pointer"}} onClick={() => handlePaginate(currentPage+1)}>&raquo;</a>
                              </div>
                              <p style={{fontSize:"48px",textShadow:"0px 0px 15px rgba(255, 255, 255, 1)"}}><b>Page {currentPage+1}</b></p>
                              {isLoadingCards ?
                            <div>
                              <img src={`/loading.gif`} alt={'loading.gif'} width={'128px'} height={'128px'}/>
                            </div>
                            :
                            <></>
                          }
                        </div>
                        
                        </>
                        :
                        <div className={styles.home__feature} >
                          <p>Retrieving your AuroraPunks.</p>
                          <img src={`/loading.gif`} alt={'loading.gif'} width={'64px'} height={'64px'}/>
                        </div>
                        }
                    </>
                    :
                    <>
                      <div className={styles.home__cta}>
                        You do not own any AuroraPunks.
                      </div>
                    </>
                    }
                      
                    </>
                    : 
                      <>
                      <div className={styles.home__cta} >
                        <button className={styles.home__button} onClick={connect}>Connect Wallet</button>
                      </div>
                      </>
                    }
                  </>
                  :
                  <div className={styles.home__cta} >
                    <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                    
                    <p>
                      Wrong Network! Please switch over to the Aurora Chain Mainnet.
                    </p>
                    </div>
                  </div>
                  }
                </>
                :
                <div className={styles.home__cta} >
                    
                    <p>
                      Checking Network...
                    </p>
                </div>
              }
            </>
            :
            <div className={styles.home__cta} >
              <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
              
              <p>
                Please install the Metamask Browser Extension or use the Metamask Mobile App.
              </p>
              </div>
            </div>
          }
            
      </div>
    </Layout>
  );
}
