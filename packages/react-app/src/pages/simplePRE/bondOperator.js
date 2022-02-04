import React from 'react'

import { Container, Row, Col } from 'react-bootstrap/';
import { InputBox, BondOperator } from '@project/react-app/src/components'


export default (props) => {

    return (
        <InputBox fluid>
            <Row>
                <Col>
                    <h4 >Bond Operator</h4>
                    <small><a target="nucypher" href="https://docs.nucypher.com/en/latest/staking/running_a_worker.html">click for documentation on running a node</a></small>
                    <p>If you have configured an Ursula node using Nucypher's software and would like to collect staking rewards, enter your node's operator address here. </p>

                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={12} md={8} >
                    <BondOperator operatorAddress={props.operatorAddress}></BondOperator>
                </Col>
            </Row>
        </InputBox>
    )
}