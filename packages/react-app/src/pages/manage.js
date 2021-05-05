import React, {useContext, useEffect, useState} from 'react'

import {Context} from '@project/react-app/src/services'

import {Col, Container, Row} from 'react-bootstrap/';
import {
    Address,
    Blue,
    ButtonBox,
    DataRow,
    EthBalance,
    Grey,
    InputBox,
    NuBalance,
    PendingButton,
    Spinner,
    SubStakeList,
    WorkerRunwayDisplay
} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {HistoryPane} from "../components/history";
import Web3 from "web3";
import CurrentPeriodPanel from "../components/period";
import RewardsPanel from "../components/rewards";
import StakeSettingsPanel from "../components/settings";

export function Manage(props) {

    const context = useContext(Context)
    const {account} = context.wallet

    const workerAddress = context.workerAddress.get
    const availableETH = context.availableETH.get
    const availableNU = context.availableNU.get
    const setAvailableETH = context.availableETH.set
    const setAvailableNU = context.availableNU.set

    const [stakerData, setStakerData] = useState({})

    // TODO:  clean this into a for loop

    const [bondingworker, setBondingWorker] = useState(false)
    const [addingsubstake, setAddingSubstake] = useState(false)
    const [migrating, setMigrating] = useState(false)

    const handleChangeWorker = () => {
        context.modals.triggerModal({message: "Bond Worker", component: "BondWorker"})
    }

    const handleAddSubstake = () => {
        context.modals.triggerModal({message: "Add Substake", component: "CreateStake"})
    }

    useEffect(() => {
        setStakerData(context.stakerData)
    }, [account, context.stakerData])

    useEffect(() => {
        setBondingWorker(context.pending.indexOf('bondworker') > -1)
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
        setMigrating(context.pending.indexOf('migrate') > -1)
    }, [context.pending.length, context.pending])


    return (

        <Container fluid>
            <Row>
                <Breadcrumbs paths={[
                    {path: '/', label: 'root', enabled: true},
                    {path: '/manage', label: 'manage', enabled: true},
                ]}/>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Manage Staked Nu</h1>
                </Col>
            </Row>
            {migrating ? <Row><Col className="d-flex justify-content-center"><h3><Spinner/>Please wait for migration to
                    complete. <Spinner/></h3></Col></Row> :
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={10} xl={4}>
                        {/*<CurrentPeriodPanel/>*/}
                        <RewardsPanel {...stakerData} />
                        <StakeSettingsPanel {...stakerData}/>
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
                                        <PendingButton small
                                                       activeCheck={bondingworker}
                                                       onClick={handleChangeWorker}
                                                       abort={setBondingWorker}>
                                            {workerAddress ? 'Change' : 'Set Worker'}
                                        </PendingButton>
                                    </div>
                                    <ButtonBox className="mb-3 mt-1 control-box">
                                        {workerAddress ?
                                            <div>
                                                <strong><Address>{Web3.utils.toChecksumAddress(workerAddress)}</Address></strong>
                                                <WorkerRunwayDisplay address={workerAddress}/>
                                                <DataRow>
                                                    <strong>Last Committed Period</strong>
                                                    <span><strong><Blue>{stakerData.info.nextCommittedPeriod || stakerData.info.nextCommittedPeriod}</Blue></strong></span>
                                                </DataRow>
                                            </div> : <p> No worker associated with account</p>}
                                    </ButtonBox>

                                    <div className="d-flex justify-content-between">
                                        <Grey className="mb-3">Staker</Grey>
                                    </div>
                                    <ButtonBox className="mb-3 control-box">
                                        <strong><Address>{Web3.utils.toChecksumAddress(account)}</Address></strong>
                                        <DataRow className="mt-1">
                                            <strong>ETH Balance</strong><span>
                                            <EthBalance balance={availableETH} onBalance={setAvailableETH}/></span>
                                        </DataRow>
                                        <DataRow>
                                            <strong>NU Balance <small>(wallet)</small></strong><span><NuBalance
                                            balance={availableNU} onBalance={setAvailableNU}/></span>
                                        </DataRow>
                                        <DataRow>
                                            <strong>Total NU Locked</strong><span><NuBalance
                                            balance={stakerData.lockedNU}/></span>
                                        </DataRow>
                                    </ButtonBox>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Grey>Sub-stakes</Grey>
                                        <PendingButton small
                                                       activeCheck={addingsubstake}
                                                       onClick={handleAddSubstake}
                                                       abort={setAddingSubstake}>
                                            Add Substake
                                        </PendingButton>
                                    </div>
                                    {
                                        stakerData.substakes
                                        ? <SubStakeList substakes={stakerData.substakes} element={ButtonBox}/>
                                        : null
                                    }
                                </Col>
                            </Row>
                        </InputBox> : <InputBox><Spinner/></InputBox>}
                    </Col>
                    <Col xs={12}>
                        <div id="historyLabel" className="flex-row justify-content-lg-center text-center">
                            <h4>History</h4>
                        </div>
                        <HistoryPane theme={props.theme}/>
                    </Col>
                </Row>}
        </Container>
    )
}
