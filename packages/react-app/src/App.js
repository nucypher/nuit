import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'

import { ThemeProvider } from 'styled-components';
import useWeb3Modal from 'hooks/useWeb3Modal'

import { Main } from './components'
import { light } from './themes'

import Header from './components/header'
import Footer from './components/footer'
import { Home, Manage, NewStake, Documentation } from './pages'

import { Container } from 'react-bootstrap/';

import { Context } from 'utils';


function App () {

  const [theme, setTheme] = useState(light);

  const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts] = useWeb3Modal()
  const context = {
    wallet: {
      provider,
      loadWeb3Modal,
      logoutOfWeb3Modal,
      account,
      web3,
      contracts
    }
  }



  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <Router>
        <Header theme={theme} setTheme={setTheme}/>
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
