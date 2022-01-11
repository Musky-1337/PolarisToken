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
import Slider from '@mui/material/Slider'
//import { useRouter } from 'next/router'
import { useState, useEffect} from 'react';
import Image from 'next/image';
import { MintContractAddy } from "../contracts/MintContract"
// Types

import Countdown from "react-countdown";

//Web3 Connect
const web3 = new Web3(Web3.givenProvider);

export default function Home(){




  
  const { active, account, activate} = useWeb3React()

  const MintContract = new web3.eth.Contract(MintContractABI, MintContractAddy);

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      //console.log(ex);
    }
  }

  //hooks
  
  //const [ contract, setContract ] = useState<Contract | null>(null);
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ sliderVal, setSliderVal ] = useState(1);
  const [ mintVal, setMintVal ] = useState(0);
  //Loading Mint section
  const [ isLoading1, setIsLoading1 ] = useState(true);
  //Loading Example bags
  const [ totalSupply, setTotalSupply ] = useState(0);
  const [ owned, setOwned ] = useState(0);
  const [ isMetamask, setIsMetamask ] = useState(false);
  const [ isNetwork, setIsNetwork ] = useState(false);
  const [ isLoadingNetwork, setIsLoadingNetwork ] = useState(true);
  const [ punkIDs, setPunkIDs ] = useState(["0"])

  //Countdown Timer
  const releaseDate = new Date(1641085200000); 
  //new Date(Date.now()+10000);
  if(releaseDate <= new Date(Date.now()))
  {
    if(isCompleted == false)
    {
      setIsCompleted(true);
    }
    
  }

  async function networkCheck(id){
    //BSC Testnet
    if(id === 1313161554)
    {
      setIsNetwork(true);
      
    }
    else
    {
      setIsNetwork(false);
    }
    setIsLoadingNetwork(false);
    if(active)
    {
      const supply = await MintContract.methods.totalSupply().call();
      setTotalSupply(supply);
    }
    
  }

  useEffect(() => {
    let ids = new Array();
    for(var i = 0; i < 10; i++)
    {
      ids.push(parseInt(String(Math.random() * (2000 - 0) + 0)));
    }
    setPunkIDs(ids);
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

    if(active)
    {
      fetchContractData();
    }
  }, [active])

  const fetchContractData = async () => {
    if(!!MintContract)
    {
      //Obtain price and total minted NFT
      const price = await MintContract.methods.PRICE().call();
      const owned = await MintContract.methods.balanceOf(account).call();
      const supply = await MintContract.methods.totalSupply().call();
      setMintVal(price);
      setOwned(owned);
      setTotalSupply(supply)
      setIsLoading1(false);

      
    }
    
  }


  

  /**/

  const mintNFT = async () => {
    if(!!MintContract)
    {
      const total = (mintVal*sliderVal);
        //Mint
        try{
          await MintContract.methods.mint(sliderVal).send({from:account, value:total});
          const supply = await MintContract.methods.totalSupply().call();
          const owned = await MintContract.methods.balanceOf(account).call();
          setOwned(owned);
          setTotalSupply(supply);
        }catch(ex)
        {
          const supply = await MintContract.methods.totalSupply().call();
          const owned = await MintContract.methods.balanceOf(account).call();
          setOwned(owned);
          setTotalSupply(supply);
          //console.log(ex);
        }
      
    }
  }

  

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

  const handleMint = () => {
    mintNFT();

  }
  const handleComplete = () => {
    setIsCompleted(true);

  }

  const handleRefresh = () => {
    let ids = new Array();
    for(var i = 0; i < 10; i++)
    {
      ids.push(parseInt(String(Math.random() * (2000 - 0) + 0)));
    }
    setPunkIDs(ids);
  }

  const handleSliderChange = (event) => {
    setSliderVal(event.target.value);
  }

  return (
    <Layout>
      <div>
        <div className={styles.home__cta}>
          {/* CTA title */}
          <h1 style={{textShadow:"0px 0px 15px rgba(255, 255, 255, 1)"}}>AuroraPunks</h1>
          {/* Quicklinks */}
          <ul >

                <li style={{padding:"12px"}}>

                    <Link href={"/myPunks"}>
                      <a >View My Punks</a>
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
          <p style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
          AuroraPunks is a Punks themed NFT collection based on Larvalabs' original (with whom we're not affiliated in any way) made by the <a style={{color:"#00DBDE"}} href="https://polaristoken.io" target="_blank" rel="noreferrer">#PolarisToken</a> Team and aimed at tying the Aurora Chain ecosystem together.
          <br/><br/>These NFT could be used as profile pictures, staking tokens (soon on Polaris) and potentially future voting on Polaris' 
          growth and direction.
          <br/><br/>AuroraPunks will be available to trade on AuroraSwap's NFT Marketplace as soon as it is available, and they will also giveaway the first 40 numbered and <b style={{color:"#f2d724"}}>Legendary</b> AuroraPunks in different contests.
          <br/><br/>There is a total of 10,000 AuroraPunks available to mint and <b style={{color:"#FFFF00"}}>50% of the mint profits are used to buy back the $PLRS Token</b>
          <br/><br/><b style={{color:"#FFFF00"}}>Minting Price is 0.02 ETH per AuroraPunk</b>

          </p>
          </div>
          <div className={styles.home__cta} >
            <h1 style={{textShadow:"0px 0px 15px rgba(255, 255, 255, 1)",padding:"24px",fontSize:"52px"}}>Mint AuroraPunks</h1>
          </div>
          {isCompleted ? 
            <>
              {isMetamask ?
              <>
                {!isLoadingNetwork ?
                  <>
                    {isNetwork ?
                    <>
                      {active ? <>
                        {!isLoading1 ?
                        <>
                        <div className={styles.home__cta} >
                          <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                          
                          <p>
                            Choose amount to mint:
                          </p>
                          
                          <br/>
                          <p style={{width:"232px", display:"block", marginLeft:"auto", marginRight:"auto", padding:"12px"}}>
                            <Slider
                              aria-label="Small steps"
                              defaultValue={1}
                              step={1}
                              marks
                              min={1}
                              max={15}
                              valueLabelDisplay="auto"
                              onChange={handleSliderChange}
                            />
                          </p>
                          
                          <p>
                            {10000-totalSupply} AuroraPunks Remaining
                          </p>
                          <br/>
                          <p >
                            <button className={styles.home__button} onClick={handleMint}>Mint {sliderVal} Punk</button>
                          </p>
                          <p>Mint Price: {(mintVal/(10**18))*sliderVal} ETH</p>

                          <p style={{paddingTop:"24px" }}>
                            You own {owned} AuroraPunks
                          </p>
                          
                          
                          <br/>
                          {/*
                          <p style={{wordWrap:"break-word"}}>
                          <br/><b>Referral System: </b><br/>
                          Use your customized referral link and earn 20% on every sale that you help us make!  
                          <br/><br/><b> Your referral link: </b><br/>https://www.AuroraPunks.net/?ref={account}
                          </p>
                          */}
                          </div>
                        </div>
                        
                        
                        </>
                        :
                        <div className={styles.home__cta} >
                          <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"64px"}}>
                            <img src={`/loading.gif`} alt={'loading.gif'} width={'64px'} height={'64px'}/>
                          </div>
                        </div>
                        }
                        </>
                        
                      : 
                        <>
                        <div className={styles.home__cta} >
                        
                          <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"64px"}}>
                            <button className={styles.home__button} onClick={connect}>Connect Wallet</button>
                          </div>
                        </div>
                        </>
                      }
                    </>
                    :
                    <>
                      <div className={styles.home__cta} >
                        <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                        
                        <p>
                          Wrong Network! Please switch over to the Aurora Chain Mainnet.
                        </p>
                        </div>
                      </div>
                    </>
                    }
                  </>
                  :
                  <>
                    <div className={styles.home__cta} >
                      <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                        <p>
                          Checking Network...
                        </p>
                      </div>
                    </div>
                  </>
                }
              </>
              :
              <>
                <div className={styles.home__cta} >
                  <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                  
                  <p>
                    Please install the Metamask Browser Extension or use the Metamask Mobile App.
                  </p>
                  </div>
                </div>
              </>
              }
              
            </>
          :
            <div className={styles.home__cta} >
              <div style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                <h1 style={{fontSize:"36px"}}>Minting begins in:</h1>
                <p style={{fontSize:"48px"}}><Countdown zeroPadTime={2} onComplete={handleComplete} date={releaseDate} /></p>
              </div>
            </div>
          }
              
              <div className={styles.home__feature}>
                  <span style={{textShadow:"0px 0px 10px rgba(255, 255, 255, 1)",fontSize:"32px"}}>AuroraPunks examples:</span>
                  {punkIDs.map((id,i) => (
                    <div className={styles.home__bag} key={i}>
                      <img src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/"+id+".svg"} alt={id} width={'256px'} height={'256px'}/>
                    </div>
                  ))}
                  <p >
                    <button className={styles.home__button} onClick={handleRefresh}>Refresh</button>
                  </p>
              </div>      
      </div>
    </Layout>
  );
}
