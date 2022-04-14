import React, { useContext, useEffect, useState } from 'react'

import { Row, Col, Form } from 'react-bootstrap/';
import { InputBox, BondOperator, TokenBalance, DataRow, ButtonBox, Address, Blue, WorkerETHAddressField } from '@project/react-app/src/components'
import { Context, toQuery, getNodeStatus } from '@project/react-app/src/services'


export default (props) => {

    const context = useContext(Context)
    const [stakingProvider, setStakingProvider] = useState(null)
    const [stakingProviderBalance, setStakingProviderBalance] = useState(0)
    const [bondedOperator, setBondedOperator] = useState(null)
    const [isConfirmed, setIsConfirmed] = useState(null)
    const [AccountDetermined, setAccountDetermined] = useState(false)
    const [nodeURI, setnodeURI] = useState(false)
    const { account, contracts, web3 } = context.wallet

    const getStakingProvider = async () => {

        setStakingProvider(null)
        setAccountDetermined(false)

        const events = await contracts.TOKENSTAKING.getPastEvents(
            'Staked', {
                fromBlock: 14128949, 
        })

        const lowerAcct = account.toLowerCase()
        if (events.length){
            //find most recent staking event
            const stakingEvent = events.reverse().find(e => e.returnValues.owner.toLowerCase()===lowerAcct)
            if (stakingEvent){
            setStakingProvider(stakingEvent.returnValues.stakingProvider)
            setAccountDetermined(true)   
            }
        }
    }

    const getBondingState = async () => {
        const operator = await contracts.SIMPLEPREAPPLICATION.methods.getOperatorFromStakingProvider(stakingProvider).call()
        setBondedOperator(operator)
        if (operator) {
            const confirmed = await contracts.SIMPLEPREAPPLICATION.methods.isOperatorConfirmed(operator).call()
            setIsConfirmed(confirmed)
            
        }
    }

    const getBalance = async () => {
        const stakeBalances = await contracts.TOKENSTAKING.methods.stakes(stakingProvider).call()
        const nuInTStake= web3.utils.toBN(stakeBalances.nuInTStake)
        const tStake = web3.utils.toBN(stakeBalances.tStake)
        const keepInTStake = web3.utils.toBN(stakeBalances.keepInTStake)
        const total = nuInTStake.add(tStake).add(keepInTStake)
        setStakingProviderBalance(total)
    }

    const checkNodeOnline = async () => {
        const porterKnowsAboutNode = await getNodeStatus(context, stakingProvider)
        setnodeURI(porterKnowsAboutNode)
    }
    

    useEffect(() => {
        if (stakingProvider){
            getBondingState()
            getBalance()
            checkNodeOnline()
        } else{
            setBondedOperator(null)
            setIsConfirmed(false)
            setAccountDetermined(false)
            setnodeURI(null)
        }
    }, [stakingProvider])

    useEffect(() => {
        getStakingProvider()
    }, [account])


    return (
        <Row className="d-flex justify-content-center">
            <Col xs={12} >
            <InputBox>
                <Row className="mb-1">
                    <Col>
                        <h4>Manage Staking Providers/Operators</h4>
                        <p>Bond a Staking Provider with an Operator Address associated with a running PRE node</p>
                        <small>Click <Blue><a target="nucypher" href="https://docs.nucypher.com/en/latest/pre_application/cloud_node_management.html">here</a></Blue> for documentation on running a node</small>
                    </Col>
                </Row>
                {stakingProvider ? 
                <Row className="mb-1">
                    <Col >
                    <DataRow><strong>Staking Provider {AccountDetermined ? "automatically determined" : "as entered"}</strong><Blue onClick={e => {setStakingProvider(null)}}>Change Staking Provider</Blue></DataRow>
                    </Col>
                </Row> : <></>}
                <Row>
                    <Col>    
                            {
                                stakingProvider ? 
                                    <div>                                  
                                        <DataRow>
                                            <strong>Staking Provider</strong><span><Address>{stakingProvider}</Address></span>
                                        </DataRow>
                                        <DataRow>
                                            <strong>Staking Provider Balance</strong><TokenBalance label="T" balance={stakingProviderBalance}></TokenBalance>
                                        </DataRow>
                                    </div>
                            :
                                <div>
                                    <h5>Please enter a Staking Provider's address for Operator Bonding</h5>
                                    <Form.Group className="w100">
                                        <WorkerETHAddressField
                                            label="stakingProvider Address"
                                            value={stakingProvider}
                                            onChange={setStakingProvider}
                                            description="A delegated Staking Provider Address."
                                        />
                                    </Form.Group>
                                </div>
                            }       
                    </Col>
                </Row>

                {stakingProvider ? <Row>
                    <Col className="mb-3">
                        {bondedOperator ? <i>Note: You already have an operator bonded but you can change it here if you wish.</i> : <></>}
                        <BondOperator operatorAddress={props.operatorAddress}></BondOperator>
                    </Col>
                </Row>: <></>}

                <Row className="mb-5">
                    {stakingProvider ? <Col>
                    <ButtonBox>
                        <h5>status</h5>
                        <strong></strong>
                        <hr></hr>
                        <DataRow>
                            <strong>Current Bonded Operator</strong><span><Address>{bondedOperator || '--'}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Operator is Confirmed:</strong><span>{isConfirmed ? <Blue>yes</Blue>  : '--'}</span>
                        </DataRow>
                        <DataRow>
                            <strong>PRE Node is Configured:</strong><span>{nodeURI ? <span><a target="node" href={`${nodeURI}/status`}> &#x2197;</a><Blue>yes</Blue></span> : '--'}</span>
                        </DataRow>
                        </ButtonBox>
                    </Col> : <></>}
                </Row>
            </InputBox>
            </Col>
        </Row>
    )
}