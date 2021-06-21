import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap/';
import { TypeOver, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ, DataRow, Period } from '@project/react-app/src/components'

import { formatWei } from '@project/react-app/src/constants'

import { Context, ContractCaller, setNUAllowance } from '@project/react-app/src/services'


export const IncreaseStake = (props) => {

    const context = useContext(Context)
    const { web3, contracts, account } = context.wallet

    const substake = props.substake

    const [nuAllocated, setNuAllocation] = useState()
    const [maxNULimit] = useState(web3.utils.toBN(context.availableNU.get || 0))
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [approvingNUspend, setApprovingNUspend] = useState(false)
    const [iAmDisclaimed, setIAmDisclaimed] = useState(false)

    const handleAction = (e) => {

        const hex = web3.utils.numberToHex(0)
        ContractCaller(
            contracts.STAKINGESCROW.methods.depositAndIncrease(
                substake.id,
                nuAllocated),
            context,
            [`increaseStake${substake.id}`],
            `Increasing stake #${substake.index} by ${formatWei(nuAllocated)}`
        )

        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }
    }

    const onAmountChanged = (amount) => {
        // amount in wei
        if (!amount) return

        const amount_bn = web3.utils.toBN(amount)
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
        } else{
            setAllocationValid(false)
            setInvalidMessage(message)
        }
    }

    const setAllowance = () => {
        setNUAllowance(nuAllocated, context)
    }

    const amountValid = () => {
        return nuAllocated  && !web3.utils.toBN(nuAllocated).isZero()
    }

    const checkAllowance = (amount, allowance) => {

        if (amount && allowance) {
            const amount_bn = web3.utils.toBN(amount)
            return amount_bn.lte(web3.utils.toBN(allowance)) && amount_bn.gt(web3.utils.toBN(0))
        }
    }

    useEffect(() => {
        setApprovingNUspend(context.pending.indexOf('approvingNUspend') > -1)
    }, [context.pending.length, context.pending])

    useEffect(() => {
        onAmountChanged(maxNULimit)
    }, [maxNULimit])

    return(
        <Container>
            <Row>
                <Col className="d-flex ">
                    <p>Locks additional NU into an existing stake.</p>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <NuStakeAllocator valid={AllocationValid} invalidmessage={invalidMessage} value={nuAllocated} initial={maxNULimit} onChange={onAmountChanged}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        Note: Due to a known issue with the StakingEscrow contract, increasing a stake by a small amounts is not always financially beneficial.  If you are able to stake 15000 NU, it is much better to create a new substake instead.
                    </p>
                    <p>More at <Blue><a href="https://github.com/nucypher/nucypher/issues/2691" target="blank">the issue in GitHub</a></Blue></p>
                    <label> <input onChange={e => {setIAmDisclaimed(!iAmDisclaimed)}} className="ml-3" type="checkbox"></input> OK. I understand.</label>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton activeCheck={approvingNUspend} disabled={!amountValid() || checkAllowance(nuAllocated, context.NUallowance.get) || !iAmDisclaimed} onClick={setAllowance} width="100%"><small>Allow NU spend</small></PendingButton>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!checkAllowance(nuAllocated, context.NUallowance.get) || !amountValid() || !iAmDisclaimed} onClick={handleAction} width="100%">Increase Stake</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}