import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap/';
import Accordion from "react-bootstrap/Accordion";
import { PrimaryButton, PendingButton, NoBorderButton, StakeAllocator, WorkerETHAddressField, Blue, TokenBalance } from '@project/react-app/src/components'

import { formatWei } from '@project/react-app/src/constants'

import { Context, ContractCaller, setTAllowance } from '@project/react-app/src/services'

export const StakeT = (props) => {

    const context = useContext(Context)
    const { web3, contracts, account } = context.wallet

    const [stakingT, setStakingT] = useState(false)

    const [stakingProvider, setStakingProvider] = useState(account)
    const [beneficiary, setBeneficiary] = useState(account)
    const [authorizer, setAuthorizer] = useState(account)

    const [TtokenAllocated, setNuAllocation] = useState(context.availableT.get || 0)
    const [maxTLimit] = useState(web3.utils.toBN(context.availableT.get || 0))
    const [AllocationValid, setAllocationValid] = useState(true)
    const [invalidMessage, setInvalidMessage] = useState()
    const [approvingTspend, setApprovingTspend] = useState(false)
    // const [iAmDisclaimed, setIAmDisclaimed] = useState(false)

    const onAmountChanged = (amount) => {
        // amount in wei
        if (!amount) return

        const amount_bn = web3.utils.toBN(amount)
        const rules = [
            {
                rule: amount_bn.lte(maxTLimit),
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
        setTAllowance(TtokenAllocated, context)
    }

    const amountValid = () => {
        return TtokenAllocated  && !web3.utils.toBN(TtokenAllocated).isZero()
    }

    const checkAllowance = (amount, allowance) => {

        if (amount && allowance) {
            const amount_bn = web3.utils.toBN(amount)
            return amount_bn.lte(web3.utils.toBN(allowance)) && amount_bn.gt(web3.utils.toBN(0))
        }
    }

    useEffect(() => {
        setApprovingTspend(context.pending.indexOf('approvingTspend') > -1)
    }, [context.pending.length, context.pending])



    const [toggle, setToggle] = useState(false)

    const handleAction = () => {
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(contracts.TOKENSTAKING.methods.stake(stakingProvider, beneficiary, authorizer, TtokenAllocated), context, 'stakingT', `Stake T`)
    }

    useEffect(() => {
        setStakingT(context.pending.indexOf('stakingT') > -1)
    })

    return(
        <Container>
                <p>See more about the various address configurations <Blue><a target="threshold" href="https://interim-pre-application-docs.readthedocs.io/en/latest/">here.</a></Blue></p>
                <Accordion>
                    <Accordion.Toggle onClick={() => setToggle(!toggle)} as={NoBorderButton} eventKey="0">
                        {toggle ? "Hide" : "Configure"} Addresses
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Col className="tightbox">
                                <WorkerETHAddressField
                                    label="Staking Provider"
                                    value={stakingProvider}
                                    onChange={setStakingProvider}
                                    description="Staking Provider Address."
                                />
                                <WorkerETHAddressField
                                    label="Beneficiary Address"
                                    value={beneficiary}
                                    onChange={setBeneficiary}
                                    description="Beneficiary Address."
                                />
                                <WorkerETHAddressField
                                    label="Authorizer Address"
                                    value={authorizer}
                                    onChange={setAuthorizer}
                                    description="Authorizer Address."
                                />
                            </Col>
                        </Accordion.Collapse>
                </Accordion>
            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <StakeAllocator valid={AllocationValid} invalidmessage={invalidMessage} value={TtokenAllocated} initial={maxTLimit} onChange={onAmountChanged}/>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton activeCheck={approvingTspend} disabled={!amountValid() || checkAllowance(TtokenAllocated, context.Tallowance.get)} onClick={setAllowance} width="100%"><small>Allow T spend</small></PendingButton>
                </Col>
                <Col>
                    <PrimaryButton disabled={!checkAllowance(TtokenAllocated, context.Tallowance.get) || !amountValid()} className="d-flex flex-xs-nowrap" onClick={e => handleAction()}> Stake <TokenBalance label="T" balance={TtokenAllocated}/></PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}