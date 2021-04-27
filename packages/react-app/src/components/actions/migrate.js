import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form} from 'react-bootstrap/';
import { PrimaryButton, Spinner } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/utils'

export const Migrate = () => {

    const context = useContext(Context)
    const { account, contracts, web3 } = context.wallet
    const stakerData = context.stakerData

    const [active, setActive] = useState(false)

    const doMigrate = () => {
        setActive(true)
        ContractCaller(contracts.STAKINGESCROW.methods.migrate(account), context).then(
            setActive(false)
        )

    }

    return(
        <Container>
            <Row>
                <Col>
                    <PrimaryButton onClick={doMigrate}>Migrate Staker {active ? <Spinner/> : null}</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}