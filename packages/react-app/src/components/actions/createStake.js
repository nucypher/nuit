import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, DataRow, HR, Period, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ, ConnectPLS } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/services'
import { calcROI, MIN_STAKE, daysPerPeriod, getCurrentPeriod } from '@project/react-app/src/constants'

export const CreateStake = (props) => {

    const context = useContext(Context)
    const { contracts, web3 } = context.wallet


    const [nuAllocated, setNuAllocation] = useState()
    const [maxNULimit, setMaxNULimit] = useState(context.availableNU.get)
    const [humanNuLimit, setHumanNuLimit] = useState(0)
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [duration, setDuration] = useState(props.duration || daysPerPeriod * 10)
    const [roi, setRoi] = useState({apr: 0, net: 0})

    const [unlockDate, setUnlockDate] = useState(getCurrentPeriod() + 11)

    const [addingsubstake, setAddingSubstake] = useState(false)

    useEffect(() => {
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
    })


    const onAmountChanged = (amount) => {
        if (!amount) return
        const rules = [
            {
                rule: (amount >= MIN_STAKE),
                message: `Amount ${amount} is less than the minimum 15,000 NU.`
            },
            {
                rule: (web3.utils.toWei(amount.toString(),  'ether') <= context.availableNU.get),
                message: `Amount ${amount} exceeds total NU holdings for account.`
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
        } else{
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

        /*
        stakeLength
            this value should be the length of the stake in periods
            we subtract 1 from the "unlock date" as displayed to the user because
            we want the "lastPeriod" of the stake (as recognized by the contract)
            as opposed to the human readable "unlock date"
            which is the period following the lastPeriod of the stake
        */

        const stakeLength = (unlockDate - 1) - getCurrentPeriod()

        // console.log(getCurrentPeriod() + stakeLength)

        const hex = web3.utils.numberToHex(stakeLength)

        ContractCaller(
            contracts.NU.methods.approveAndCall(
                contracts.STAKINGESCROW._address,
                amount,
                hex),
            context,
            'addsubstake',
            'Create New Stake'
        )
    }

    useEffect(()=>{
        if(web3 && !nuAllocated){
            onAmountChanged(web3.utils.fromWei(context.availableNU.get.toString(),  'ether'))
        }
    },[web3, context.availableNU.get])

    return(
        <Container>
            {web3 ? <div>

            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <NuStakeAllocator valid={AllocationValid} invalidmessage={invalidMessage} value={nuAllocated} initial={maxNULimit} onChange={onAmountChanged}/>
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
                            {roi.apr.toFixed(2)} % (APR)
                            <CircleQ>Estimate based on duration of stake and current network participation</CircleQ>
                        </Blue>
                        <br/><Grey>{roi.net.toFixed(2)} NU</Grey>
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
                        <h5><Blue>{nuAllocated}</Blue></h5>
                        <h5><Blue><Period>{unlockDate}</Period></Blue></h5>
                    </DataRow>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!AllocationValid} activeCheck={addingsubstake} abort={setAddingSubstake} onClick={handleAction} width="100%">Create Stake</PendingButton>
                </Col>
            </Row></div>:<ConnectPLS/>}
        </Container>
    )
}