import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/services'

export const Migrate = (props) => {

    const context = useContext(Context)
    const { account, contracts } = context.wallet

    const doMigrate = () => {
        props.setShow(false)
        ContractCaller(contracts.STAKINGESCROW.methods.migrate(account), context, 'migrate')
    }

    return(
        <Container>
            <Row>
                <Col>
                    <PrimaryButton onClick={doMigrate}>Migrate Staker</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}