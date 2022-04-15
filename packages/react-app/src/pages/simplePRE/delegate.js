import React, { useContext, useEffect, useState } from 'react'

import { Row, Col } from 'react-bootstrap/';
import { InputBox, TokenBalance, DelegateVotes, DataRow, ButtonBox, Address, Blue } from '@project/react-app/src/components'
import { NULL_ADDRESS } from '@project/react-app/src/constants'
import { Context, toQuery } from '@project/react-app/src/services'

export default (props) => {

    const context = useContext(Context)
    const [stakingProvider, setStakingProvider] = useState(null)
    const [delegatee, setDelegatee] = useState(null)
    const [delegatedBalance, setDelegatedBalance] = useState(0);
    const { account, contracts, web3 } = context.wallet

    const getStakingProvider = async () => {

        setStakingProvider(null)
        setDelegatee(null)
        setDelegatedBalance(0)
        
        const lowerAcct = account.toLowerCase()

        const stevents = await contracts.TOKENSTAKING.getPastEvents(
            'Staked', {
                fromBlock: 0, 
        })
        
        if (stevents.length){
            const stakingEvent = stevents.reverse().find(e => {return e.returnValues.owner.toLowerCase()===lowerAcct})
            if (stakingEvent){
                setStakingProvider(stakingEvent.returnValues.stakingProvider)
            }
        }

        const delegate = await contracts.TOKENSTAKING.methods.delegates(account).call()
        if (delegate && delegate !== NULL_ADDRESS){
            setDelegatee(delegate)
            const votes = await contracts.TOKENSTAKING.methods.getVotes(delegate).call()
            setDelegatedBalance(votes)
        }
    }

    useEffect(() => {
        getStakingProvider()
    }, [account])


    return (
        <Row className="d-flex justify-content-center">
            <Col xs={12} >
            <InputBox>
                <Row className="mb-3" >
                    <Col>
                        <h4>Vote Delegation</h4>
                        <small>After you setup vote delegation, you can cast votes on proposals <Blue><a target="threshold" href="https://snapshot.org/#/threshold.eth">here</a></Blue> </small>
                    </Col>
                </Row>

                <Row>
                    <Col className="mb-3">
                        {delegatee ? <i>Note: You have already delegated your votes but you can do it again here.</i> : <></>}
                        <DelegateVotes operatorAddress={props.operatorAddress}></DelegateVotes>
                    </Col>
                </Row>

              
                <Row className="mb-5">
                    {account ? <Col>
                    <ButtonBox>
                        <h5>Delegation Status</h5>
                        <DataRow>
                            <strong>Stake Owner</strong><span><Address>{account}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Staked Amount</strong><span><TokenBalance label="T" balance={context.StakeInfo.total}/></span>
                        </DataRow>
                        <DataRow>
                            <strong>Staking Provider</strong><span><Address>{stakingProvider || '--'}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Current Delegatee</strong><span><Address>{delegatee || '--'}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Delegated Balance</strong><span><TokenBalance label="T" balance={delegatedBalance} ></TokenBalance></span>
                        </DataRow>
                        </ButtonBox>
                    </Col> : <></>}
                </Row>
            </InputBox>
            </Col>
        </Row>
    )
}