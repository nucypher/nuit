import React, {useContext, useEffect, useState} from 'react'

import {Context} from '@project/react-app/src/services'

import {Col, Container, Row} from 'react-bootstrap/';
import {Spinner} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {HistoryPane} from "../components/manage/history";
import RewardsPanel from "../components/manage/rewards";
import StakeSettingsPanel from "../components/manage/settings";
import StakerControlPanel from "../components/manage/staking";

export function Manage(props) {

    const context = useContext(Context)
    const {account} = context.wallet
    
    const [migrating, setMigrating] = useState(false)
    const [stakerData, setStakerData] = useState({})

    useEffect(() => {
        setStakerData(context.stakerData)
        setMigrating(context.pending.indexOf('migrate') > -1)
    }, [account, context.stakerData])

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
            {migrating
                ? <Row><Col className="d-flex justify-content-center"><h3><Spinner/>Please wait for migration to complete. <Spinner/></h3></Col></Row>
                : <Row className="d-flex justify-content-center">
                    
                    { /* Left Side */}
                    <Col xs={12} md={10} xl={4}>
                        {/*<CurrentPeriodPanel/>*/}
                        <RewardsPanel {...stakerData} />
                        <StakeSettingsPanel {...stakerData}/>
                    </Col>

                    {/* Right Side */}
                    <Col xs={12} md={10} xl={6}>
                       <StakerControlPanel {...stakerData}/>
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
