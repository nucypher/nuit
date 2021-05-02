import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/services'

export const Winddown = (props) => {

    const context = useContext(Context)
    const { contracts } = context.wallet
    const stakerData = context.stakerData

    const handleAction = async (value) => {
        props.setShow(false)
        ContractCaller(contracts.STAKINGESCROW.methods.setWindDown(value), context, 'winddown')
    }

    return(
        <Container>
            <Row>
                <Col>
                <p>
                    The proportion of staking rewards received by a staker depends on the stake size and the remaining locked duration.
                    When wind down is enabled, the locked duration decreases after each period which results in reduced staking yield. When disabled, the stake’s locked duration remains constant and improves staking yield. See <a href="https://docs.nucypher.com/en/latest/architecture/sub_stakes.html#sub-stake-winddown">Winding down</a> for more information.
                    Wind down is <strong>disabled</strong> by default.
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PrimaryButton onClick={e => handleAction(!stakerData.flags.windDown)}>Set Winddown to: {stakerData.flags.windDown ? 'OFF': 'ON'}</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}