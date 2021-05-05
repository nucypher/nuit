import React, {useContext} from 'react'
import {HeaderNav, NCLogo, Period, SecondaryButton, ThemeButton} from '@project/react-app/src/components'
import {Context, truncateAddress} from '@project/react-app/src/services'
import {getCurrentPeriod} from '@project/react-app/src/constants'
import {dark, light} from '@project/react-app/src/themes'
import {Nav, Navbar, Form} from "react-bootstrap";
import Web3 from "web3";

import {Link} from 'react-router-dom'

function WalletLogo(props) {
    const provider = props.provider
    const isMetaMask = provider && provider.isMetaMask
    if (isMetaMask) return <img className="mr-2" src={require('../assets/icons/metamask.svg')}/>
    else return <img className="mr-2" src={require('../assets/icons/walletconnect.svg')}/>
}

function WalletButton ({ provider, loadWeb3Modal, logoutOfWeb3Modal, account }) {
    return (
      <SecondaryButton
          id="wallet-button"
          className="mr-lg-5"
            onClick={() => {
              if (!provider) {
                loadWeb3Modal()
              } else {
                logoutOfWeb3Modal()
              }
            }}
          >
        {provider ? <WalletLogo provider={provider}/> : 'connect'}
        <Navbar.Collapse>{!provider ? '': truncateAddress(Web3.utils.toChecksumAddress(account))}</Navbar.Collapse>
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
          <Navbar expand="lg">
              <Navbar.Brand><NCLogo theme={theme}/></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse  id="basic-navbar-nav">
              <Nav className="d-flex justify-content-end align-items-center">
                <Link to="/new/worker" className="mr-4">New Stake</Link>
                <Link to="/manage" className="mr-4">Manage</Link>
                <Link to="https://www.nucypher.com/network">Learn</Link>
                <div><ThemeButton theme={{current: theme, setTheme, light, dark}} ></ThemeButton></div>
                <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} account={account}/>
              </Nav>
              </Navbar.Collapse>
          </Navbar>
        </HeaderNav>
    )
}
