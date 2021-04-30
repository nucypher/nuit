import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PrimaryButton, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/utils'
import { calcROI } from '@project/react-app/src/constants'


export const CreateStake = (props) => {

    const [nuAllocated, setNuAllocation] = useState(props.amount || 15000)
    const [maxNULimit, setMaxNULimit] = useState(0)
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [duration, setDuration] = useState(props.duration || 30)
    const [roi, setRoi] = useState({apr: 0, net: 0})

    const context = useContext(Context)
    const { contracts, web3 } = context.wallet

    const [addingsubstake, setAddingSubstake] = useState(false)

    useEffect(() => {
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
    })


    const onAmountChanged = (amount) => {
        if (amount >= 15000){
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
        if (maxNULimit < 15000){
            setAllocationValid(false)
            setInvalidMessage(`Balance of ${maxNULimit} NU insufficient for 15000 min. stake.`)
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
                    <NuStakeAllocator onBalanceUpdate={setMaxNULimit} valid={AllocationValid} invalidmessage={invalidMessage} value={nuAllocated} onChange={onAmountChanged}/>
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 ml-3">
                    <div className="d-flex justify-content-between">
                        <Grey>Duration</Grey>
                        <strong><Blue>{duration}</Blue> <Grey>Days</Grey></strong>
                    </div>
                    <Slider duration={duration} onChange={onDurationChanged} />
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col xs={6} className="d-flex justify-content-between">
                    <h5 className="nowrap mr-3">Estimated ROI</h5>
                    <strong className="nowrap">
                        <Blue>
                            {roi.apr.toFixed(2)} %
                            <CircleQ tooltip="estimate based on duration of stake and current network participation"/>
                        </Blue>
                        <br/><Grey>{roi.net.toFixed(2)} NU</Grey>
                    </strong>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!AllocationValid} activeCheck={addingsubstake} abort={setAddingSubstake} onClick={handleAction} width={100}>Create Stake</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}