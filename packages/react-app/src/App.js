import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'

import { ThemeProvider } from 'styled-components';
import useWeb3Modal from '@project/react-app/src/hooks/useWeb3Modal'

import { Main } from '@project/react-app/src/components'
import { light } from '@project/react-app/src/themes'

import Header from '@project/react-app/src/components/header'
import Footer from '@project/react-app/src/components/footer'
import { MessagePublisher } from '@project/react-app/src/components/messaging'
import { Home, Manage, NewStake, Documentation } from '@project/react-app/src/pages'

import { Container } from 'react-bootstrap/';

import { Context } from '@project/react-app/src/utils';


function App () {

  const [theme, setTheme] = useState(light);
  const [message, publishMessage] = useState(null)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts] = useWeb3Modal(publishMessage)

  const context = {
    wallet: {
      provider,
      loadWeb3Modal,
      logoutOfWeb3Modal,
      account,
      web3,
      contracts
    },
    messages:{
      message,
      publishMessage
    }
  }

  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <Router>
        <Header theme={theme} setTheme={setTheme}/>
        <MessagePublisher/>
        <Main id="NCmain">
          <Container>
            <Switch>
              <Route path="/new">
                <NewStake />
              </Route>
              <Route path="/manage">
                <Manage />
              </Route>
              <Route path="/Documentation">
                <Documentation />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Main>
        <Footer/>
        </Router>
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App
