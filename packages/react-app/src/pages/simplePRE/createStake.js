import React, { useContext } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap/';

import { Context } from '@project/react-app/src/services'

import { InputBox, PrimaryButton, CreateStake } from '@project/react-app/src/components'
import { Link } from 'react-router-dom'


export default (props) => {

    const context = useContext(Context)
    const stakerData = context.stakerData

    return (
        <div>
            <Row className="d-flex justify-content-center">
                <Col xs={8}>
                    <InputBox>
                        <Form>
                            <CreateStake {...props} />
                        </Form>
                    </InputBox>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs={4} className="d-flex justify-content-center biglink mt-3">
                    {context.StakeInfo.get ? <Link to="/manage/bond"><PrimaryButton>Bond Operator</PrimaryButton></Link> : ''}
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5">
                <Col xs={12} md={8}>
                    <h4 className="d-flex justify-content-center mb-4">
                        What you need to know?
                    </h4>
                    <p>
                    This operation will deposit T into NuCypher's <i>StakingEscrow</i> smart contract, and lock it
                    for the specified duration. Once T is staked in the smart contract, a bonded Operator must be
                    run to unlock it. The associated Operator must make periodic automated commitments (every 7 days)
                    which cost at least ~200k gas units, depending on how many sub-stakes you have. If you are running a
                    self-hosted Operator, be sure to consider this operational cost when creating a stake.
                    </p>
                </Col>
            </Row>
        </div>
    )
}