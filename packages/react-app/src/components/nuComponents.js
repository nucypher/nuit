import React from 'react'
import { useState, useEffect, useContext } from 'react';

import { Context } from '@project/react-app/src/utils'

import { Form, Button, Row, Col, Container} from 'react-bootstrap/';

import { Grey, Blue, Input} from '@project/react-app/src/components'


export const NuBalance = (props) => {
    const context = useContext(Context)
    const {provider, account, contracts } = context.wallet

    useEffect(() => {
        if (!props.balance && props.onBalance){
            function handleBalance(nunits) {
                props.onBalance(nunits)
            }
            if (provider && account && contracts){
                contracts.NU.methods.balanceOf(account).call().then(handleBalance)
            }
        }
    }, [ account, provider, contracts, props ])

    return (
        <span>
            {props.balance ? <strong><Blue>{props.balance ? <strong><Blue>{(parseFloat(props.balance) / 10 ** 18).toFixed(2)}</Blue> <Grey>NU</Grey></strong> : ''}</Blue></strong> : ''}
        </span>
    )
}


function NuCLickDisplay (props) {

    return (
        <Button onClick={props.onClick} variant="link">
            <NuBalance balance={props.balance} onBalance={props.onBalance}/>
        </Button>
    )
}

export const NuStakeAllocator = (props) => {

    const context = useContext(Context)
    const {web3} = context.wallet

    const [NUBalance, setNUBalance] = useState(null)
    const [localValue, setLocalValue] = useState(props.value? props.value : '')

    const setValue = (value) => {

        setLocalValue(value)
        try{
            props.onChange(value)
        } catch(err){
            console.error(err)
        }
    }

    const handleNuBalance = (value) => {
        setNUBalance(value)
        if (props.onBalanceUpdate && value){
            props.onBalanceUpdate(web3.utils.fromWei(value.toString(), 'ether'))
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                        <Grey>Stake</Grey>
                        <NuCLickDisplay onClick={(e) => setValue(web3.utils.fromWei(NUBalance.toString(), 'ether'))} balance={NUBalance} onBalance={handleNuBalance}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        as={Input}
                        onChange={(e) => setValue(e.target.value)}
                        isInvalid={props.valid === false }
                        type="text"
                        value={localValue}
                    />
                    <Form.Control.Feedback type="invalid">{props.invalidmessage}</Form.Control.Feedback>
                </Form.Group>
            </Row>
    </Container>
    )
}