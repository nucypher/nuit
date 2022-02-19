import React from 'react'
import moment from 'moment'
import { useState, useEffect, useContext } from 'react';

import { Context } from '@project/react-app/src/services'


import { Form, Button, Row, Col, Container, Tooltip, OverlayTrigger} from 'react-bootstrap/';

import { Grey, Blue, Input, DateSpan, DisplayWei} from '@project/react-app/src/components'
import { millisecondsPerPeriod } from '@project/react-app/src/constants'



export const TokenBalance = (props) => {
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
        <span className="pl-1 pr-1">
            {props.balance ?
            <OverlayTrigger overlay={<Tooltip>Exactly <DisplayWei>{props.balance}</DisplayWei></Tooltip>}>
                <strong><Blue className="mr-1"><DisplayWei fixed={0}>{props.balance}</DisplayWei></Blue> <Grey>{props.label||"NU"}</Grey></strong>
            </OverlayTrigger>: ''}
        </span>
    )
}



function NuCLickDisplay (props) {

    return (
        <Button onClick={props.onClick} variant="link">
            <TokenBalance label={props.label} balance={props.balance} onBalance={props.onBalance}/>
        </Button>
    )
}

export const StakeAllocator = (props) => {

    const context = useContext(Context)
    const {web3} = context.wallet

    const [NUBalance, setNUBalance] = useState(props.initial || null)
    const [localValue, setLocalValue] = useState(props.value ? props.value : '')

    const setValue = (value) => {
        setLocalValue(value)
        try{
            // allow numbers, "-"" and "."
            // don't allow ".."
            props.onChange(web3.utils.toWei(value.replace(/[^0-9.]/g, '').replace(/\.{2,}/g, '.'),  'ether'))
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

    useEffect(()=>{
        const value = props.value || props.initial
        setLocalValue(web3.utils.fromWei(value.toString(), 'ether'))
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                        <Grey>{props.label || "Stake"}</Grey>
                        <NuCLickDisplay label={props.denomination || "NU"} onClick={(e) => setValue(web3.utils.fromWei(NUBalance.toString(), 'ether'))} balance={NUBalance} onBalance={handleNuBalance}/>
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

export const Period = (props) => {

    const context = useContext(Context)

    const display = (data) => {
        if (parseInt(data) === 1){
            return '----'
        }
        return context.periodsAsDate ? moment(parseInt(data) * millisecondsPerPeriod).format("YYYY-MM-DD") : "#"+data
    }

    const toggleFormat = () => {
        context.setPeriodsAsDate(!context.periodsAsDate)
    }

    return <DateSpan onClick={toggleFormat}>{display(props.children)}</DateSpan>

}