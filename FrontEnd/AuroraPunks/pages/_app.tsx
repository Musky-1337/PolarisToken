// Imports
import "@styles/global.scss";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
// Types
import type { AppProps } from "next/app";

function getLibrary(provider) {
  return new Web3(provider)
}

// Export application
export default function LootRNG({ Component, pageProps }: AppProps) {
  return(
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  ) 
}
