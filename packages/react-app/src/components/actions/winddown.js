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
                <p className="preformatted">
                    Wind Down ("Auto-Extend")<br/><br/>

                    <ul>
                        <li>When wind down is <i>enabled</i>, the locked duration decreases after each period and reduces staking yield.</li><br/>
                        <li>When wind down is <i>disabled</i>, the stake’s locked duration remains constant and improves staking yield.</li>
                    </ul>

                    See <a href="https://docs.nucypher.com/en/latest/architecture/sub_stakes.html#sub-stake-winddown">winding down</a> for more information.
                    wind down is <strong>disabled</strong> by default.
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PrimaryButton onClick={e => handleAction(!stakerData.flags.windDown)}>Set Wind down to: {stakerData.flags.windDown ? 'OFF': 'ON'}</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}