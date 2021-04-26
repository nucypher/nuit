import React, {useState, useEffect} from 'react'
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
import { EMPTY_WORKER } from '@project/react-app/src/constants'


function App () {

  const [theme, setTheme] = useState(light);
  const [message, publishMessage] = useState(null)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts] = useWeb3Modal(publishMessage)

  const [availableNU, setAvailableNU] = useState(0);
  const [availableETH, setAvailableETH] = useState(0)
  const [workerAddress, setWorkerAddress] = useState(null)
  const [stakerData, setStakerData] = useState({substakes:[]})
  const [stakerUpdated, setStakerUpdated] =  useState(false)

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
    },
    stakerData: stakerData,
    workerAddress: {set: setWorkerAddress, get: workerAddress},
    availableNU: {set: setAvailableNU, get: availableNU},
    availableETH: {set: setAvailableETH, get: availableETH}
  }

  useEffect(() => {
    const getStakerData = async () => {
        const stakerInfo = await contracts.STAKINGESCROW.methods.stakerInfo(account).call()
        stakerInfo.lockedTokens = await contracts.STAKINGESCROW.methods.getLockedTokens(account, 0).call();
        const flags = await contracts.STAKINGESCROW.methods.getFlags(account).call()
        const getSubStakesLength = await contracts.STAKINGESCROW.methods.getSubStakesLength(account).call()
        const policyInfo = await contracts.POLICYMANAGER.methods.nodes(stakerInfo.worker).call();

        let lockedNU = 0.0;
        // getting an array with all substakes
        const substakes = await (async () => {
            if (getSubStakesLength !== '0') {
                let substakeList = [];
                for (let i = 0; i < getSubStakesLength; i++) {

                    let rawList = await contracts.STAKINGESCROW.methods.getSubStakeInfo(account, i).call();
                    rawList.id = i.toString();
                    rawList.lastPeriod = await contracts.STAKINGESCROW.methods.getLastPeriodOfSubStake(account, i).call();

                    if (parseInt(rawList.lastPeriod) > 1){
                        substakeList.push(rawList);
                    }

                    lockedNU += parseInt(rawList.unlockingDuration) > 0 ? parseInt(rawList.lockedValue) : 0
                }
                return substakeList;
            } else {
                let substakeList = null;
                return substakeList;
            }
        })();


        setStakerData({
            info: stakerInfo,
            flags,
            substakes: substakes || [],
            lockedNU,
            policyInfo,
            availableNUWithdrawal: (new web3.utils.BN(stakerInfo.value)).sub(new web3.utils.BN(stakerInfo.lockedTokens)).toString(),
            availableETHWithdrawal: policyInfo[3]
        })
        if (stakerInfo.worker && stakerInfo.worker !== EMPTY_WORKER){
            setWorkerAddress(stakerInfo.worker)
        }
        setStakerUpdated(false)
    }

    if (contracts && account){
        getStakerData()
    }
  }, [account, contracts, web3, stakerUpdated])

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
