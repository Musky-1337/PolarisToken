 // Imports
import Link from "next/link"; // Local routing
import Layout from "@components/Layout"; // Layout wrapper
//import { defaultBags } from "@utils/constants"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles





export default function links(){



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

                    <Link href={"/rarities"}>
                      <a >About Rarities</a>
                    </Link> 
                </li>
                

          </ul>

          {/* CTA Description */}
          
          </div>
          <div className={styles.home__cta} >
            <h1 style={{textShadow:"0px 0px 15px rgba(255, 255, 255, 1)",fontSize:"52px",paddingBottom:"24px"}}>Useful Links</h1>
              <p style={{backgroundColor:"rgba(0,0,0,0.8)",borderRadius:"50px", border:"2px solid #fff",padding:"12px"}}>
                <p style={{padding:"24px"}}>Community Links:</p>

              <p  style={{padding:"12px"}}><a href="https://discord.gg/cw2FScsX5C" style={{cursor:"pointer"}} target="_blank" rel="noreferrer">Discord</a></p>

                <p style={{padding:"12px"}}><a href="https://t.me/PolarisTokenEntry" style={{cursor:"pointer"}} target="_blank" rel="noreferrer">Telegram</a></p>

              <p style={{padding:"12px"}}><a href="https://twitter.com/aurora_punks" style={{cursor:"pointer"}} target="_blank" rel="noreferrer">Twitter</a></p>

              <p style={{padding:"12px"}}><a href="https://polaristoken.io" style={{cursor:"pointer"}} target="_blank" rel="noreferrer">Polaris Token Main Site</a></p>
              <p style={{padding:"24px"}}>Other useful links:</p>

              <p  style={{padding:"12px"}}><a href="https://explorer.mainnet.aurora.dev/token/0xE6Aad8A08EDfFC55bfB881940d7650A35f04e0A6" style={{cursor:"pointer"}} target="_blank" rel="noreferrer">Contract</a></p>

              <p style={{paddingBottom:"24px"}}><a href="https://rainbowbridge.app/transfer" style={{cursor:"pointer"}} target="_blank" rel="noreferrer">Aurora Bridge</a></p>
              </p>
          </div>
          
      </div>
    </Layout>
  );
}
