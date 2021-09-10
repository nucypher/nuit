import React, { useState, useEffect } from 'react'
import Web3 from "web3";

import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, DataRow, Period, Slider, Grey, Blue, NuStakeAllocator, CircleQ, DisplayWei } from '@project/react-app/src/components'

import { calcROI, MIN_STAKE, daysPerPeriod, getCurrentPeriod, formatWei, formatNumber } from '@project/react-app/src/constants'


export const EstimateRewards = ({ setShow }) => {

    const MIN_STAKE_BN = Web3.utils.toBN(Web3.utils.toWei(MIN_STAKE.toString(),  'ether'))

    const [nuAllocated, setNuAllocation] = useState(MIN_STAKE_BN)
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [duration, setDuration] = useState(daysPerPeriod * 10)
    const [roi, setRoi] = useState({apr: 0, net: 0})
    const [unlockDate, setUnlockDate] = useState(getCurrentPeriod() + 11)

    const onAmountChanged = (amount) => {
        // amount in wei
        if (!amount) return

        const amount_bn = Web3.utils.toBN(amount)
        const rules = [
            {
                rule: amount_bn.gte(MIN_STAKE_BN),
                message: `Amount ${formatWei(amount)} is less than the minimum 15,000 NU.`
            }
        ]

        let message = null
        if (rules.every((r)=>{
            message=r.message
            return r.rule
        })){
            setNuAllocation(amount)
            setAllocationValid(true)
            if (amount && duration){
                setRoi(calcROI(amount, duration))
            }
        } else {
            // setNuAllocation(0)
            setAllocationValid(false)
            setInvalidMessage(message)
        }
    }

    const onDurationChanged = (duration) => {
        if (duration < daysPerPeriod * 4) return
        setDuration(duration)
        setUnlockDate(getCurrentPeriod() + duration/daysPerPeriod + 2)
        if (nuAllocated && duration){
            setRoi(calcROI(nuAllocated, duration))
        }
    }

    useEffect(() => {
        if (nuAllocated && duration){
            setRoi(calcROI(nuAllocated, duration))
        }
    }, [duration, AllocationValid, nuAllocated])

    return(
        <Container>
            <div>

            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <NuStakeAllocator valid={AllocationValid} invalidmessage={invalidMessage} value={nuAllocated} onChange={onAmountChanged}/>
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 ml-3">
                    <div className="d-flex justify-content-between">
                        <Grey>Duration</Grey>
                        <strong><TypeOver onChange={onDurationChanged}>{duration}</TypeOver> <Grey>Days</Grey></strong>
                    </div>
                    <Slider step={daysPerPeriod} min={daysPerPeriod} max={daysPerPeriod * 365/daysPerPeriod} value={duration} onChange={onDurationChanged} />
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col xs={6} className="d-flex justify-content-between">
                    <h5 className="nowrap mr-3">Estimated ROI</h5>
                    <strong className="nowrap">
                        <Blue>
                            {formatNumber(roi.apr, 2)} % (APR)
                            <CircleQ>Estimate based on duration of stake and current network participation</CircleQ>
                        </Blue>
                        <br/><Grey>{formatNumber(roi.net, 0)} NU</Grey>
                    </strong>
                    <br></br>
                </Col>
                <Col xs={8}><p><small><i>This is an estimate based on a rough extrapolation of historical data.  Please DYOR and assume that future results may vary.</i></small></p></Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataRow>
                        <strong>Stake Amount</strong>
                        <strong>Unlock Date <small><CircleQ>Unlock date only applicable if "wind down" is turned on (you can toggle that at /manage).</CircleQ></small></strong>
                    </DataRow>
                    <DataRow>
                        {nuAllocated ? <h5><Blue><DisplayWei>{nuAllocated}</DisplayWei></Blue></h5>:''}
                        <h5><Blue><Period>{unlockDate}</Period></Blue></h5>
                    </DataRow>
                </Col>
            </Row>
            </div>
        </Container>
    )
}