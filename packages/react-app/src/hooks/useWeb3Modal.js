import { useCallback, useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = process.env.REACT_APP_INFURA_ID

const NETWORK_NAME = 'mainnet'

function useWeb3Modal (config = {}) {
  const [provider, setProvider] = useState()
  const [account, setAccount] = useState()
  const [autoLoaded, setAutoLoaded] = useState(false)
  const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId
        }
      }
    }
  })

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
     // await window.localStorage.removeItem('walletconnect')
      window.location.reload()
    },
    [web3Modal]
  )

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect()
    await provider.enable();
    setProvider(provider)

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      logoutOfWeb3Modal()
    });provider.on("disconnect", () => {
      logoutOfWeb3Modal()
    });


    provider.on("connect", () => {
      console.log('connected')
    });


    // Subscribe to provider disconnection


    if (provider.wc){
      // it's a walletconnect provider
      setAccount(provider.wc.accounts[0])
    }
    else{
      //it's metamask.  The metamask plugin assigned this nice attribute.
      setAccount(window.ethereum.selectedAddress)
    }

  }, [web3Modal, logoutOfWeb3Modal])


  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal()
      setAutoLoaded(true)
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider])

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, account]
}

export default useWeb3Modal
