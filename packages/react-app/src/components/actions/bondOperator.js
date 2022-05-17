import React, { useContext, useState, useEffect } from 'react'
import { Card, Row, Col, Form} from 'react-bootstrap/';
import { ButtonBox, Blue, PendingButton, WorkerETHAddressField, WorkerRunwayDisplay, DataRow, Grey, TokenBalance, Address } from '@project/react-app/src/components'

import { Context, ContractCaller, truncateAddress } from '@project/react-app/src/services'

export const BondOperator = (props) => {

    const [operatorAddress, setOperatorAddress] = useState(props.operatorAddress)
    const [bondingoperator, setBondingOperator]  = useState(false)

    const pendingKey = `bondoperator-${props.index}`

    const context = useContext(Context)
    const { account, contracts, web3 } = context.wallet

    const HandleBondOperator = () => {
        const address = web3.utils.toChecksumAddress(operatorAddress)
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(contracts.SIMPLEPREAPPLICATION.methods.bondOperator(props.provider, address), context, pendingKey, `Bonding operator ${truncateAddress(operatorAddress)}`)
    }

    useEffect(() => {
        setBondingOperator(context.pending.indexOf(pendingKey) > -1)
    })

    return(
        <Card className="stake-action">
            {operatorAddress ?
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                    <Grey>Operator</Grey>{operatorAddress && <Blue onClick={e => setOperatorAddress(null)} className="hover"><small>clear</small></Blue>}
                    </div>
                    <ButtonBox className="mb-3 mt-1">
                        <small><strong><Address>{operatorAddress}</Address></strong></small>
                        <WorkerRunwayDisplay address={operatorAddress}/>
                    </ButtonBox>

                    <PendingButton activeCheck={bondingoperator} abort={setBondingOperator} onClick={HandleBondOperator}>Bond Operator</PendingButton>
                </Col>
            </Row> :
            <Row>
                <Col xs={12} className="d-flex justify-content-around">

                        <Form.Group className="w100">
                            <WorkerETHAddressField
                                label="Operator Address"
                                value={operatorAddress}
                                onChange={setOperatorAddress}
                                description="The operator address of a configured NuCypher Ursula node."
                            />
                        </Form.Group>

                </Col>
            </Row>
            }

        </Card>
    )
}