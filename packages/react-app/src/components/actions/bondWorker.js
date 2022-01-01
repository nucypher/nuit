import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Form} from 'react-bootstrap/';
import { ButtonBox, InputBox, PrimaryButton, PendingButton, WorkerETHAddressField, WorkerRunwayDisplay, DataRow, Grey, TokenBalance, Address } from '@project/react-app/src/components'

import { Context, ContractCaller, truncateAddress } from '@project/react-app/src/services'

export const BondWorker = (props) => {

    const [workerAddress, setWorkerAddress] = useState(props.workerAddress)
    const [bondingworker, setBondingWorker]  = useState(false)

    const context = useContext(Context)
    const { account, contracts, web3 } = context.wallet
    const stakerData = context.stakerData

    const HandleBondWorker = () => {
        const address = web3.utils.toChecksumAddress(workerAddress)
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(contracts.STAKINGESCROW.methods.bondWorker(address), context, 'bondworker', `Bonding worker ${truncateAddress(workerAddress)}`)
    }

    useEffect(() => {
        setBondingWorker(context.pending.indexOf('bondworker') > -1)
    })

    return(
        <Container>
            {workerAddress ?
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                    <Grey>Worker</Grey>
                    </div>
                    <ButtonBox className="mb-3 mt-1">
                        <small><strong><Address>{workerAddress}</Address></strong></small>
                        <WorkerRunwayDisplay address={workerAddress}/>
                    </ButtonBox>

                    <div className="d-flex justify-content-between">
                        <Grey className="mb-3">Staker</Grey>
                    </div>
                    <ButtonBox className="mb-3">
                        <small><strong>{account}</strong></small>
                        <DataRow className="mt-3">
                        <strong>Staking Balance</strong><span><TokenBalance balance={stakerData.lockedNU}/></span>
                        </DataRow>
                    </ButtonBox>

                    <PendingButton activeCheck={bondingworker} abort={setBondingWorker} onClick={HandleBondWorker}>Bond Worker</PendingButton>
                </Col>
            </Row> :
            <Row>
                <Col xs={12} className="d-flex justify-content-around">

                        <Form.Group className="w100">
                            <WorkerETHAddressField
                                label="Worker Address"
                                value={workerAddress}
                                onChange={setWorkerAddress}
                                description="The wallet address of a configured Ursula worker node."
                            />
                        </Form.Group>

                </Col>
            </Row>
            }

        </Container>
    )
}