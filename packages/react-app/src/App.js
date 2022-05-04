import React, {useEffect, useState} from 'react'
import Web3 from "web3";
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'

import {ThemeProvider} from 'styled-components';
import useWeb3Modal from './hooks/useWeb3Modal'

import {Main} from '@project/react-app/src/components'
import {light} from '@project/react-app/src/themes'

import Header from '@project/react-app/src/components/header'
import Footer from '@project/react-app/src/components/footer'
import DebugPanel from '@project/react-app/src/components/debugPanel';
import {MessagePublisher, ModalDispatcher} from '@project/react-app/src/components/messaging'
import {Home, SimplePRE } from '@project/react-app/src/pages'

import { LegacyDashboard } from "@project/react-app/src/pages/manage/new/newStake"

import {Container, Row, Col } from 'react-bootstrap/';

import {Context, eventQueue} from '@project/react-app/src/services';
import ScrollToTop from "./components/scroll";

function App() {

    const [theme, setTheme] = useState(light);
    const [message, setMessage] = useState(null)
    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts, network] = useWeb3Modal(setMessage)

    const [availableNU, setAvailableNU] = useState(0)
    const [stakedNU, setStakedNU] = useState(0)
    const [availableKEEP, setAvailableKEEP] = useState(0)
    const [availableT, setAvailableT] = useState(0)
    const [StakeInfo, setStakeInfo] = useState({})
    const [availableETH, setAvailableETH] = useState(0)
    const [NUratio, setNUratio] = useState(0)
    const [KEEPratio, setKEEPratio] = useState(0)
    const [canWithdraw, setCanWithdraw] = useState(0);

    const [maxKEEPconversion, setMaxKEEPconversion] = useState(0)
    const [maxNUconversion, setMaxNUconversion] = useState(0)


    const [NUallowance, setNUallowance] = useState(new Web3.utils.BN("0"))
    const [Tallowance, setTallowance] = useState(new Web3.utils.BN("0"))
    const [workerAddress, setWorkerAddress] = useState(null)
    const [stakerData, setStakerData] = useState({substakes: []})
    const [stakerUpdated, setStakerUpdated] = useState(0)
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
            contracts,
        },
        messages: {
            message,
            setMessage
        },
        modals: {
            modal,
            triggerModal
        },
        stakerData: stakerData,
        workerAddress: {set: setWorkerAddress, get: workerAddress},
        availableNU: {set: setAvailableNU, get: availableNU},
        availableT: {set: setAvailableT, get: availableT},
        availableKEEP: {set: setAvailableKEEP, get: availableKEEP},
        availableETH: {set: setAvailableETH, get: availableETH},
        NUallowance: {set: setNUallowance, get: NUallowance},
        Tallowance: {set: setTallowance, get: Tallowance},
        NUratio: {set: setNUratio, get: NUratio},
        KEEPratio: {set: setKEEPratio, get: KEEPratio},

        stakedNU,
        StakeInfo,


        maxKEEPconversion: {set: setMaxKEEPconversion, get: maxKEEPconversion},
        maxNUconversion: {set: setMaxNUconversion, get: maxNUconversion},


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
        setActionsCompleted,

        canWithdraw,
    }

    const updateStakerData = async (contracts, context) => {

        context.setStakerUpdates(context.pending.filter(f => {
            return context.actionsCompleted.indexOf(f) === -1
        }))

        const stakerNuWallet = await contracts.NU.methods.balanceOf(account).call()
        setAvailableNU(stakerNuWallet)

        const TWallet = await contracts.T.methods.balanceOf(account).call()
        setAvailableT(TWallet)

        // handle missing vending machine/keep contracts
        try{
            const keepWallet = await contracts.KEEP.methods.balanceOf(account).call()
            setAvailableKEEP(keepWallet)

            const NUtoTRatio = await contracts.NUVENDINGMACHINE.methods.ratio().call()
            const NUtoTDivisor = await contracts.NUVENDINGMACHINE.methods.FLOATING_POINT_DIVISOR().call()
            setNUratio((NUtoTRatio / NUtoTDivisor).toFixed(15))
            const totalNUconversion = await contracts.NUVENDINGMACHINE.methods.conversionToT(stakerNuWallet).call()
            setMaxNUconversion(totalNUconversion)

            const KEEPtoTRatio = await contracts.KEEPVENDINGMACHINE.methods.ratio().call()
            const KEEPtoTDivisor = await contracts.KEEPVENDINGMACHINE.methods.FLOATING_POINT_DIVISOR().call()
            setKEEPratio((KEEPtoTRatio / KEEPtoTDivisor).toFixed(15))

            const totalKEEPconversion = await contracts.KEEPVENDINGMACHINE.methods.conversionToT(availableKEEP).call()
            setMaxKEEPconversion(totalKEEPconversion)
        } catch (err){
            console.warn(err);
            setNUratio(3.259242493160745)
        }
        if (contracts.STAKINGESCROW){
            const stakedNU = await contracts.STAKINGESCROW.methods.getAllTokens(account).call()
            setStakedNU(stakedNU)
    


            const unVested = await contracts.STAKINGESCROW.methods.getUnvestedTokens(account).call()
            setCanWithdraw(Web3.utils.toBN(stakedNU).sub(Web3.utils.toBN(unVested)))
        }

        if (contracts.TOKENSTAKING){
            const TstakeInfo = await contracts.TOKENSTAKING.methods.stakes(account).call()
            const nuInTStake= Web3.utils.toBN(TstakeInfo.nuInTStake)
            const tStake = Web3.utils.toBN(TstakeInfo.tStake)
            const keepInTStake = Web3.utils.toBN(TstakeInfo.keepInTStake)
            const total = nuInTStake.add(tStake).add(keepInTStake)

            setStakeInfo({nuInTStake, tStake, keepInTStake, total})

            contracts.T.methods.allowance(account, contracts.TOKENSTAKING._address).call().then(r=>{
                setTallowance(web3.utils.toBN(r))
            })
        }
    }

    useEffect(() => {
        if (contracts && account) {
            updateStakerData(contracts, context)
        }
    }, [account, contracts, web3, stakerUpdated])


    useEffect(() => {
        // populate any notifications based on user state.

        if (stakerData.flags && stakerData.flags.migrated === false && stakerData.info.lockedTokens !== "0") {
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
            if (eventQueue.length) {
                //trigger a refresh of staker data
                setActionsCompleted([...eventQueue])

                setStakerUpdated(Date.now())
                // clear the eventQueue
                eventQueue.splice(0, eventQueue.length)
            }
        }, 1000)
    }, [])

    return (
        <Context.Provider value={context}>
            <ThemeProvider theme={theme}>
                <Router>
                    <ScrollToTop>
                        <Header theme={theme} setTheme={setTheme}/>
                        <ModalDispatcher/>
                        <Main id="NCmain">
                            <Switch>
                                {/* <Route path="/wrap">
                                    <Wrap theme={theme}/>
                                </Route> */}
                                <Route path="/legacy">
                                    <Row>
                                        <Col>
                                            <LegacyDashboard/>
                                        </Col>
                                    </Row>
                                </Route>
                                <Route path="/manage">
                                    <SimplePRE/>
                                </Route>
                                <Route path="/">
                                    <Home/>
                                </Route>
                            </Switch>
                        </Main>
                        <Footer/>
                    </ScrollToTop>
                </Router>
                <MessagePublisher/>
                {!process.env.NODE_ENV || process.env.NODE_ENV === 'development' && <DebugPanel/>}
            </ThemeProvider>
        </Context.Provider>
    )
}

export default App
