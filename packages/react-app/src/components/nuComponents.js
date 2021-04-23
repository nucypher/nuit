import React from 'react'
import { useState, useEffect } from 'react';
import { getDefaultProvider } from '@ethersproject/providers'

import { Form, Button, Tooltip, OverlayTrigger, Row, Col, Container} from 'react-bootstrap/';
import useWeb3Modal from '../hooks/useWeb3Modal'

import { Contract } from '@ethersproject/contracts'
import { addresses, abis } from '@project/contracts'

import { Grey, Blue, Input} from '@project/react-app/src/components'


export const NuBalance = (props) => {
    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, Web3, contracts]= useWeb3Modal()

    useEffect(() => {
        if (!props.balance){
            function handleBalance(nunits) {
                const NUAmount = (parseFloat(nunits) / 10 ** 18).toFixed(2);
                props.onBalance(NUAmount)
            }
            if (provider && account){
                const defaultProvider = getDefaultProvider(parseInt(provider.chainId))
                const NUtoken = new Contract(addresses[provider.chainId].NU, abis[provider.chainId].NU, defaultProvider)
                NUtoken.balanceOf(account).then(handleBalance)
            }
        }
    }, [ account ])

    return (
        <div>
            {props.balance ? <strong><Blue>{props.balance}</Blue> <Grey>NU</Grey></strong> : ''}
        </div>
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
                        <NuCLickDisplay onClick={(e) => setValue(NUBalance)} balance={NUBalance} onBalance={setNUBalance}/>
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