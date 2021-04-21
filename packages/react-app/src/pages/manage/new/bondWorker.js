import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { Grey, Blue, InputBox, ButtonBox, PrimaryButton, CircleQ, WorkerRunwayDisplay, DataRow, SecondaryButton } from '@project/react-app/src/components'
import useWeb3Modal from '@project/react-app/src/hooks/useWeb3Modal'


export default (props) => {

    const [stakerAddress, setStakerAddress] = useState(null);
    const [workerAddress, setWorkerAddress] = useState(props.workerAddress || null)
    const [stakingBalance, setStakingBalance] = useState(0)

    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account] = useWeb3Modal()


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
                        <Row >
                            <Col>
                                <div className="d-flex justify-content-between">
                                <Grey>Worker</Grey>
                                </div>
                               <ButtonBox className="mb-3 mt-1">
                                   <strong>{workerAddress}</strong>
                                   <WorkerRunwayDisplay address={workerAddress}/>
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3">
                                    <strong>{stakerAddress || account}</strong>
                                    <DataRow>
                                    <strong>Staking Balance</strong><span><Blue>{48000 + 96000}</Blue> <Grey>NU</Grey></span>
                                    </DataRow>
                                </ButtonBox>

                                <PrimaryButton className="mt-3">Bond</PrimaryButton>
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
            </Row>
        </Container>
    )
}