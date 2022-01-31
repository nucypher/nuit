import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/services'

export const StakeNU = (props) => {

    const context = useContext(Context)
    const { account, contracts } = context.wallet

    const [stakingNU, setStakingNU] = useState(false)

    const handleAction = () => {
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(contracts.TOKENSTAKING.methods.stakeNu(account, account, account), context, 'stakingNU', `Stake NU on Threshold`)
    }

    useEffect(() => {
        setStakingNU(context.pending.indexOf('stakingNU') > -1)
    })

    return(
        <Container>
            <Row>
                <Col>
                <p className="preformatted">
                    As your Ursula performs work, all rewards are automatically added to your existing stake to optimize earnings. This feature, called re-staking, is enabled by default.
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PrimaryButton onClick={e => handleAction()}>Stake {context.stakedNU.get} NU on Threshold</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}