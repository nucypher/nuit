import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, PendingButton, Slider, Grey, Blue, NuStakeAllocator, CircleQ, DataRow, Period } from '@project/react-app/src/components'

import { formatWei } from '@project/react-app/src/constants'

import { Context, ContractCaller } from '@project/react-app/src/services'


export const IncreaseStake = (props) => {

    const context = useContext(Context)
    const { web3, contracts, account } = context.wallet

    const substake = props.substake

    const [nuAllocated, setNuAllocation] = useState()
    const [maxNULimit] = useState(web3.utils.toBN(context.availableNU.get || 0))
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [approvingNUspend, setApprovingNUspend] = useState(false)

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

    const increaseAllowance = async () => {
        const amount_bn = web3.utils.toBN(nuAllocated)

        if (context.NUallowance.get === '0') {
            ContractCaller(
                contracts.NU.methods.approve(
                    contracts.STAKINGESCROW._address,
                    nuAllocated
                ),
                context,
                [`approvingNUspend`],
                `Approving ${formatWei(nuAllocated)} NU spend`
            )
        } else if (amount_bn.gt(context.NUallowance.get)) {
            ContractCaller(
                contracts.NU.methods.increaseAllowance(
                    contracts.STAKINGESCROW._address,
                    amount_bn.sub(context.NUallowance.get)
                ),
                context,
                [`approvingNUspend`],
                `Approving ${formatWei(nuAllocated)} NU spend`
            )
        }
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

            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton activeCheck={approvingNUspend} disabled={!amountValid() || checkAllowance(nuAllocated, context.NUallowance.get)} onClick={increaseAllowance} width="100%"><small>Allow NU spend</small></PendingButton>
                </Col>
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!checkAllowance(nuAllocated, context.NUallowance.get) } onClick={handleAction} width="100%">Increase Stake</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}