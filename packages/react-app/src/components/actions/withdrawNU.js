import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ, DataRow } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/services'
import { calcROI, MIN_STAKE } from '@project/react-app/src/constants'
import { NuBalance } from '../nuComponents';


const NUWithdrawer = (props) => {

    const context = useContext(Context)
    const { web3 } = context.wallet

    const totalAvailable = web3.utils.fromWei(context.stakerData.availableNUWithdrawal.toString(),  'ether')
    const min = 0
    const max = totalAvailable

    return (
        <Slider onChange={e => props.onChange(e)} min={min} max={max} value={props.value}></Slider>
    )
}

export const WithdrawNU = (props) => {

    const context = useContext(Context)
    const { web3, contracts } = context.wallet
    const stakerData = context.stakerData
    const [amount, setAmount] = useState(web3.utils.fromWei(context.stakerData.availableNUWithdrawal.toString()))

    const handleAction = (e) => {

        const withdraw = web3.utils.toWei(String(amount), "ether")

        ContractCaller(
            contracts.STAKINGESCROW.methods.withdraw(
                withdraw,
            ),
            context,
            [`withdrawNU`]
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
                    <strong>Withdrawing:</strong><span><Blue>{amount}</Blue> <Grey>NU</Grey></span>
                </DataRow>
                </Col>
            </Row>



            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!amount} onClick={handleAction} width="100%">Withdraw</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}