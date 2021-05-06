import React, { useContext, useEffect, useState } from 'react'
import {Badge, Card, Col, Container, Form, Row} from 'react-bootstrap/';
import {InputBox, PrimaryButton, WorkerETHAddressField} from '../../../../components'
import {Link} from 'react-router-dom'
import { Context } from '@project/react-app/src/services'

export default (props) => {

    const context = useContext(Context)

    const { account } = context.wallet

    const [canContinue, setCanContinue] = useState(false)

    useEffect(()=>{
        setCanContinue(account && props.workerAddress)
    }, [account, props.workerAddress])


    return (
        <Container>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={10} sm={7}>
                    <h5 className="d-flex justify-content-center mb-3">Running a Self Hosted Worker</h5>
                    <p>The Worker is the bonded delegate of a Staker and an active network node. Each staking account or
                        “Staker” is bonded to exactly one Worker. Workers must remain online to provide uninterrupted
                        re-encryption services to network users on-demand and perform periodic automated transactions to
                        signal continued commitment to availability.</p>
                    <h4>Worker Cost</h4>
                    <Card className="mt-4 mb-4">
                        <Card.Body>
                            <p>Periodic automated commitments are required to signal continued availability. Currently,
                                Worker nodes must perform one commitment transaction every 7 days each costing ~200k
                                gas. Average cost for last 30 days: </p>
                            <h3><Badge variant="secondary">.1 ETH/mo</Badge></h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={10} sm={7}>
                    <p>Follow one of the many tutorials to assist you in setting up your worker. You will need the
                        wallet address of the Ursula's worker to proceed.</p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={12} className="d-flex justify-content-center mb-5">
                    <h4>Enter Worker Address to Proceed</h4>
                </Col>
                <Col xs={8}>
                    <InputBox>
                        <Form.Group>
                            <span className="collect-worker-label">Worker Address</span>
                            <WorkerETHAddressField
                                value={props.workerAddress}
                                onChange={props.setWorkerAddress}
                            />
                        </Form.Group>
                            {
                                canContinue
                                ? <Link to="/new/set-stake"><PrimaryButton>Continue</PrimaryButton></Link>
                                : ''
                            }
                    </InputBox>
                </Col>
            </Row>
        </Container>
    )
}