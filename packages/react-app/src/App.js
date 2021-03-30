import React, {useState} from 'react'

import { ThemeProvider } from 'styled-components';

import { Main, SecondaryButton, Header, ThemeButton, NCLogo } from './components'
import useWeb3Modal from './hooks/useWeb3Modal'

import { light, dark } from './themes'
import { truncate } from './utils'

import { ReactComponent as MetaMaskLogo } from './assets/icons/metamask.svg'



function WalletButton ({ theme, provider, loadWeb3Modal, logoutOfWeb3Modal }) {

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
    <MetaMaskLogo style={{'margin-right': "1em", "line-height":"1em", "v-align": "middle"}}/>
      {!provider ? 'Connect' : truncate(window.ethereum.selectedAddress)}
    </SecondaryButton>
  )
}

function App () {
  // const { loading, error, data } = useQuery(GET_TRANSFERS)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal({cacheProvider: true})

  const [theme, setTheme] = useState(light);

  React.useEffect(() => {
    setTheme(window.localStorage.getItem('theme') === 'dark' ? dark : light)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <NCLogo theme={theme}/>
        <ThemeButton theme={{current: theme, setTheme, light, dark}} ></ThemeButton>
        <WalletButton theme={theme} provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Main>

      </Main>
    </ThemeProvider>
  )
}

export default App
