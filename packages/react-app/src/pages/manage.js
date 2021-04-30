import React, {useContext, useEffect, useState} from 'react'

import {Context} from '@project/react-app/src/utils'

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
    WorkerRunwayDisplay
} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {HistoryPane} from "../components/history";

export function Manage() {

    const context = useContext(Context)
    const {account} = context.wallet
    const stakerData = context.stakerData
    const workerAddress = context.workerAddress.get
    const availableETH = context.availableETH.get
    const availableNU = context.availableNU.get
    const setAvailableETH = context.availableETH.set
    const setAvailableNU = context.availableNU.set

    // TODO:  clean this into a for loop
    const [windingdown, setWindingdown]  = useState(false)
    const [restaking, setRestaking] = useState(false)
    const [bondingworker, setBondingWorker]  = useState(false)
    const [addingsubstake, setAddingSubstake] = useState(false)
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

    useEffect(() => {
        setWindingdown(context.pending.indexOf('winddown') > -1)
        setRestaking(context.pending.indexOf('restake') > -1)
        setBondingWorker(context.pending.indexOf('bondingworker') > -1)
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)

    }, [context.pending.length, context.pending])


    return (
        <Container>
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

            <Row className="d-flex justify-content-center">
                <Col xl={6} >
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Rewards</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-flex justify-content-around">
                                <Col>
                                <strong>Staking</strong>
                                <CircleQ tooltip="NU Rewards earned by committing to work for the network"/>
                                <PrimaryButton className="mt-2" width="100"><small>Withdraw</small>  <NuBalance balance={stakerData.availableNUWithdrawal}/></PrimaryButton>
                                </Col>

                                <Col>
                                <strong>Policy</strong>
                                <CircleQ tooltip="ETH rewards collected from policy fees"/>
                                <PrimaryButton className="mt-2" width="100"><small>Withdraw</small> {stakerData.availableETHWithdrawal} <Grey>ETH</Grey></PrimaryButton>
                                </Col>
                            </Col>
                        </Row>
                    </InputBox>
                    <InputBox className="mt-5 mb-5">
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Settings</h5>
                            </Col>
                        </Row>
                        <Row>
                            {stakerData.flags ? <Col className="d-flex justify-content-around">
                                <Col>
                                    <strong>Re-Stake</strong>
                                    <CircleQ tooltip="Compound your staking returns by automatically re-staking each period's rewards."/>
                                    <ToggleButton abort={setRestaking} activeCheck={restaking} boolState={stakerData.flags.reStake} onClick={handleChangeRestake} />
                                </Col>
                                <Col>
                                    <strong>Wind Down</strong>
                                    <CircleQ tooltip="Each period commited will reduce stake length by one period."/>
                                    <ToggleButton abort={setWindingdown} activeCheck={windingdown} boolState={stakerData.flags.windDown} onClick={handleChangeWindDown} />
                                </Col>
                            </Col>: null}
                        </Row>
                    </InputBox>
                </Col>
                <Col xl={6}>
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Running</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <div className="d-flex justify-content-between">
                                <Grey>Worker</Grey>
                                <PendingButton small activeCheck={bondingworker} onClick={handleChangeWorker} abort={setBondingWorker}>{workerAddress ? 'Change' : 'Set Worker'}</PendingButton>
                                </div>
                               <ButtonBox className="mb-3 mt-1">
                                   { workerAddress ?
                                   <div>
                                    <strong>{workerAddress}</strong>
                                    <WorkerRunwayDisplay address={workerAddress}/>
                                    <DataRow>
                                        <strong>Last Committed Period</strong><span><Blue>{stakerData.info.nextCommittedPeriod || stakerData.info.nextCommittedPeriod}</Blue></span>
                                        </DataRow>
                                    </div> : <p> no worker associated with account</p>}
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3">
                                   <strong>{account}</strong>
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
                               <div className="d-flex justify-content-between">
                                <Grey>Substakes</Grey>
                                <PendingButton small activeCheck={addingsubstake} onClick={handleAddSubstake} abort={setAddingSubstake}>Add Substake</PendingButton>
                                </div>
                                {stakerData.substakes.length ? <SubStakeList substakes={stakerData.substakes} element={ButtonBox} className="mt-1" /> : null}
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
                <Col>
                    <div id="historyLabel" className="flex-row justify-content-lg-center text-center">
                        <h4>History</h4>
                    </div>
                    <HistoryPane/>
                </Col>
            </Row>
        </Container>
    )
}