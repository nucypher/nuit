import React, { useContext, useState, useEffect } from 'react'
import Web3 from "web3";

import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, DataRow, Period, PendingButton, Slider, Grey, Blue, Purple, NuStakeAllocator, CircleQ, ConnectPLS, DisplayWei } from '@project/react-app/src/components'

import { Context, ContractCaller, setNUAllowance } from '@project/react-app/src/services'
import { calcTReturn, MIN_STAKE, daysPerPeriod, getCurrentPeriod, formatWei, formatNumber } from '@project/react-app/src/constants'


export const WrapNU = (props) => {

    const context = useContext(Context)
    const { contracts, account } = context.wallet

    const [nuAllocated, setNuAllocation] = useState()
    const [maxNULimit] = useState(Web3.utils.toBN(context.availableNU.get || 0))
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [duration, setDuration] = useState(props.duration || daysPerPeriod * 10)
    const [Tback, setTReturn] = useState({apr: 0, net: 0})

    const [unlockDate, setUnlockDate] = useState(getCurrentPeriod() + 11)

    const [wrappingNU, setWrappingNU] = useState(false)
    const [approvingNUspend, setApprovingNUspend] = useState(false)

    useEffect(() => {
        setWrappingNU(context.pending.indexOf('wrappingNU') > -1)
    })


    const onAmountChanged = (amount) => {
        // amount in wei
        if (!amount) return

        const amount_bn = Web3.utils.toBN(amount)
        const rules = [
            {
                rule: amount_bn.lte(maxNULimit),
                message: `Amount ${formatWei(amount)} exceeds total NU holdings for account.`
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
                setTReturn(calcTReturn(amount, context.NUratio.get))
            }
        } else{
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
            setTReturn(calcTReturn(nuAllocated, context.NUratio.get))
        }
    }

    useEffect(() => {
        if (nuAllocated){
            setTReturn(calcTReturn(nuAllocated, context.NUratio.get))
        }
    }, [duration, AllocationValid, nuAllocated, maxNULimit])


    const handleAction = (e) => {
        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(
            contracts.NU.methods.approveAndCall(
                contracts.NUVENDINGMACHINE._address,
                nuAllocated,
                0),
            context,
            ['wrappingNU'],
            'Wrapping NU in T'
        )
    }

    useEffect(() => {
        if(Web3 && nuAllocated === undefined){
            onAmountChanged(context.availableNU.get)
        }
    })

    useEffect(() => {
        setApprovingNUspend(context.pending.indexOf('approvingNUspend') > -1)
    }, [context.pending.length, context.pending])

    return(
        <Container>
            {account ? <div>

            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <NuStakeAllocator label="NU Available" valid={AllocationValid} invalidmessage={invalidMessage} value={nuAllocated} initial={maxNULimit} onChange={onAmountChanged}/>
                </Col>
            </Row>

            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col xs={6} className="d-flex justify-content-between">
                    <strong className="nowrap">
                        <Grey>T conversion ratio: {formatNumber(context.NUratio.get, 4)}
                        </Grey>
                    </strong>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataRow>
                        <strong>NU Amount</strong>
                        <strong>T Amount</strong>
                    </DataRow>
                    <DataRow>
                        {nuAllocated ? <h5><Blue><DisplayWei fixed={4}>{nuAllocated}</DisplayWei></Blue></h5>:<h5></h5>}
                        <h5><Purple>{formatNumber(Tback, 4)}</Purple></h5>
                    </DataRow>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">

                    <PendingButton
                        disabled={!AllocationValid}
                        activeCheck={wrappingNU}
                        abort={setWrappingNU}
                        onClick={handleAction}
                        width="100%">

                        <div className="conversionHint">
                            <span>Upgrade</span>
                            <img src={require('../../assets/icons/nu.svg')}/>
                            <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                            <img src={require('../../assets/icons/t.svg')}/>
                        </div>
                    </PendingButton>
               </Col>
            </Row>
            </div>:<ConnectPLS/>}
        </Container>
    )
}