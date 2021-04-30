import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form} from 'react-bootstrap/';
import { ButtonBox, InputBox, PrimaryButton, WorkerETHAddressField, WorkerRunwayDisplay, DataRow, Grey, NuBalance } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/utils'

export const BondWorker = (props) => {

    const [workerAddress, setWorkerAddress] = useState(props.workerAddress)

    const context = useContext(Context)
    const { account, contracts, web3 } = context.wallet
    const stakerData = context.stakerData

    const HandleBondWorker = () => {
        const address = web3.utils.toChecksumAddress(workerAddress)
        props.setShow(false)
        ContractCaller(contracts.STAKINGESCROW.methods.bondWorker(address), context, 'bondworker')
    }

    return(
        <Container>
            {workerAddress ?
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                    <Grey>Worker</Grey>
                    </div>
                    <ButtonBox className="mb-3 mt-1">
                        <small><strong>{workerAddress}</strong></small>
                        <WorkerRunwayDisplay address={workerAddress}/>
                    </ButtonBox>

                    <div className="d-flex justify-content-between">
                        <Grey className="mb-3">Staker</Grey>
                    </div>
                    <ButtonBox className="mb-3">
                        <small><strong>{account}</strong></small>
                        <DataRow className="mt-3">
                        <strong>Staking Balance</strong><span><NuBalance balance={stakerData.lockedNU}/></span>
                        </DataRow>
                    </ButtonBox>

                    <PrimaryButton onClick={HandleBondWorker}>Bond Worker</PrimaryButton>
                </Col>
            </Row> :
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <InputBox>
                        <Form.Group>
                            <WorkerETHAddressField
                                label="Worker Address"
                                value={workerAddress}
                                onChange={setWorkerAddress}
                                description="The wallet address of a configured Ursula worker node."
                            />
                        </Form.Group>
                    </InputBox>
                </Col>
            </Row>
            }

        </Container>
    )
}