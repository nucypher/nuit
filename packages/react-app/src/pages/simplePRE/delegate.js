import React, { useContext, useEffect, useState } from 'react'

import { Row, Col } from 'react-bootstrap/';
import { InputBox, TokenBalance, DelegateVotes, DataRow, ButtonBox, Address, Blue, DataLi } from '@project/react-app/src/components'
import {Link} from 'react-router-dom'
import { NULL_ADDRESS } from '@project/react-app/src/constants'
import { Context, toQuery } from '@project/react-app/src/services'


const StakeDisplay = (props) => {

    const context = useContext(Context)

    const [delegatee, setDelegatee] = useState(null)
    const [delegatedBalance, setDelegatedBalance] = useState(0);
    const { account, contracts, web3 } = context.wallet

    const pendingKey = `delegatevotes-${props.stakedata.index}`

    const isPending = () => {
        return context.pending.indexOf(pendingKey) > -1
    }


    const getCurrentDelegatee = async () => {
        const delegate = await contracts.TOKENSTAKING.methods.delegates(props.stakedata.provider).call()
        if (delegate && delegate !== NULL_ADDRESS){
            setDelegatee(delegate)
            const votes = await contracts.TOKENSTAKING.methods.getVotes(delegate).call()
            setDelegatedBalance(votes)
        }
    }

    useEffect(() => {
        getCurrentDelegatee()
    }, [context.pending])


    return (
        <Row className="mb-2">
            <Col>
            <ButtonBox>
                <h5>Stake #{props.stakedata.index}</h5>
                <DataRow>
                    <strong>Staking Provider</strong><span><Address>{props.stakedata.provider || '--'}</Address></span>
                </DataRow>

                <DataRow>
                    <strong>Stake Amount</strong><span><TokenBalance label="T" balance={props.stakedata.amount}/></span>
                </DataRow>
                {(delegatee && !isPending()) ? <DataRow>
                    <strong>Current Delegatee</strong><span><Blue className="mr-1 hover" onClick={(e)=>{setDelegatee(null)}}>(change) </Blue> <Address>{delegatee}</Address></span>
                </DataRow> : <DelegateVotes stakingprovider={props.stakedata.provider} index={props.stakedata.index}></DelegateVotes>
                }
                </ButtonBox>
            </Col>
        </Row>
    )
}

export const StakeManager = (props) => {

    useEffect(() => {
    }, [props.stakes])

    return (
        <Row>
            { props.stakes.length ?
            <Col>
                
                <ul className="stakechooser list-group list-group-flush">
                {props.stakes.map((stake) => <StakeDisplay stakedata={stake} key={stake.index} />)}
                </ul>
            </Col> : <Col>
                <h5>There are no stakes owned by the connected wallet.</h5>
                    <div className="ml-5">
                    <p>To create a new stake from liquid T visit:  
                    <p><Blue><a href="https://dashboard.threshold.network/overview/network">The Threshold Dashboard</a></Blue></p></p>
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
    const { account, contracts, web3 } = context.wallet
    const [stakingProvider, setStakingProvider] = useState(null)

    useEffect(() => {
    }, [context.stakes.get, account])


    return (
        <Row className="d-flex justify-content-center">
            <Col xs={12} >
            <InputBox>
                <Row className="mb-1" >
                    <Col>
                        <h4>Vote Delegation</h4>
                    </Col>
                </Row>


                {context.stakes.get ? <StakeManager stakes={context.stakes.get}></StakeManager>:<div>loading stakes...</div>}

            </InputBox>
            </Col>
        </Row>
    )
}