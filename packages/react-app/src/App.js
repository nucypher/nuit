import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'

import { ThemeProvider } from 'styled-components';

import { Main } from './components'
import { light } from './themes'

import Header from './components/header'
import Footer from './components/footer'
import { Home, Manage, NewStake, Learn } from './pages'

import { Container } from 'react-bootstrap/';


function App () {


  const [theme, setTheme] = useState(light);

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Header theme={theme} setTheme={setTheme}/>
      <Main id="NCmain">
        <Container fluid>
          <Switch>
            <Route path="/new">
              <NewStake />
            </Route>
            <Route path="/manage">
              <Manage />
            </Route>
            <Route path="/learn">
              <Learn />
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
  )
}

export default App
