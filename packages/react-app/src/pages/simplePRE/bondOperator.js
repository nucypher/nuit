import React, { useContext, useEffect, useState } from 'react'

import { Row, Col } from 'react-bootstrap/';
import { InputBox, BondOperator, TokenBalance, DataRow, ButtonBox, Address, Blue } from '@project/react-app/src/components'

import { Context, toQuery, truncateAddress } from '@project/react-app/src/services'

export default (props) => {

    const context = useContext(Context)
    const [stakingProvider, setStakingProvider] = useState(null)
    const [bondedOperator, setBondedOperator] = useState(null)
    const [isConfirmed, setIsConfirmed] = useState(null)
    const { account, contracts, web3 } = context.wallet

    const getStakingProvider = async () => {

        const listquery = {
            address: account,
            module: "account",
            action: "txlist",
            contractaddress: contracts.TOKENSTAKING._address,
            startblock:14128949,
            sort:'desc',
            apikey: "SVINPP3Y3JM1RJKWAQ183A9JFBGBGGIICH"
        }


        const methods = ['0x81b0a0ce', '0x5961d5e9', '0x570ea461']

        const stakingEvent = await fetch(`https://api.etherscan.io/api/?${toQuery(listquery)}`);
        let data = await stakingEvent.json();
        

        if (data.result && data.result.length){
            const latestStakingEvent = data.result.find(element => {
            return methods.some(e => element.input.startsWith(e))
            })
            
            if (latestStakingEvent){
                const {stakingProvider } = web3.eth.abi.decodeLog([
                    {internalType: 'address', name: 'stakingProvider', type: 'address'},
                    {internalType: 'address payable', name: 'beneficiary', type: 'address'},
                    {internalType: 'address', name: 'authorizer', type: 'address'}
                ], `0x${latestStakingEvent.input.slice(10)}`);
                setStakingProvider(stakingProvider)
           }
        } else {
            setStakingProvider(null)
        }
    }

    const getBondingState = async () => {
        console.log(contracts.SIMPLEPREAPPLICATION.methods)
        const operator = await contracts.SIMPLEPREAPPLICATION.methods.getOperatorFromStakingProvider(stakingProvider).call()
        setBondedOperator(operator)
        if (operator) {
            const confirmed = await contracts.SIMPLEPREAPPLICATION.methods.isOperatorConfirmed(operator).call()
            setIsConfirmed(confirmed)
        }
      
    }
    

    useEffect(() => {
        if (stakingProvider){
            getBondingState()
        } else{
            setBondedOperator(null)
            setIsConfirmed(false)
        }
        
    }, [stakingProvider])

    useEffect(() => {
        getStakingProvider()
    }, [account])


    return (
        <Row className="d-flex justify-content-center">
            <Col xs={12} >
            <InputBox>
                <Row >
                    <Col>
                        <h4>Manage Staking/Operators</h4>
                        <p>Have you gotten a node running?  The last step is configuring its "Operator Address" below.</p>
                        <small>Click <Blue><a target="nucypher" href="https://interim-pre-application-docs.readthedocs.io/en/latest/">here</a></Blue> for documentation on running a node</small>
                    </Col>
                </Row>

                <Row>
                    <Col className="mb-3">
                        {bondedOperator ? <i>Note: You already have an operator bonded but you can change it here if you wish.</i> : <></>}
                        <BondOperator operatorAddress={props.operatorAddress}></BondOperator>
                    </Col>
                </Row>

                <Row className="mb-5">
                    {account ? <Col>
                    <ButtonBox>
                        <h5>status</h5>
                        <DataRow>
                            <strong>Stake Owner</strong><span><Address>{account}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Staking Balance</strong><span><TokenBalance label="T" balance={context.StakeInfo.total}/></span>
                        </DataRow>
                        <DataRow>
                            <strong>Staking Provider</strong><span><Address>{stakingProvider || '--'}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Current Bonded Operator</strong><span><Address>{bondedOperator || '--'}</Address></span>
                        </DataRow>
                        <DataRow>
                            <strong>Operator is Confirmed:</strong><span>{isConfirmed ? 'yes' : '--'}</span>
                        </DataRow>
                        </ButtonBox>
                    </Col> : <></>}
                </Row>
            </InputBox>
            </Col>
        </Row>
    )
}