 // Imports
import Link from "next/link"; // Local routing
import Layout from "@components/Layout"; // Layout wrapper
//import { defaultBags } from "@utils/constants"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles




export default function rarities(){


  //hooks
  
  //const [ contract, setContract ] = useState<Contract | null>(null);

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

              <Link href={"/myPunks"}>
                <a >View My Punks</a>
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
            <h1 style={{textShadow:"0px 0px 15px rgba(255, 255, 255, 1)",fontSize:"52px",paddingBottom:"24px"}}>About Rarities</h1>
              <p style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"24px"}}>
                As you may have noticed, minted punks come in different qualities represented by their rarity color, we represent these with the following colors:
                <br/><br/>
                <ul>
                  <li style={{color:"#fff"}}>White - Common Tier</li>
                </ul>
                <ul>
                  <li style={{color:"#0055ff"}}>Blue - Rare Tier</li>
                </ul>
                <ul>
                  <li style={{color:"#aa1dd1"}}>Purple - Epic Tier</li>
                </ul>
                <ul>
                  <li style={{color:"#f2d724"}}>Yellow - Legendary Tier</li>
                </ul>
                <br/>
                The way the rarities of an AuroraPunk are specified rely on their accessory amount (and background in the case of a <b style={{color:"#f2d724"}}>Legendary</b> mint) with which they were randomly generated and are as follows:
                <br/><br/>
                <ul>
                  <li style={{color:"#fff"}}>Common: 2 or less accessories, like so</li>
                </ul>
                <img style={{border: "4px groove #fff", boxShadow: "0px 0px 15px 0px #fff",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/146.svg"} alt={146} width={'128px'} height={'128px'}/>
                <ul>
                  <li style={{color:"#0055ff"}}>Rare: 3 accessories, like so</li>
                </ul>
                <img style={{border: "4px groove #0055ff", boxShadow: "0px 0px 15px 0px #0055ff",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/145.svg"} alt={145} width={'128px'} height={'128px'}/>
                <ul>
                  <li style={{color:"#aa1dd1"}}>Epic: 4 to 5 accessories, like so</li>
                </ul>
                <img style={{border: "4px groove #aa1dd1", boxShadow: "0px 0px 15px 0px #aa1dd1",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/143.svg"} alt={143} width={'128px'} height={'128px'}/>
                <img style={{border: "4px groove #aa1dd1", boxShadow: "0px 0px 15px 0px #aa1dd1",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/138.svg"} alt={138} width={'128px'} height={'128px'}/>
                <ul>
                  <li style={{color:"#f2d724"}}>Legendary: 6 to 7 Accessories, Gold or Silver background, as well as the first 40 numbered mints, like so</li>
                  
                </ul>
                <img style={{border: "4px groove #f2d724", boxShadow: "0px 0px 15px 0px #f2d724",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/114.svg"} alt={114} width={'128px'} height={'128px'}/>
                <img style={{border: "4px groove #f2d724", boxShadow: "0px 0px 15px 0px #f2d724",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/137.svg"} alt={137} width={'128px'} height={'128px'}/>
                <img style={{border: "4px groove #f2d724", boxShadow: "0px 0px 15px 0px #f2d724",marginRight:"12px"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/502.svg"} alt={502} width={'128px'} height={'128px'}/>
                <img style={{border: "4px groove #f2d724", boxShadow: "0px 0px 15px 0px #f2d724"}} src={"https://ipfs.io/ipfs/QmeKmhSGgn42kqN5dyt4X8XaXRkoNkNeFGVo38SRbnhASC/0.svg"} alt={0} width={'128px'} height={'128px'}/>
                <br/><br/>
                We hope this helps clarify how rarities are determined, however in the end, the best AuroraPunks are the ones you like most of course!<br/><br/>
                Happy Minting!
              </p>
          </div>
          
      </div>
    </Layout>
  );
}
