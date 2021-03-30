import React from 'react'
import { SecondaryButton, ThemeButton, NCLogo, HeaderNav } from '../components'
import { truncate } from '../utils'
import useWeb3Modal from '../hooks/useWeb3Modal'

import { light, dark } from '../themes'

function WalletButton ({ provider, loadWeb3Modal, logoutOfWeb3Modal, account }) {
    return (
      <SecondaryButton
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
    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account] = useWeb3Modal()

    React.useEffect(() => {
        props.setTheme(theme => window.localStorage.getItem('theme') === 'dark' ? dark : props.theme)
      }, [])

    return (
        <HeaderNav>
            <NCLogo theme={theme}/>
            <ThemeButton theme={{current: theme, setTheme, light, dark}} ></ThemeButton>
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} account={account}/>
        </HeaderNav>
    )
}