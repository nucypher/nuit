import React from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton, SecondaryButton, PurpleButton, Blue, Purple, Grey, HR } from '../components'

import {
    Link
  } from 'react-router-dom'
import StakerGraph from "../components/chart";


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
                    <Row xs={1} md={3} className="d-flex justify-content-centered">
                        <Col className="d-flex justify-content-center">
                            <div>
                                <HR color="blue"></HR>
                               <h5><strong>Total NU Staked</strong></h5>
                               <h2><strong><Blue>610,123,133</Blue></strong></h2>
                            </div>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <div>
                                <HR color="purple"></HR>
                               <h5><strong>Circulating Supply</strong></h5>
                               <h2><strong><Purple>610,123,133</Purple></strong></h2>
                            </div>
                        </Col>
                        <Col className="d-flex justify-content-center">
                           <div>
                                <HR color="grey75"></HR>
                               <h5><strong>Active Stakers</strong></h5>
                               <h2><strong><Grey>691</Grey></strong></h2>
                           </div>
                        </Col>
                </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col className="d-flex justify-content-center pb-5">
                <StakerGraph />
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
