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
import Home from './pages/home'



function App () {


  const [theme, setTheme] = useState(light);

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Header theme={theme} setTheme={setTheme}/>
      <Main>
      <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
      </Router>
    </ThemeProvider>
  )
}

export default App
