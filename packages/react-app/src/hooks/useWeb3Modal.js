import { useCallback, useEffect, useState, useContext } from 'react'
import Web3Modal from 'web3modal'
import Web3 from "web3";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getDefaultProvider } from '@ethersproject/providers'

import { addresses, abis } from '@project/contracts'
import { Contract } from '@ethersproject/contracts'

import { PUBLIC_CHAINS } from '@project/react-app/src/constants'

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = process.env.REACT_APP_INFURA_ID

const NETWORK_NAME = 'mainnet'

function useWeb3Modal (messageHandler, config = {}) {

  const [provider, setProvider] = useState()
  const [account, setAccount] = useState()
  const [autoLoaded, setAutoLoaded] = useState(false)
  const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config

  const [contracts, setContracts] = useState()

  const [web3, setWeb3] = useState()

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
      await window.localStorage.removeItem('walletconnect')
      window.location.reload()
    },
    [web3Modal]
  )

  const instantiateContracts = (provider, web3) => {
    const chID = provider.chainId
    const ABIs = abis[chID]
    const addrs = addresses[chID]

    if (addrs === undefined){
      messageHandler({type: 'error', message:`Unsupported Network.  Sorry, We don't currently support ${PUBLIC_CHAINS[parseInt(chID)] || 'chain ID: ' + chID}`})
      return
    }

    const ctrcts = {};
    if (provider && web3){
      const defaultProvider = getDefaultProvider(parseInt(provider.chainId))
      setContracts(
        Object.keys(addrs)
          .filter((name) => ABIs[name] !== undefined)
          .reduce((accumulator, contractName) => {
            try{
              accumulator[contractName] = new web3.eth.Contract(ABIs[contractName][3], addrs[contractName]);
            }catch(err){
              try{
                accumulator[contractName] = new Contract(addrs[contractName], ABIs[contractName], defaultProvider)
              }catch(err){
                console.warn(err)
              }
            }
            return accumulator
          }, ctrcts)
      )
    }
  }


  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect()
    await provider.enable();
    const w3 = new Web3(provider);
    setWeb3(w3)
    setProvider(provider)


    instantiateContracts(provider, w3)

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        loadWeb3Modal()
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        loadWeb3Modal()
    });

    provider.on("disconnect", () => {
      logoutOfWeb3Modal()
    });

    provider.on("connect", () => {
      console.log('connected')
    });

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

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts]
}

export default useWeb3Modal
