import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/services'

export const Restake = (props) => {

    const context = useContext(Context)
    const { contracts } = context.wallet
    const stakerData = context.stakerData

    const handleAction = (value) => {
        props.setShow(false)
        ContractCaller(contracts.STAKINGESCROW.methods.setReStake(value), context, 'restake')
    }

    return(
        <Container>
            <Row>
                <Col>
                <p>
                    As your Ursula performs work, all rewards are automatically added to your existing stake to optimize earnings. This feature, called re-staking, is enabled by default.
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PrimaryButton onClick={e => handleAction(!stakerData.flags.reStake)}>Set Restaking to: {stakerData.flags.reStake ? 'OFF': 'ON'}</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}