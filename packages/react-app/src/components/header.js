import React, {useContext} from 'react'
import {HeaderNav, NCLogo, SecondaryButton, ThemeButton} from '@project/react-app/src/components'
import {Context, truncateAddress} from '@project/react-app/src/services'

import {dark, light} from '@project/react-app/src/themes'
import {NavLink} from "react-bootstrap";

function WalletLogo(props) {
    const provider = props.provider
    const isMetaMask = provider && provider.isMetaMask
    if (isMetaMask) return <img className="mr-2" src={require('../assets/icons/metamask.svg')}/>
    else return ''
}

function WalletButton ({ provider, loadWeb3Modal, logoutOfWeb3Modal, account }) {
    return (
      <SecondaryButton
          className="mr-lg-5"
        width="12"
        onClick={() => {
          if (!provider) {
            loadWeb3Modal()
          } else {
            logoutOfWeb3Modal()
          }
        }}
      >
        <WalletLogo provider={provider}/>
        {!provider ? 'Connect' : truncateAddress(account)}
      </SecondaryButton>
    )
  }


export default function (props) {
    const theme = props.theme
    const setTheme = props.setTheme
    const context = useContext(Context)
    const {provider, loadWeb3Modal, logoutOfWeb3Modal, account} = context.wallet

    React.useEffect(() => {
        props.setTheme(theme => window.localStorage.getItem('theme') === 'dark' ? dark : props.theme)
      }, [props])

    return (
        <HeaderNav>
            <NCLogo theme={theme}/>
            <NavLink href="/new/worker">New Stake</NavLink>
            <NavLink href="/manage">Manage</NavLink>
            <NavLink href="https://www.nucypher.com/network">Learn</NavLink>
            <div><ThemeButton theme={{current: theme, setTheme, light, dark}} ></ThemeButton></div>
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} account={account}/>
        </HeaderNav>
    )
}