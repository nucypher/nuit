import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap/';
import Accordion from "react-bootstrap/Accordion";
import { PrimaryButton, NoBorderButton, DisplayWei, WorkerETHAddressField, Blue } from '@project/react-app/src/components'

import { Context, ContractCaller } from '@project/react-app/src/services'

export const StakeNU = (props) => {

    const context = useContext(Context)
    const { account, contracts } = context.wallet

    const [stakingNU, setStakingNU] = useState(false)

    const [stakingProvider, setStakingProvider] = useState(account)
    const [beneficiary, setBeneficiary] = useState(account)
    const [authorizer, setAuthorizer] = useState(account)


    const [toggle, setToggle] = useState(false)



    const handleAction = () => {
        if (props.setShow){
            props.setShow(false)
        }
        ContractCaller(contracts.TOKENSTAKING.methods.stakeNu(stakingProvider, beneficiary, authorizer), context, 'stakingNU', `Stake NU on Threshold as T`)
    }

    useEffect(() => {
        setStakingNU(context.pending.indexOf('stakingNU') > -1)
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
            <Row>
                <Col>
                    <PrimaryButton onClick={e => handleAction()}>Stake <DisplayWei>{context.stakedNU}</DisplayWei> NU on Threshold as T</PrimaryButton>
                </Col>
            </Row>
        </Container>
    )
}