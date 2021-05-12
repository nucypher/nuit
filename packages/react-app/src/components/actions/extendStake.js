import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ, DataRow, Period } from '@project/react-app/src/components'

import { daysPerPeriod, getCurrentPeriod } from '@project/react-app/src/constants'
import { daysToPeriods, periodsToDays } from '@project/react-app/src/services'

import { Context, ContractCaller } from '@project/react-app/src/services'
import { calcROI, MIN_STAKE } from '@project/react-app/src/constants'



export const ExtendStake = (props) => {

    const context = useContext(Context)
    const { web3, contracts } = context.wallet

    const substake = props.substake

    const [duration, setDuration] = useState(daysPerPeriod)
    const [originalUnlockDate] = useState(getCurrentPeriod() + parseInt(substake.unlockingDuration) + 1)
    const [newUnlockDate, setNewUnlockDate] = useState(originalUnlockDate + 1)

    const onDurationChanged = (duration) => {
        if (duration < daysPerPeriod) return
        setDuration(parseInt(duration))
        setNewUnlockDate(originalUnlockDate + parseInt(duration)/daysPerPeriod)
    }

    const handleAction = (e) => {

        const extensionLength = (newUnlockDate - originalUnlockDate)
        const hex = web3.utils.numberToHex(extensionLength)
        ContractCaller(
            contracts.STAKINGESCROW.methods.prolongStake(
                substake.id,
                hex),
            context,
            [`substakeupdate${substake.id}`],
            `Extend stake #${substake.index}`
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
                    <p>Adds additional periods to the duration of an existing stake.</p>
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 ml-3">
                    <div className="d-flex justify-content-between">
                        <Grey>Additional Duration</Grey>
                        <strong><TypeOver onChange={onDurationChanged}>{duration}</TypeOver> <Grey>Days</Grey></strong>
                    </div>
                    <Slider step={daysPerPeriod} min={daysPerPeriod} max={364} value={duration} onChange={onDurationChanged} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataRow>
                        <strong>Unlock Date <small><CircleQ>Unlock date only applies if "wind down" is turned on (you can toggle that at /manage).</CircleQ></small></strong>
                        <strong>New Unlock Date</strong>
                    </DataRow>
                    <DataRow>
                        <span><strong><Blue><Period>{originalUnlockDate}</Period></Blue></strong></span>
                        <span><strong><Blue><Period>{newUnlockDate}</Period></Blue></strong></span>
                    </DataRow>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!duration} onClick={handleAction} width="100%">Extend Stake</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}