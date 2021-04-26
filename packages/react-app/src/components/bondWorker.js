import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form} from 'react-bootstrap/';
import { ButtonBox, InputBox, PrimaryButton, WorkerETHAddressField, WorkerRunwayDisplay, DataRow, Grey, NuBalance } from '@project/react-app/src/components'

import { Context } from '@project/react-app/src/utils'

export const BondWorker = (props) => {

    const [workerAddress, setWorkerAddress] = useState(props.workerAddress)

    const context = useContext(Context)
    const { account, contracts, web3 } = context.wallet
    const stakerData = context.stakerData
    const setStakerUpdated = context.setStakerUpdated


    const HandleBondWorker = async () => {

        const address = web3.utils.toChecksumAddress(workerAddress)

        await contracts.STAKINGESCROW.methods.bondWorker(address).send({
            from: web3.utils.toChecksumAddress(account)
        });


        setStakerUpdated(true)
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
                        <strong>{workerAddress}</strong>
                        <WorkerRunwayDisplay address={workerAddress}/>
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

                    <PrimaryButton onClick={HandleBondWorker} className="mt-3">Bond</PrimaryButton>
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