import React from 'react'
import { useContext } from 'react';
import { SecondaryButton, ThemeButton, NCLogo, HeaderNav } from '../components'
import { truncate, Context } from '../utils'

import { light, dark } from '../themes'

function WalletButton ({ provider, loadWeb3Modal, logoutOfWeb3Modal, account }) {
    return (
      <SecondaryButton
        width="12"
        onClick={() => {
          if (!provider) {
            loadWeb3Modal()
          } else {
            logoutOfWeb3Modal()
          }
        }}
      >
        {!provider ? 'Connect' : truncate(account)}
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
            <ThemeButton theme={{current: theme, setTheme, light, dark}} ></ThemeButton>
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} account={account}/>
        </HeaderNav>
    )
}