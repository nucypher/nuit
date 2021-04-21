import React from 'react'
import { useState, useEffect } from 'react';
import { getDefaultProvider } from '@ethersproject/providers'

import { Form, Button, Tooltip, OverlayTrigger, Row, Col, Container} from 'react-bootstrap/';
import useWeb3Modal from '../hooks/useWeb3Modal'

import { Contract } from '@ethersproject/contracts'
import { addresses, abis } from '@project/contracts'

import { Grey, Blue, Input} from '@project/react-app/src/components'


function NUDisplay (props) {
    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account] = useWeb3Modal()
    const defaultProvider = getDefaultProvider()

    useEffect(() => {
        if (!props.balance){
            function handleBalance(nunits) {
                const NUAmount = (parseFloat(nunits) / 10 ** 18).toFixed(2);
                props.onBalance(NUAmount)
            }
            if (provider && account){
                const NUtoken = new Contract(addresses.NU, abis.erc20, defaultProvider)
                NUtoken.balanceOf(account).then(handleBalance)
            }
        }
    }, [ account ])

    return (
        <Button onClick={props.onClick} variant="link">
            {props.balance ? <strong><Blue>{props.balance}</Blue> <Grey>NU</Grey></strong> : ''}
        </Button>
    )

}

export const NuStakeAllocator = (props) => {

    const [NUBalance, setNUBalance] = useState(null)
    const [localValue, setLocalValue] = useState(props.value? props.value : '')


    const setValue = (value) => {
        props.onChange(value)
        setLocalValue(value)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                        <Grey>Stake</Grey>
                        <NUDisplay onClick={(e) => setValue(NUBalance)} balance={NUBalance} onBalance={setNUBalance}/>
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
                    <Form.Control.Feedback type="invalid">Amount is less than the minimum 15,000 NU.</Form.Control.Feedback>
                </Form.Group>
            </Row>
    </Container>
    )
}