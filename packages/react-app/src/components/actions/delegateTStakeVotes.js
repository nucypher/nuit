import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card} from 'react-bootstrap/';
import { ButtonBox, Blue, PendingButton, WorkerETHAddressField, WorkerRunwayDisplay, DataRow, Grey, TokenBalance, Address } from '@project/react-app/src/components'

import { Context, ContractCaller, truncateAddress } from '@project/react-app/src/services'

export const DelegateVotes = (props) => {

    const [delegateeAddress, setDelegateeAddress] = useState(props.delegateeAddress)
    const [delegatingvotes, setDelegatingVotes]  = useState(false)

    const context = useContext(Context)
    const { account, contracts, web3 } = context.wallet

    const pendingKey = `delegatevotes-${props.index}`

    const HandleDelegateVotes = () => {
        const address = web3.utils.toChecksumAddress(delegateeAddress)
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(contracts.TOKENSTAKING.methods.delegateVoting(props.stakingprovider, address), context, pendingKey, `Delegating votes ${truncateAddress(delegateeAddress)}`)
    }

    useEffect(() => {
        setDelegatingVotes(context.pending.indexOf(pendingKey) > -1)
    })

    return(
        <Card className="delegate-votes">
            {delegateeAddress ?
            <Row>
                <Col>
                xxxx
                    <div className="d-flex justify-content-between">
                    <Grey>Delegatee</Grey>{delegateeAddress && <Blue onClick={e => setDelegateeAddress(null)} className="hover"><small>clear</small></Blue>}
                    </div>
                    <ButtonBox className="mb-3 mt-1">
                        <small><strong><Address>{delegateeAddress}</Address></strong></small>
                        <WorkerRunwayDisplay address={delegateeAddress}/>
                    </ButtonBox>

                    <PendingButton activeCheck={delegatingvotes} abort={setDelegatingVotes} onClick={HandleDelegateVotes}>Delegate</PendingButton>
                </Col>
            </Row> :
            <Row>
                <Col xs={12} className="d-flex justify-content-around">

                        <Form.Group className="w100">
                            <WorkerETHAddressField
                                label="Delagatee Address"
                                value={delegateeAddress}
                                onChange={setDelegateeAddress}
                                description="The address to which you'd like to delegate your voting power."
                            />
                        </Form.Group>

                </Col>
            </Row>
            }

        </Card>
    )
}