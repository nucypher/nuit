import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PendingButton, Slider, Grey, Blue, DataRow, CircleQ, Period } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/services'
import {  MIN_STAKE, daysPerPeriod, getCurrentPeriod } from '@project/react-app/src/constants'


const StakeDivider = (props) => {

    const context = useContext(Context)
    const { web3 } = context.wallet

    const totalAvailable = web3.utils.fromWei(props.stake.lockedValue.toString(),  'ether')
    const min = (MIN_STAKE/totalAvailable) * totalAvailable
    const max = (totalAvailable - min)


    return (
        <Slider onChange={e => props.onChange(e)} min={min} max={max} value={props.value}></Slider>
    )
}

export const DivideStake = (props) => {

    const context = useContext(Context)
    const { web3, contracts } = context.wallet

    const substake = props.substake
    const totalOriginalValue = web3.utils.fromWei(substake.lockedValue.toString(),  'ether')


    const [newNU, setNewNU] = useState(15000)
    const [duration, setDuration] = useState(daysPerPeriod)
    const [originalUnlockDate] = useState(getCurrentPeriod() + parseInt(substake.unlockingDuration) + 1)
    const [newUnlockDate, setNewUnlockDate] = useState(originalUnlockDate + 1)

    const [roi, setRoi] = useState({apr: 0, net: 0})
    const [AllocationValid, setAllocationValid] = useState(true)

    const onChangeDivider = (value) => {
        setNewNU(value)
    }

    const onDurationChanged = (duration) => {
        setDuration(duration)
        setNewUnlockDate(originalUnlockDate + parseInt(duration)/daysPerPeriod)
    }


    const handleAction = (e) => {

        const amount = web3.utils.toWei(String(newNU), "ether")

        const extensionLength = (newUnlockDate - originalUnlockDate)
        const hex = web3.utils.numberToHex(extensionLength)

        ContractCaller(
            contracts.STAKINGESCROW.methods.divideStake(
                substake.index,
                amount,
                hex),
            context,
            [`substakeupdate${substake.id}`],
            `Divide stake #${substake.index}`
        )

        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }
    }

    return(
        <Container>
            <Row>
                <Col className="d-flex ">
                    <p>Slice some of a stake off into a new stake.  The new stake must be extended by at least one period beyond the end date of the original. </p>
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 ml-3">
                    <div className="d-flex justify-content-between">
                        <Grey>Divide Stake</Grey>
                    </div>
                    <StakeDivider value={newNU} onChange={onChangeDivider} stake={substake} />
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 ml-3">
                    <div className="d-flex justify-content-between">
                        <Grey>Additional Duration</Grey>
                        <strong><Blue>{duration}</Blue> <Grey>Days</Grey></strong>
                    </div>
                    <Slider step={daysPerPeriod} min={daysPerPeriod} max={364} value={duration} onChange={onDurationChanged} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataRow>
                        <strong>Original Stake Value</strong>
                        <strong>New Stake Value</strong>
                    </DataRow>
                    <DataRow>
                        <span><strong><Blue>{totalOriginalValue - newNU}</Blue></strong></span>
                        <span><strong><Blue>{newNU}</Blue></strong></span>
                    </DataRow>
                    <DataRow>
                        <strong>Unlock Date <small><CircleQ>Unlock date only applies if "wind down" is turned on (you can toggle that at /manage).</CircleQ></small></strong>
                        <strong>New Stake Unlock Date</strong>
                    </DataRow>
                    <DataRow>
                        <span><strong><Blue><Period>{originalUnlockDate}</Period></Blue></strong></span>
                        <span><strong><Blue><Period>{newUnlockDate}</Period></Blue></strong></span>
                    </DataRow>
                </Col>
            </Row>

            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!AllocationValid} onClick={handleAction} width="100%">Divide Stake</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}