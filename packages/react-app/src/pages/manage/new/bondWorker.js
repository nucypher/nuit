import React from 'react'
import { useState, useEffect, useContext } from 'react';

import { Context } from '@project/react-app/src/utils'

import { Container, Row, Col } from 'react-bootstrap/';
import { InputBox, BondWorker } from '@project/react-app/src/components'


export default (props) => {

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Bond Worker</h1>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={12} >
                    <InputBox className="mt-3">
                        <BondWorker workerAddress={props.workerAddress}></BondWorker>
                    </InputBox>
                </Col>
            </Row>
        </Container>
    )
}