import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { ButtonBox, PrimaryButton, WorkerRunwayDisplay, DataRow, Grey, NuBalance } from '@project/react-app/src/components'

import { Context } from '@project/react-app/src/utils'

export const BondWorker = (props) => {

    const context = useContext(Context)
    const { account } = context.wallet
    const stakerData = context.stakerData

    return(
        <Container>
            <Row >
                <Col>
                    <div className="d-flex justify-content-between">
                    <Grey>Worker</Grey>
                    </div>
                    <ButtonBox className="mb-3 mt-1">
                        <strong>{props.workerAddress}</strong>
                        <WorkerRunwayDisplay address={props.workerAddress}/>
                    </ButtonBox>

                    <div className="d-flex justify-content-between">
                        <Grey className="mb-3">Staker</Grey>
                    </div>
                    <ButtonBox className="mb-3">
                        <strong>{account}</strong>
                        <DataRow className="mt-3">
                        <strong>Staking Balance</strong><span><NuBalance balance={stakerData.lockedNU}/></span>
                        </DataRow>
                    </ButtonBox>

                    <PrimaryButton className="mt-3">Bond</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}