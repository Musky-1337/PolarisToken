// Imports
import Link from "next/link"; // Routing
import { useRouter } from "next/router"; // Routing
import { default as HTMLHead } from "next/head"; // Meta
import styles from "@styles/components/Layout.module.scss"; // Styles
import Image from 'next/image';
// Types
import type { ReactElement } from "react";

export default function Layout({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div>
      {/* Meta */}
      <Head />
      {/* Top header */}
      <Header />

      {/* Page content */}
      <div className={styles.content}>{children}</div>
      {/* Bottom footer */}
      <Footer />
    </div>
  );
}

/**
 * Meta HTML Head
 * @returns {ReactElement} HTML Head component
 */
function Head(): ReactElement {
  return (
    <HTMLHead>
      {/* Primary Meta Tags */}
      <title>AuroraPunks</title>
      <meta name="title" content="AuroraPunks" />
      <meta
        name="description"
        content="AuroraPunks is a fun Punks themed NFT collection based on Larvalabs' original made by the #PolarisToken Team"
      />

      {/* OG + Faceook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.aurorapunks.art/" />
      <meta property="og:title" content="AuroraPunks" />
      <meta
        property="og:description"
        content="AuroraPunks is a fun Punks themed NFT collection based on Larvalabs' original made by the #PolarisToken Team"
      />
      <meta property="og:image" content="https://www.aurorapunks.art/meta.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.aurorapunks.art/" />
      <meta property="twitter:title" content="AuroraPunks" />
      <meta
        property="twitter:description"
        content="AuroraPunks is a fun Punks themed NFT collection based on Larvalabs' original made by the #PolarisToken Team"
      />
      <meta property="twitter:image" content="https://www.aurorapunks.art/meta.png" />

      {/* Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" 
        rel="stylesheet"
      />
    </HTMLHead>
  );
}
/*
{links.map(({ name, path }, i) => {
  // For each link, render link
  return (
    <li key={i}>
      <Link href={path}>
        <a
          className={
            pathname === path
              ? // Active class if pathname matches current path
                styles.header__links_active
              : undefined
          }
        >
          {name}
        </a>
      </Link>
    </li>
  );
*/
/**
 * Header
 * @returns {ReactElement} Header
 */

function Header() {
  // Collect current path for active links
  const { pathname } = useRouter();
  // All links


  return (
    
    <div className={styles.header}>
      {/* Main logo */}
      <div className={styles.header__logo}>
        <Link href="/" >
          <a style={{verticalAlign:"middle"}}><Image src={'/ex/0.svg'} alt={'punk'} width={'48px'} height={'48px'}/> AuroraPunks</a>
        </Link>
        
      </div>

      {/* Navigation */}



          {/*<Link href="https://discord.gg/bSw8bQAe">
            <p>Discord</p>
          </Link>
          <Link href="https://t.me/PolarisTokenEntry">
            <p>Telegram</p>
          </Link>
          <Link href="https://twitter.com/aurora_punks">
            <p>Twitter</p>
          </Link>
          <Link href="https://polaristoken.io">
            <p>Polaris</p>
          </Link>
          
          <Link href="https://explorer.mainnet.aurora.dev/token/0xE6Aad8A08EDfFC55bfB881940d7650A35f04e0A6">
            <p>Contract</p>
          </Link>
          <Link href="https://rainbowbridge.app/transfer">
            <p>Bridge</p>
  </Link>*/}
          

      
    </div>
    
  );
}

/**
 * Footer component
 * @returns {ReactElement} Footer
 */
function Footer(): ReactElement {
  return (
    <div className={styles.footer} style={{paddingTop:"24px"}}>
    © 2021, A project by <a href="https://polaristoken.io" target="_blank" rel="noreferrer" style={{verticalAlign:"middle"}}><Image  src={'/logo.png'} alt={'Polaris'} width={'128px'} height={'64px'}/></a>
    </div>
  );
}
