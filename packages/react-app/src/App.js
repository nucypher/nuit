import React, {useState} from 'react'

import { ThemeProvider } from 'styled-components';


import { Main, SecondaryButton, Header, ThemeButton, NCLogo } from './components'
import useWeb3Modal from './hooks/useWeb3Modal'



import { light, dark } from './themes'
import { truncate } from './utils'

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

function App () {
  //const { loading, error, data } = useQuery(GET_TRANSFERS)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, account] = useWeb3Modal()

  const [theme, setTheme] = useState(light);

  React.useEffect(() => {
    setTheme(theme => window.localStorage.getItem('theme') === 'dark' ? dark : theme)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <NCLogo theme={theme}/>
        <ThemeButton theme={{current: theme, setTheme, light, dark}} ></ThemeButton>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} account={account}/>
      </Header>
      <Main>
      </Main>
    </ThemeProvider>
  )
}

export default App
