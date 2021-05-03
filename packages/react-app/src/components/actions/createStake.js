import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/services'
import { calcROI, MIN_STAKE, daysPerPeriod } from '@project/react-app/src/constants'


const TypeOver = (props) => {

    const [typing, setTyping] = useState(false)


    return (
        <span onClick={e => setTyping(true)}>
            {typing ? <span onClick={e => {e.stopPropagation(); setTyping(false)}}> X </span> : null}
            {typing ? <input size={props.size || 10} onChange={e=>props.onChange(e.target.value)} type="text" value={props.children}></input>: <Blue>{props.children}</Blue>}
        </span>
    )
}

export const CreateStake = (props) => {

    const context = useContext(Context)
    const [nuAllocated, setNuAllocation] = useState(context.availableNU.get.toString())
    const [maxNULimit, setMaxNULimit] = useState(context.availableNU.get)
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [duration, setDuration] = useState(props.duration || 30)
    const [roi, setRoi] = useState({apr: 0, net: 0})


    const { contracts, web3 } = context.wallet

    const [addingsubstake, setAddingSubstake] = useState(false)

    useEffect(() => {
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
    })


    const onAmountChanged = (amount) => {
        if (amount >= MIN_STAKE){
            setNuAllocation(amount)

            setAllocationValid(true)
            if (amount && duration){
                setRoi(calcROI(amount, duration))
            }
        } else{
            setNuAllocation(amount)
            setAllocationValid(false)
            setInvalidMessage(`Amount ${amount} is less than the minimum 15,000 NU.`)
        }
    }

    const onDurationChanged = (duration) => {
        setDuration(duration)
        if (nuAllocated && duration){
            setRoi(calcROI(nuAllocated, duration))
        }
    }

    useEffect(() => {
        if (nuAllocated && duration){
            setRoi(calcROI(nuAllocated, duration))
        }
        if (maxNULimit < MIN_STAKE){
            setAllocationValid(false)
            setInvalidMessage(`Balance of ${maxNULimit} NU insufficient for ${MIN_STAKE} min. stake.`)
        }
    }, [duration, AllocationValid, nuAllocated, maxNULimit])


    const handleAction = (e) => {
        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }

        const amount = web3.utils.toWei(String(nuAllocated), "ether")
        const hex = web3.utils.numberToHex(daysToPeriods(duration))

        ContractCaller(
            contracts.NU.methods.approveAndCall(
                contracts.STAKINGESCROW._address,
                amount,
                hex),
            context,
            'addsubstake'
        )
    }

    return(
        <Container>
            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Set Stake</h1>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <NuStakeAllocator onBalanceUpdate={setMaxNULimit} valid={AllocationValid} invalidmessage={invalidMessage} initial={0} value={nuAllocated} initial={maxNULimit} onChange={onAmountChanged}/>
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 ml-3">
                    <div className="d-flex justify-content-between">
                        <Grey>Duration</Grey>
                        <strong><TypeOver onChange={onDurationChanged}>{duration}</TypeOver> <Grey>Days</Grey></strong>
                    </div>
                    <Slider step={daysPerPeriod} min={daysPerPeriod} max={daysPerPeriod * 52 * 3} value={duration} onChange={onDurationChanged} />
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col xs={6} className="d-flex justify-content-between">
                    <h5 className="nowrap mr-3">Estimated ROI</h5>
                    <strong className="nowrap">
                        <Blue>
                            {roi.apr.toFixed(2)} % (APR)
                            <CircleQ tooltip="Estimate based on duration of stake and current network participation"/>
                        </Blue>
                        <br/><Grey>{roi.net.toFixed(2)} NU</Grey>
                    </strong>
                    <br></br>
                </Col>
                <Col xs={8}><p><small><i>This is an estimate based on a rough extrapolation of historical data.  Please DYOR and assume that future results may vary.</i></small></p></Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!AllocationValid} activeCheck={addingsubstake} abort={setAddingSubstake} onClick={handleAction} width="100%">Create Stake</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}