import React, { useContext, useEffect, useState } from 'react'
import Web3 from "web3";

import { Row, Col, Form } from 'react-bootstrap/';
import { InputBox, BondOperator, TokenBalance, DataRow, ButtonBox, Address, Blue, WorkerETHAddressField } from '@project/react-app/src/components'
import { NULL_ADDRESS } from '@project/react-app/src/constants'
import { Context, toQuery, getNodeStatus } from '@project/react-app/src/services'
import {Link} from 'react-router-dom'


const DisplayBondingState = (props) => {

    const context = useContext(Context)
    const [bondedOperator, setBondedOperator] = useState(null)
    const [isConfirmed, setIsConfirmed] = useState(null)
    const [nodeURI, setnodeURI] = useState(false)

    const [aggregateStake, setAggregateStake] = useState(0);

    const { contracts, web3, network } = context.wallet

    const pendingKey = `bondoperator-${props.stakedata.index}`


    const getBondingState = async () => {
        const operator = await contracts.SIMPLEPREAPPLICATION.methods.getOperatorFromStakingProvider(props.stakedata.provider).call()
        if (operator && operator !== NULL_ADDRESS){
            setBondedOperator(operator)
        
            if (operator) {
                const confirmed = await contracts.SIMPLEPREAPPLICATION.methods.isOperatorConfirmed(operator).call()
                setIsConfirmed(confirmed)
            }
        }
        const stakes = await contracts.TOKENSTAKING.methods.stakes(props.stakedata.provider).call()
        setAggregateStake(Web3.utils.toBN(stakes.nuInTStake).add(Web3.utils.toBN(stakes.tStake)).add(Web3.utils.toBN(stakes.keepInTStake)))
        checkNodeOnline()
    }

    const getBalance = async () => {
        const stakeBalances = await contracts.TOKENSTAKING.methods.stakes(props.stakedata.provider).call()
        const nuInTStake= web3.utils.toBN(stakeBalances.nuInTStake)
        const tStake = web3.utils.toBN(stakeBalances.tStake)
        const keepInTStake = web3.utils.toBN(stakeBalances.keepInTStake)
        const total = nuInTStake.add(tStake).add(keepInTStake)
    }

    const checkNodeOnline = async () => {
        console.log(props.stakedata.provider)
        const porterKnowsAboutNode = await getNodeStatus(network, props.stakedata.provider)
        console.log(porterKnowsAboutNode)
        setnodeURI(porterKnowsAboutNode)
    }

    const isPending = () => {
        return context.pending.indexOf(pendingKey) > -1
    }

    useEffect(() => {
        getBondingState()
        getBalance()
    }, [])


    return (<Row className="d-flex justify-content-center">
            <Col xs={12} >
                <Row className="mb-5">
                    <Col>
                        <ButtonBox>
                            <h5>Stake #{props.stakedata.index}</h5>
                            <DataRow>
                                <strong>Stake Owner</strong><span><Address>{props.stakedata.owner}</Address></span>
                            </DataRow>
                            <DataRow>
                                <strong>Staking Provider</strong><span><Address>{props.stakedata.provider}</Address></span>
                            </DataRow>

                            <DataRow>
                                <strong>Stake Amount</strong><span><TokenBalance label="T" balance={aggregateStake}/></span>
                            </DataRow>
                            
                            {(bondedOperator && !isPending()) ? <DataRow>
                                <strong>Current Bonded Operator</strong><span><Address>{bondedOperator}</Address></span><Blue className="mr-1 hover" onClick={(e)=>{setBondedOperator(null)}}>(change) </Blue>
                            </DataRow> : <BondOperator provider={props.stakedata.provider} index={props.stakedata.index} operatorAddress={props.operatorAddress}></BondOperator>
                            }
                                
                            {bondedOperator ? <DataRow>
                                <strong>Operator is Confirmed:</strong><span>{isConfirmed ? <Blue>yes</Blue>  : '--'}</span>
                            </DataRow> : <></>}
                            {bondedOperator ? <DataRow>
                                <strong>PRE Node is Responsive:</strong><span>{nodeURI ? <span><a target="node" href={`${nodeURI}/status`}> &#x2197;</a><Blue>yes</Blue></span> : '--'}</span>
                            </DataRow> : <></>}
                        </ButtonBox>
                    </Col>
                </Row>
            </Col>
        </Row>)
}


export const StakeManager = () => {
    const context = useContext(Context)
    const { contracts, account, network } = context.wallet
    const [stakesCanBond, setStakesCanBond] = useState([])
    

    const loadEvents = async () => {


        const stake_events = await contracts.TOKENSTAKING.getPastEvents(
            'Staked', 
            {
                filter: { owner: account },
                fromBlock: network === 1 ? 14113768 : 0, 
            },
        )
        const bondable_stake_events = await contracts.TOKENSTAKING.getPastEvents(
            'Staked', {
                filter: { stakingProvider: [account, ... stake_events.map((e)=>e.returnValues.stakingProvider)] },
                fromBlock: network === 1 ? 14113768 : 0
        })

        if (!bondable_stake_events.length){
            setStakesCanBond(false)
        }

        setStakesCanBond(bondable_stake_events.map((e, index) => {
            return {
                index: index + 1,
                provider: e.returnValues.stakingProvider,
                owner: e.returnValues.owner,
                amount: e.returnValues.amount
            }
        }))       
    }

    useEffect(() => {
         setStakesCanBond([])
        loadEvents()
    }, [account, network])

    return (
        <Row>
            { stakesCanBond !== false ?
            <Col>      
                <ul className="stakechooser list-group list-group-flush">
                {(stakesCanBond || []).map((stake) => <DisplayBondingState stakedata={stake} key={stake.index} />)}
                </ul>
            </Col> : <Col>
                <h5>There are no stakes owned by the connected wallet.</h5>
                    <div className="ml-5">
                    <p>To create a new stake from liquid T visit:</p>  
                    <p><Blue><a href="https://dashboard.threshold.network/overview/network">The Threshold Dashboard</a></Blue></p>
                    or
                    <p className="mt-3">
                        <Link to="/manage/stake"><Blue>Migrate your NU stake to Threshold</Blue></Link>
                    </p>
                </div>
            </Col>}
        </Row>
    )
}


export default (props) => {

    const context = useContext(Context)
    const { account, network } = context.wallet


    useEffect(() => {
    }, [account, network])


    return (
        <Row className="d-flex justify-content-center">
            <Col xs={12} sm={8} >
            <InputBox>
                <Row className="mb-1">
                    <Col>
                        <h4>Manage Staking Providers/Operators</h4>
                        <p>Bond a Stake with an Operator Address associated with a running PRE node</p>
                        <small>Click <Blue><a target="nucypher" href="https://docs.nucypher.com/en/latest/pre_application/cloud_node_management.html">here</a></Blue> for documentation on running a node</small>
                    </Col>
                </Row>
                <StakeManager/>
            </InputBox>
            </Col>
        </Row>
    )
}
