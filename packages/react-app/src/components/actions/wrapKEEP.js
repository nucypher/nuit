import React, { useContext, useState, useEffect } from 'react'
import Web3 from "web3";

import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, DataRow, Period, PendingButton, Slider, Grey, Blue, Purple, NuStakeAllocator, CircleQ, ConnectPLS, DisplayWei } from '@project/react-app/src/components'

import { Context, ContractCaller, setKEEPAllowance } from '@project/react-app/src/services'
import { calcTReturn, MIN_STAKE, daysPerPeriod, getCurrentPeriod, formatWei, formatNumber } from '@project/react-app/src/constants'


export const WrapKEEP = (props) => {

    const context = useContext(Context)
    const { contracts, account } = context.wallet

    const [nuAllocated, setNuAllocation] = useState()
    const [maxKEEPLimit] = useState(Web3.utils.toBN(context.availableKEEP.get || 0))
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [duration, setDuration] = useState(props.duration || daysPerPeriod * 10)
    const [Tback, setTReturn] = useState({apr: 0, net: 0})

    const [unlockDate, setUnlockDate] = useState(getCurrentPeriod() + 11)

    const [wrappingKEEP, setWrappingKEEP] = useState(false)
    const [approvingKEEPspend, setApprovingKEEPspend] = useState(false)

    useEffect(() => {
        setWrappingKEEP(context.pending.indexOf('wrappingKEEP') > -1)
    })

    const onAmountChanged = (amount) => {
        // amount in wei
        if (!amount) return

        const amount_bn = Web3.utils.toBN(amount)
        const rules = [
            {
                rule: amount_bn.lte(maxKEEPLimit),
                message: `Amount ${formatWei(amount)} exceeds total KEEP holdings for account.`
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
                setTReturn(calcTReturn(amount, context.KEEPratio.get))
            }
        } else{
            // setNuAllocation(0)
            setAllocationValid(false)
            setInvalidMessage(message)
        }
    }

    useEffect(() => {
        if (nuAllocated){
            setTReturn(calcTReturn(nuAllocated, context.KEEPratio.get))
        }
    }, [duration, AllocationValid, nuAllocated, maxKEEPLimit])


    const handleAction = (e) => {
        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(
            contracts.KEEP.methods.approveAndCall(
                contracts.KEEPVENDINGMACHINE._address,
                nuAllocated,
                0),
            context,
            ['wrappingKEEP'],
            'Wrapping KEEP in T'
        )
    }

    useEffect(() => {
        if(Web3 && nuAllocated === undefined){
            onAmountChanged(context.availableKEEP.get)
        }
    })

    return(
        <Container>
            {account ? <div>

            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <NuStakeAllocator
                        label="KEEP Available"
                        denomination="KEEP"
                        valid={AllocationValid}
                        invalidmessage={invalidMessage}
                        value={nuAllocated}
                        initial={maxKEEPLimit}
                        onChange={onAmountChanged}/>
                </Col>
            </Row>

            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col xs={6} className="d-flex justify-content-between">
                    <strong className="nowrap">
                        <Grey>T conversion ratio: {formatNumber(context.KEEPratio.get, 4)}
                        </Grey>
                    </strong>
                </Col>
                {/*<Col xs={6} className="d-flex justify-content-between">*/}
                {/*    <h5 className="nowrap mr-3">T thee shall has't</h5>*/}
                {/*    <strong className="nowrap">*/}
                {/*        <Blue>*/}
                {/*            {formatNumber(Tback, 2)}*/}

                {/*        </Blue>*/}
                {/*        <br/><Grey>{formatNumber(Tback, 0)} T</Grey>*/}
                {/*    </strong>*/}
                {/*    <br></br>*/}
                {/*</Col>*/}
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataRow>
                        <strong>KEEP Amount</strong>
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
                        id="keep-button"
                        disabled={!AllocationValid}
                        activeCheck={wrappingKEEP}
                        abort={setWrappingKEEP}
                        onClick={handleAction}
                        width="100%">

                                <div className="conversionHint">
                                    <span>Upgrade</span>
                                    <img src={require('../../assets/icons/keep.svg')}/>
                                    <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                    <img src={require('../../assets/icons/t.svg')}/>
                                </div>
                    </PendingButton>

               </Col>
            </Row></div>:<ConnectPLS/>}
        </Container>
    )
}