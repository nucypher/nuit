import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { Grey, Blue, InputBox, ButtonBox, PrimaryButton, CircleQ, WorkerRunwayDisplay, DataRow, SecondaryButton } from '@project/react-app/src/components'
import useWeb3Modal from '../hooks/useWeb3Modal'

export function Manage() {

    const [availableNU, setavailableNU] = useState(0);
    const [availableETH, setavailableETH] = useState(0);

    const [workerAddress, setWorkerAddress] = useState(null);
    const [stakerAddress, setStakerAddress] = useState(null);

    const [stakeList, setStakeList] = useState([]);

    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account] = useWeb3Modal()

    useEffect(() => {

    })


    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Manage Staked Nu</h1>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={12} >
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
                                <PrimaryButton className="mt-2" width="100">Withdraw {availableNU} <Grey>NU</Grey></PrimaryButton>
                                </Col>

                                <Col>
                                <strong>Policy</strong>
                                <CircleQ tooltip="ETH rewards collected from policy fees"/>
                                <PrimaryButton className="mt-2" width="100">Withdraw {availableETH} <Grey>ETH</Grey></PrimaryButton>
                                </Col>
                            </Col>
                        </Row>
                    </InputBox>

                    <InputBox className="mt-5">
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Running</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Grey>Worker</Grey>
                               <ButtonBox className="mb-5">
                                   <strong>{workerAddress || account}</strong>
                                   <WorkerRunwayDisplay address={workerAddress || account}/>
                                   <DataRow>
                                       <strong>Last Committed Period</strong><span><Blue>2762</Blue></span>
                                    </DataRow>
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey>Staker</Grey>
                                <PrimaryButton small className="mb-3">Add Substake</PrimaryButton>
                               </div>
                               <ButtonBox>
                                   <strong>{stakerAddress || account}</strong>
                                   <DataRow className="mt-3">
                                       <strong>ETH balance</strong><span><Blue>10</Blue> <Grey>ETH</Grey></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>NU balance</strong><span><Blue>10</Blue> <Grey>NU</Grey></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>Total NU Locked</strong><span><Blue>100</Blue> <Grey>NU</Grey></span>
                                    </DataRow>
                                    <DataRow>
                                        <span></span><PrimaryButton className="mt-1" small>Increase</PrimaryButton>
                                    </DataRow>
                               </ButtonBox>
                            </Col>
                        </Row>
                    </InputBox>
                    <InputBox className="mt-5">
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Settings</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-flex justify-content-around">
                                <Col>
                                <strong>Re-Stake</strong>
                                <CircleQ tooltip="Compound your stake by adding rewards back into it each period."/>
                                <PrimaryButton className="mt-2" width="100">On</PrimaryButton>
                                </Col>

                                <Col>
                                <strong>Wind Down</strong>
                                <CircleQ tooltip="Each period commited will reduce stake length."/>
                                <SecondaryButton className="mt-2" width="100">Off</SecondaryButton>
                                </Col>
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
            </Row>
        </Container>
    )
}