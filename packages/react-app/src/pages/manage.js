import React, {useContext, useEffect, useState} from 'react'

import {Context} from '@project/react-app/src/services'

import {Col, Container, Row} from 'react-bootstrap/';
import {
    Blue,
    ButtonBox,
    CircleQ,
    DataRow,
    EthBalance,
    Grey,
    InputBox,
    NuBalance,
    PendingButton,
    PrimaryButton,
    SubStakeList,
    ToggleButton,
    WorkerRunwayDisplay,
    Spinner,
    Address
} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {HistoryPane} from "../components/history";

export function Manage() {

    const context = useContext(Context)
    const {account} = context.wallet

    const workerAddress = context.workerAddress.get
    const availableETH = context.availableETH.get
    const availableNU = context.availableNU.get
    const setAvailableETH = context.availableETH.set
    const setAvailableNU = context.availableNU.set

    const [stakerData, setStakerData] = useState({})

    // TODO:  clean this into a for loop
    const [windingdown, setWindingdown]  = useState(false)
    const [restaking, setRestaking] = useState(false)
    const [bondingworker, setBondingWorker]  = useState(false)
    const [addingsubstake, setAddingSubstake] = useState(false)
    const [migrating, setMigrating] = useState(false)
    const [withdrawingNU, setWithdrawingNU] = useState(false)


    const [showInactive, setShowInactive] = useState(false)

    const handleChangeWorker = () => {
        context.modals.triggerModal({message: "Bond Worker", component: "BondWorker"})
    }

    const handleChangeRestake = () => {
        context.modals.triggerModal({message: "Toggle Restake", component: "Restake"})
    }

    const handleChangeWindDown = () => {
        context.modals.triggerModal({message: "Toggle WindDown", component: "Winddown"})
    }

    const handleAddSubstake = () => {
        context.modals.triggerModal({message: "Add Substake", component: "CreateStake"})
    }

    const handleWithdrawNU = () => {
        context.modals.triggerModal({message: "Withdraw NU", component: "WithdrawNU"})
    }

    useEffect(() => {
        setStakerData(context.stakerData)
    },[account, context.stakerData])

    useEffect(() => {
        setWindingdown(context.pending.indexOf('winddown') > -1)
        setRestaking(context.pending.indexOf('restake') > -1)
        setBondingWorker(context.pending.indexOf('bondingworker') > -1)
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
        setMigrating(context.pending.indexOf('migrate') > -1)
        setWithdrawingNU(context.pending.indexOf('withdrawNU') > -1)

    }, [context.pending.length, context.pending])


    return (

        <Container fluid>
            <Row>
                <Breadcrumbs paths={[
                    {path:'/', label: 'root', enabled: true },
                    {path: '/manage', label: 'manage', enabled: true},
                ]}/>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Manage Staked Nu</h1>
                </Col>
            </Row>
            {migrating ? <Row><Col className="d-flex justify-content-center"><h3><Spinner/>Please wait for migration to complete. <Spinner/></h3></Col></Row> :
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={10} xl={4}>
                    <InputBox>
                        <Row noGutters>
                            <Col className="d-flex justify-content-flex-start mb-1">
                                <h5>Rewards</h5>
                            </Col>
                        </Row>
                        <Row noGutters>
                            <Col>
                                <Row  className="d-flex justify-content-between">
                                <Col xs={6} xl={12} className="mb-3">
                                    <div className="nowrap">
                                        <strong>Staking</strong>
                                        <CircleQ tooltip="NU Rewards earned by committing to work for the network"/>
                                    </div>
                                    <PendingButton small activeCheck={withdrawingNU} onClick={handleWithdrawNU} className="mt-2 nowrap"> <NuBalance balance={stakerData.availableNUWithdrawal}/></PendingButton>
                                </Col>
                                <Col xs={6} xl={12}>
                                    <div className="nowrap">
                                        <strong>Policy</strong>
                                        <CircleQ tooltip="ETH rewards collected from policy fees"/>
                                    </div>
                                    <PrimaryButton className="mt-2 nowrap"> {stakerData.availableETHWithdrawal} <Grey>ETH</Grey></PrimaryButton>
                                </Col>
                                </Row>
                            </Col>
                        </Row>
                    </InputBox>
                    <InputBox className="mt-4 mb-4">
                        <Row noGutters>
                            <Col className="d-flex justify-content-flex-start mb-1">
                                <h5>Settings</h5>
                            </Col>
                        </Row>
                        <Row noGutters>
                            {stakerData.flags ? <Col>
                                <Row className="d-flex justify-content-between">
                                    <Col xs={6} xl={12} className="mb-3">
                                        <div className="nowrap">
                                            <strong className="nowrap">Re-Stake</strong>
                                            <CircleQ tooltip="Compound your staking returns by automatically re-staking each period's rewards."/>
                                        </div>
                                        <ToggleButton abort={setRestaking} activeCheck={restaking} boolState={stakerData.flags.reStake} onClick={handleChangeRestake} />
                                    </Col>
                                    <Col xs={6} xl={12}>
                                        <div className="nowrap">
                                            <strong className="nowrap">Wind Down</strong>
                                            <CircleQ tooltip="Each period committed will reduce stake length by one period."/>
                                        </div>
                                        <ToggleButton abort={setWindingdown} activeCheck={windingdown} boolState={stakerData.flags.windDown} onClick={handleChangeWindDown} />
                                    </Col>
                                </Row>
                            </Col>: null}
                        </Row>
                    </InputBox>
                </Col>
                <Col xs={12} md={10} xl={6}>
                    {stakerData.info ? <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-flex-start mb-4">
                                <h5>Running</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <Grey>Worker</Grey>
                                    <PendingButton small activeCheck={bondingworker} onClick={handleChangeWorker} abort={setBondingWorker}>{workerAddress ? 'Change' : 'Set Worker'}</PendingButton>
                                </div>
                               <ButtonBox className="mb-3 mt-1 control-box">
                                   { workerAddress ?
                                    <div>
                                        <strong><Address>{workerAddress}</Address></strong>
                                        <WorkerRunwayDisplay address={workerAddress}/>
                                        <DataRow>
                                            <strong>Last Committed Period</strong><span><strong><Blue>{stakerData.info.nextCommittedPeriod || stakerData.info.nextCommittedPeriod}</Blue></strong></span>
                                        </DataRow>
                                    </div> : <p> no worker associated with account</p>}
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3 control-box">
                                   <strong><Address>{account}</Address></strong>
                                   <DataRow className="mt-3">
                                       <strong>ETH balance</strong><span><EthBalance balance={availableETH} onBalance={setAvailableETH}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>NU balance <small>(wallet)</small></strong><span><NuBalance balance={availableNU} onBalance={setAvailableNU}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>Total NU Locked</strong><span><NuBalance balance={stakerData.lockedNU}/></span>
                                    </DataRow>
                               </ButtonBox>
                               <div className="d-flex justify-content-between align-items-center mb-2">
                                <Grey>Substakes</Grey>
                                <PendingButton small activeCheck={addingsubstake} onClick={handleAddSubstake} abort={setAddingSubstake}>Add Substake</PendingButton>
                                </div>
                                {stakerData.substakes ? <SubStakeList substakes={stakerData.substakes} element={ButtonBox} /> : null}
                            </Col>
                        </Row>
                    </InputBox>: <InputBox><Spinner/></InputBox>}
                </Col>
                <Col xs={12}>
                    <div id="historyLabel" className="flex-row justify-content-lg-center text-center">
                        <h4>History</h4>
                    </div>
                    <HistoryPane/>
                </Col>
            </Row>}
        </Container>
    )
}