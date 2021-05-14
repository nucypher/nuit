import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'

import {ThemeProvider} from 'styled-components';
import useWeb3Modal from './hooks/useWeb3Modal'

import {Main} from '@project/react-app/src/components'
import {light} from '@project/react-app/src/themes'

import Header from '@project/react-app/src/components/header'
import Footer from '@project/react-app/src/components/footer'
import {MessagePublisher, ModalDispatcher} from '@project/react-app/src/components/messaging'
import {Documentation, Home, Manage, NewStake} from '@project/react-app/src/pages'

import {Container} from 'react-bootstrap/';

import {Context, eventQueue} from '@project/react-app/src/services';
import {EMPTY_WORKER} from '@project/react-app/src/constants'
import {Alert} from "react-bootstrap";

function App () {

  const [theme, setTheme] = useState(light);
  const [message, setMessage] = useState(null)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts] = useWeb3Modal(setMessage)

  const [availableNU, setAvailableNU] = useState(0);
  const [availableETH, setAvailableETH] = useState(0)
  const [workerAddress, setWorkerAddress] = useState(null)
  const [stakerData, setStakerData] = useState({substakes:[]})
  const [stakerUpdated, setStakerUpdated] =  useState(0)
  const [stakerUpdates, setStakerUpdates] = useState([])
  const [actionsCompleted, setActionsCompleted] = useState([])
  const [modal, triggerModal] = useState(null)
  const [periodsAsDate, setPeriodsAsDate] = useState(true)

  const [privacy, setPrivacy] = useState(null)

  const context = {
    periodsAsDate,
    setPeriodsAsDate,
    privacy,
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
      setMessage
    },
    modals:{
      modal,
      triggerModal
    },
    stakerData: stakerData,
    workerAddress: {set: setWorkerAddress, get: workerAddress},
    availableNU: {set: setAvailableNU, get: availableNU},
    availableETH: {set: setAvailableETH, get: availableETH},

    /* populated by services.ContractCaller,
      pending is an array of strings that represent a pending
      transaction on the blockchain.

      For example when someone confirms
      a "migrate" transaction, pending gets unshifted 'migrate'.  When we receive
      a confirmation for the transaction, we remove it from the array.

      The migrate button or other UI can thusn manage spinners and user feedback
      by checking if 'migrate' is in pending.
    */
    pending: stakerUpdates,
    setStakerUpdates, // sets stakerUpdates/pending
    /*
      stakerUpdated is an integer.
      when we want to update all the staker data, we
      set it to the timestamp of an event which
      triggers the refresh.
    */
    stakerUpdated,
    setStakerUpdated,

    /* we have a periodic task that runs so we can update the UI in batches.
      In the event that multiple blockchain updates are initiated in quick succession,
      this is the only way to ensure consistent UI updates in the event that multiple
      transactions confirm in the same block.

      When a batch of updates are received, they are pushed into the 'actionsCompleted' array.
      This is then used to remove those actions from 'pending' (described above)
    */
    actionsCompleted,
    setActionsCompleted
  }

  const updateStakerData = async (contracts, context) => {

    const stakerInfo = await contracts.STAKINGESCROW.methods.stakerInfo(account).call()
    stakerInfo.lockedTokens = await contracts.STAKINGESCROW.methods.getLockedTokens(account, 0).call();
    stakerInfo.futureLockedTokens = await contracts.STAKINGESCROW.methods.getLockedTokens(account, 1).call();
    stakerInfo.ownedTokens = await contracts.STAKINGESCROW.methods.getAllTokens(account).call()
    const flags = await contracts.STAKINGESCROW.methods.getFlags(account).call()
    const getSubStakesLength = await contracts.STAKINGESCROW.methods.getSubStakesLength(account).call()

    const policyInfo = stakerInfo.worker === EMPTY_WORKER ? null : await contracts.POLICYMANAGER.methods.nodes(stakerInfo.worker).call();

    let lockedNU = web3.utils.toBN(0)
    // getting an array with all substakes
    const substakes = await (async () => {
        if (getSubStakesLength !== '0') {
            let substakeList = [];
            for (let i = 0; i < getSubStakesLength; i++) {
                let stakedata = await contracts.STAKINGESCROW.methods.getSubStakeInfo(account, i).call();
                stakedata.index = i
                stakedata.id = i.toString()
                stakedata.lastPeriod = await contracts.STAKINGESCROW.methods.getLastPeriodOfSubStake(
                  account, stakedata.id).call();
                substakeList.push(stakedata);

                if (parseInt(stakedata.unlockingDuration)){
                  lockedNU = lockedNU.add( web3.utils.toBN(stakedata.lockedValue) )
                }

            }
            return substakeList;
        } else {
            let substakeList = null;
            return substakeList;
        }
    })();


    // Available Unlocked NU (thx stakeit)
    const lockedStakerNits = await contracts.STAKINGESCROW.methods.getLockedTokens(account, 0).call();
    const lockedStakerFutureNits = await contracts.STAKINGESCROW.methods.getLockedTokens(account, 1).call();

    const past = web3.utils.toBN(lockedStakerNits)
    const future = web3.utils.toBN(lockedStakerFutureNits)

    // Math.max doesn't work on BNs
    const amt = past > future ? past : future

    const stakerUnlockedNits = web3.utils.toBN(stakerInfo.value).sub(amt);
    const availableNUWithdrawal = stakerUnlockedNits

    const stakerNuWallet = await contracts.NU.methods.balanceOf(account).call()
    setAvailableNU(stakerNuWallet)
    setStakerData({
        info: stakerInfo,
        flags,
        substakes: substakes || [],
        lockedNU,
        policyInfo,
        availableNUWithdrawal,
        availableETHWithdrawal: policyInfo ? policyInfo.reward : 0// this data is showing 777 if no stakes exist
    })
    if (stakerInfo.worker && stakerInfo.worker !== EMPTY_WORKER){
        setWorkerAddress(stakerInfo.worker)
    }
    context.setStakerUpdates(context.pending.filter(f=>{return context.actionsCompleted.indexOf(f) === -1}))
    context.setActionsCompleted([])
  }

  useEffect(() => {
    if (contracts && account){
      updateStakerData(contracts, context)
    }
  }, [account, contracts, web3, stakerUpdated])


  useEffect(() => {
    // populate any notifications based on user state.

    if (stakerData.flags && stakerData.flags.migrated === false && stakerData.info.lockedTokens !== "0"){
      context.modals.triggerModal({message: "Staker must be migrated", component: "Migrate"})
    }
  }, [stakerData.flags])


  useEffect(() => {

  }, [context.pending])


  useEffect(() => {
    // runs once at startup and sets up this crappy event queue
    // this is a hack to deal with issues where multiple transactions get finished in the same block
    // and clobber each other's pending UI states

    setInterval(async () => {
      if (eventQueue.length){
        //trigger a refresh of staker data
        setActionsCompleted([...eventQueue])

        setStakerUpdated(Date.now())
        // clear the eventQueue
        eventQueue.splice(0, eventQueue.length)
      }
    }, 5000)
  }, [])

  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <Router>
        <Header theme={theme} setTheme={setTheme}/>
        <ModalDispatcher/>
        <Main id="NCmain">
            <Switch>
              <Route path="/new">
                <NewStake />
              </Route>
              <Route path="/manage">
                <Manage theme={theme}/>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Main>
        <Footer/>
        </Router>
        <MessagePublisher/>
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App
