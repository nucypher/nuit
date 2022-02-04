import React, {useContext, useState} from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap/';
import { DisplayWei, ConnectPLS, InputBox, PendingButton, TokenBalance, Address, Blue, DataRow } from '@project/react-app/src/components'
import {
    useRouteMatch,
    Route,
    Switch,
  } from 'react-router-dom'
import BondOperator  from '@project/react-app/src/pages/simplePRE/bondOperator'
import CreateStake  from '@project/react-app/src/pages/simplePRE/createStake'
import { Context } from '@project/react-app/src/services'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {makeEtherscanAccountLink, PUBLIC_CHAINS} from "../../constants";

export function SimplePRE() {
    let { path } = useRouteMatch();
    const context = useContext(Context)
    const {account} = context.wallet
    const stakerData = context.stakerData

    let chainId, networkName, TOKENSTAKINGAddress;
    const {provider, contracts} = context.wallet
    if (provider && contracts && context.wallet.contracts.TOKENSTAKING){
        TOKENSTAKINGAddress = context.wallet.contracts.TOKENSTAKING._address
        chainId = parseInt(provider.chainId)
        networkName = PUBLIC_CHAINS[chainId].toLowerCase()
    }

    const [stakingNU, setStakingNU] = useState(false)
    const [withdrawingNU, setWithdrawingNU] = useState(false)

    const handleStakeNU = () => {
        context.modals.triggerModal({message: "Upgrade NU Stake", component: "StakeNU"})
    }

    const handleWithdrawNU = () => {
        context.modals.triggerModal({message: "Withdraw NU", component: "WithdrawNU"})
    }

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center">
                <Col xs={6}>
                <Breadcrumbs paths={[
                    {path:'/manage', label: "root", enabled: true },
                    {path:'withdraw', label: "withdraw", enabled: true },
                    {path: 'migrate', label: 'migrate', enabled: true },
                    {path: 'bond', label: 'bond', enabled: true }
                ]}/>
                </Col>
            </Row>
            {!account
                ? <Row> {<Col className="d-flex justify-content-center"><ConnectPLS/></Col>}</Row>
                :
            <Switch>
                <Route path={`${path}/withdraw`}>
                <InputBox>
                        <Col xs={12}>
                            <h4>Withdraw vested NU</h4>
                        </Col>
                        <Col xs={12}>
                            <Row className="mb-3 flex-row align-items-center">
                                <Col xs={12} md={6}>
                                    <div className="assetDisplay">
                                        <img src={require('../../assets/icons/nu.svg')}/>
                                        <TokenBalance balance={context.canWithdraw}/>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <PendingButton
                                        activeCheck={withdrawingNU}
                                        onClick={handleWithdrawNU}
                                        abort={setWithdrawingNU}>
                                        <div className="conversionHint">
                                            <span>Withdraw NU</span>
                                            <img className="from" src={require('../../assets/icons/nu.svg')}/>
                                        </div>
                                    </PendingButton>
                                </Col>
                            </Row>
                        </Col>
                    </InputBox>
                </Route>
                <Route path={`${path}/migrate`}>
                    <InputBox>
                        <Col xs={12}>
                            <h4>Stake NU on Threshold</h4>
                        </Col>
                        <Col xs={12}>
                            <Row className="mb-3 flex-row align-items-center">
                                <Col xs={12} md={6}>
                                    <div className="assetDisplay">
                                        <img src={require('../../assets/icons/nu.svg')}/>
                                        <TokenBalance balance={context.stakedNU}/>
                                        <a href={makeEtherscanAccountLink(TOKENSTAKINGAddress, networkName)}>
                                            <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                        </a>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <PendingButton
                                        activeCheck={stakingNU}
                                        onClick={handleStakeNU}
                                        abort={setStakingNU}>
                                        <div className="conversionHint">
                                            <span>Upgrade Stake</span>
                                            <img className="from" src={require('../../assets/icons/nu.svg')}/>
                                            <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                            <img src={require('../../assets/icons/t.svg')}/>
                                        </div>
                                    </PendingButton>
                                </Col>
                            </Row>
                        </Col>
                    </InputBox>
                </Route>
                <Route path={`${path}/bond`}>
                    <BondOperator/>
                </Route>
                <Route path={`${path}`}>
                    <Container>
                    <Row>
                        <Col xs={12} >
                            <InputBox className="flex flex-row align-items-center">
                                <Col xs={12} md={8}>
                                    <p><strong>Staker Stats for:</strong><a target="etherscan" href={makeEtherscanAccountLink(context.wallet.account)}><Blue><Address>{context.wallet.account}</Address></Blue></a> </p>
                                    <DataRow className="mb-3"><img src={require('../../assets/icons/nu.svg')}/></DataRow>
                                    <DataRow><span>Liquid NU</span><span><TokenBalance balance={context.availableNU.get}/></span></DataRow>
                                    <DataRow><span>Staked NU</span><span><TokenBalance balance={context.stakedNU}/></span></DataRow>
                                    <DataRow><span>Available to withdraw</span><span><TokenBalance balance={context.canWithdraw}/></span></DataRow>
                                    <hr></hr>
                                    <DataRow className="mb-3"><img src={require('../../assets/icons/t.svg')}/></DataRow>
                                    <DataRow><span>Liquid T</span><span><TokenBalance label="T" balance={context.availableT.get}/></span></DataRow>
                                    <DataRow><span>Staked T</span><span><TokenBalance label="T" balance={context.stakedT}/></span></DataRow>
                                </Col>
                            </InputBox>
                        </Col>
                    </Row>
                    </Container>
                </Route>
            </Switch>
        }
        </Container>
    )
}

