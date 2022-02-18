import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, PendingButton, Slider, Grey, Blue, StakeAllocator, CircleQ, DataRow } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/services'
import { calcROI, MIN_STAKE } from '@project/react-app/src/constants'
import { TokenBalance } from '../nuComponents';


const NUWithdrawer = (props) => {

    const context = useContext(Context)
    const { web3 } = context.wallet

    const stakerBalance = context.canWithdraw.toString()
    const totalAvailable = web3.utils.fromWei(stakerBalance,  'ether')

    const min = 0
    const max = totalAvailable

    const handleClick  = (e) => {
        props.onChange(totalAvailable)
    }

    return (
        <div>
            <div onClick={handleClick} className="w100 d-flex justify-content-end">
                <TokenBalance balance={stakerBalance}></TokenBalance>
            </div>
            <Slider onChange={e => props.onChange(e)} min={min} max={max} value={props.value}></Slider>
        </div>
    )
}

export const WithdrawNU = (props) => {

    const context = useContext(Context)
    const { web3, contracts } = context.wallet
    const stakerData = context.stakerData
    const maxAmount = web3.utils.fromWei(context.canWithdraw.toString())
    const [amount, setAmount] = useState(maxAmount)

    const handleAction = (e) => {

        const withdraw = web3.utils.toWei(String(amount), "ether").toString()
        console.log(withdraw)
        ContractCaller(
            contracts.STAKINGESCROW.methods.withdraw(
                withdraw,
            ),
            context,
            [`withdrawNU`],
            `withdraw ${amount} NU`
        )

        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <p>How much. </p>
                    <NUWithdrawer onChange={e => setAmount(e)} value={amount}/>
                </Col>
            </Row>
            <Row>
                <Col>
                <DataRow>
                    <strong>Withdrawing:</strong><span><Blue><TypeOver  onChange={e => setAmount(e)}>{amount}</TypeOver></Blue> <Grey>NU</Grey></span>
                </DataRow>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-5">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!amount} onClick={handleAction} width="100%">Withdraw</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}