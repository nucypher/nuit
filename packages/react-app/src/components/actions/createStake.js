import React, { useContext, useState, useEffect } from 'react'
import Web3 from "web3";

import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, DataRow, Period, PendingButton, Slider, Grey, Blue, StakeAllocator, CircleQ, ConnectPLS, DisplayWei } from '@project/react-app/src/components'

import { Context, ContractCaller, setTAllowance } from '@project/react-app/src/services'
import { calcROI, MIN_STAKE, daysPerPeriod, getCurrentPeriod, formatWei, formatNumber } from '@project/react-app/src/constants'


export const CreateStake = (props) => {

    const context = useContext(Context)
    const { contracts, account } = context.wallet

    const MIN_STAKE_BN = Web3.utils.toBN(Web3.utils.toWei(MIN_STAKE.toString(),  'ether'))

    const [nuAllocated, setTAllocation] = useState()
    const [maxTLimit] = useState(Web3.utils.toBN(context.availableT.get || 0))
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()

    const [addingsubstake, setAddingSubstake] = useState(false)
    const [approvingTspend, setApprovingTspend] = useState(false)

    useEffect(() => {
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
    })


    const onAmountChanged = (amount) => {
        // amount in wei
        if (!amount) return

        const amount_bn = Web3.utils.toBN(amount)
        const rules = [
            {
                rule: amount_bn.gte(MIN_STAKE_BN),
                message: `Amount ${formatWei(amount)} is less than the minimum 15,000 T.`
            },
            {
                rule: amount_bn.lte(maxTLimit),
                message: `Amount ${formatWei(amount)} exceeds total T holdings for account.`
            }
        ]

        let message = null
        if (rules.every((r)=>{
            message=r.message
            return r.rule
        })){
            setTAllocation(amount)
            setAllocationValid(true)
        } else{
            // setTAllocation(0)
            setAllocationValid(false)
            setInvalidMessage(message)
        }
    }

    const setAllowance = () => {
        setTAllowance("0", context)
    }

    const handleAction = (e) => {
        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }

        /*
        stakeLength
            this value should be the length of the stake in periods
            we subtract 1 from the "unlock date" as displayed to the user because
            we want the "lastPeriod" of the stake (as recognized by the contract)
            as opposed to the human readable "unlock date"
            which is the period following the lastPeriod of the stake
        */
        ContractCaller(
            contracts.T.methods.approveAndCall(
                contracts.STAKINGESCROW._address,
                nuAllocated,
            ),
            context,
            'addsubstake',
            'Create New Stake'
        )
    }

    useEffect(() => {
        if(Web3 && nuAllocated === undefined){
            onAmountChanged(context.availableT.get)
        }
    })

    useEffect(() => {
        setApprovingTspend(context.pending.indexOf('approvingTspend') > -1)
    }, [context.pending.length, context.pending])

    return(
        <Container>
            {account ? <div>

            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <StakeAllocator valid={AllocationValid} invalidmessage={invalidMessage} value={nuAllocated} initial={maxTLimit} onChange={onAmountChanged}/>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataRow>
                        <strong>Stake Amount</strong>
                    </DataRow>
                    <DataRow>
                        {nuAllocated ? <h5><Blue><DisplayWei>{nuAllocated}</DisplayWei></Blue></h5>:<h5></h5>}
                    </DataRow>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    {
                        context.Tallowance.get.isZero() ?
                            <PendingButton disabled={!AllocationValid} activeCheck={addingsubstake} abort={setAddingSubstake} onClick={handleAction} width="100%">Create Stake</PendingButton> :
                            <PendingButton activeCheck={approvingTspend} onClick={setAllowance} width="100%"><small>Allow T spend</small></PendingButton>
                    }
               </Col>
            </Row></div>:<ConnectPLS/>}
        </Container>
    )
}