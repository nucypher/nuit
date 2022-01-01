import React, {useContext, useEffect, useState} from 'react'

import {Context} from '@project/react-app/src/services'

import {Col, Container, Row} from 'react-bootstrap/';
import {Spinner, ConnectPLS} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {HistoryPane} from "../components/manage/history";
import RewardsPanel from "../components/manage/rewards";
import StakeSettingsPanel from "../components/manage/settings";
import StakerControlPanel from "../components/manage/staking";
import CurrentPeriodPanel from "../components/manage/period";
import AssetsPanel from "../components/manage/assets";

export function Wrap(props) {

    const context = useContext(Context)
    const {account} = context.wallet

    const [migrating, setMigrating] = useState(false)

    return (

        <Container fluid>
            <Row>
                <Breadcrumbs paths={[
                    {path: '/', label: 'Home', enabled: true},
                    {path: '/wrap', label: 'Wrap', enabled: true},
                ]}/>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Wrap NU/KEEP</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <p>
                        The NU / KEEP Vending Machine smart contracts to convert NU / KEEP to T using a fixed conversion ratio will be available indefinitely.
                        Only liquid NU / KEEP tokens can be wrapped to T.

                        <br/><br/>
                        Locked NU / KEEP <b>cannot</b> be wrapped to T until their stakes unlock. There is no time pressure or
                        disadvantage in waiting to upgrade T.
                    </p>
                </Col>
            </Row>
            {migrating || !account
                ? <Row> {migrating ?
                    <Col className="d-flex justify-content-center"><h3><Spinner/>Please wait for migration to complete. <Spinner/></h3></Col> :
                    <Col className="d-flex justify-content-center"><ConnectPLS/></Col>}
                </Row>
                : <Row className="d-flex justify-content-center">

                    { /* Left Side */}
                    <Col xs={12} md={10}>
                        <AssetsPanel/>
                    </Col>

                    {/* Right Side */}
                    <Col xs={12} md={10} xl={6}>
                       {/* <StakerControlPanel {...stakerData}/> */}
                    </Col>

                    {/* Below */}
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
