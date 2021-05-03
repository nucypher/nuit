import React from 'react'
import {Col, Container, Row} from 'react-bootstrap/';
import {Blue, ButtonGroup, PrimaryButton, PurpleButton, SecondaryButton} from '../components'

import {Link} from 'react-router-dom'
import StakerGraph from "../components/chart";
import NetworkStats from "../components/stats";


export function Home () {
    return (
        <Container className="NC_home">
            <Row className="pb-4">
                <Col className="d-flex justify-content-center" xs={12} >
                <h1><Blue>Nu</Blue>Cypher Staking</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NetworkStats />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col className="d-flex justify-content-center pb-5">
                    <div id="chart-container">
                        <StakerGraph />
                    </div>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3">
                <Col xs={8} >
                <p className="text-center">
                    The <strong><Blue>Nu</Blue>Cypher</strong> network is a decentralized network of nodes<br/>
                    that perform threshold cryptography operations serving users with<br/>
                    secrets management and dynamic access control.
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row xs={1} md={3} className="d-flex justify-content-centered">
                        <Col className="d-flex justify-content-center">
                            <Link to="/new/worker"><PrimaryButton><strong>Stake Your NU</strong></PrimaryButton></Link>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Link to="/manage"><PurpleButton><strong>Manage</strong></PurpleButton></Link>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <a href="https://docs.nucypher.com/en/latest/staking/overview.html"><SecondaryButton><strong>Documentation</strong></SecondaryButton></a>
                        </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}
