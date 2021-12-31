import React from 'react'
import {Col, Container, Row} from 'react-bootstrap/';
import {Blue, PrimaryButton, PurpleButton, SecondaryButton} from '../components'

import {Link} from 'react-router-dom'
import StakerGraph from "../components/chart";
import NetworkStats from "../components/stats";


export function Home() {
    return (
        <Container fluid className="NC_home">
            <Row className="pb-4">
                <Col className="d-flex justify-content-center" xs={12}>
                    <h1><Blue>Nu</Blue>Cypher Staking</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p id="primer">
                        Stake information is temporarily not displayable on the dashboard during the transition to Threshold.
                        Existing NU and KEEP stakers will be grandfathered into Threshold via special staking adapters.
                        It is not necessary to keep your worker node up until until the instructions for Threshold staking are shared.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NetworkStats/>
                </Col>
            </Row>
            <br/>
            {/*    <Row>*/}
                        {/* <div id="chart-container">
                            <StakerGraph/>
                        </div> */}
                {/*</Row>*/}
            <Row className="d-flex justify-content-center mt-3 mb-3">
                <Col xs={8}>
                    <p className="text-center">
                        The <strong><Blue>Nu</Blue>Cypher</strong> network is a decentralized network of nodes<br/>
                        that perform threshold cryptography operations serving users with<br/>
                        secrets management and dynamic access control.
                    </p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                {/* <Col xs={8} md={4} lg={3} className="d-flex justify-content-center">
                    <Link className="mb-3 w100" to="/new/worker"><PrimaryButton><strong>Stake Your
                        NU</strong></PrimaryButton></Link>
                </Col> */}
                <Col xs={8} md={4} lg={3} className="d-flex justify-content-center">
                    <Link className="mb-3 w100" to="/wrap"><PurpleButton><strong>Wrap NU/KEEP</strong></PurpleButton></Link>
                </Col>
                <Col xs={8} md={4} lg={3} className="d-flex justify-content-center">
                    <a className="mb-3 w100"
                       href="https://docs.nucypher.com/en/latest/staking/overview.html"><SecondaryButton><strong>PRE Documentation</strong></SecondaryButton></a>
                </Col>

            </Row>
        </Container>
    )
}
