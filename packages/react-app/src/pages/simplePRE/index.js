import React, {useContext, useEffect, useState} from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap/';
import { DisplayWei, ConnectPLS, InputBox, PendingButton, TokenBalance, Address, Blue, Purple, DataRow } from '@project/react-app/src/components'
import {
    useRouteMatch,
    Route,
    Switch,
  } from 'react-router-dom'
  
import BondOperator  from '@project/react-app/src/pages/simplePRE/bondOperator'
import Delegate  from '@project/react-app/src/pages/simplePRE/delegate'
import { Wrap } from '@project/react-app/src/pages/simplePRE/wrap'
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
    const [stakingT, setStakingT] = useState(false)
    const [withdrawingNU, setWithdrawingNU] = useState(false)

    const handleStakeNU = () => {
        context.modals.triggerModal({message: "Upgrade NU Stake", component: "StakeNU"})
    }

    const handleStakeT = () => {
        context.modals.triggerModal({message: "Stake T", component: "StakeT"})
    }

    const handleWithdrawNU = () => {
        context.modals.triggerModal({message: "Withdraw NU", component: "WithdrawNU"})
    }

    useEffect(() => {
        setStakingT(context.pending.indexOf('stakingT') > -1)
    })

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={10} xl={8} className="d-flex justify-content-center">
                    <Breadcrumbs paths={[
                        {path:'/manage', label: "stats", enabled: true },
                        {path:'withdraw', label: "Withdraw NU", enabled: true },
                        {path: 'stake', label: 'Stake NU', enabled: true },
                        {path: 'delegate' , label: 'Delegate Votes', enabled: true },
                        {path: 'operator', label: 'Manage Operators', enabled: true },
                    ]}/>
                </Col>
            </Row>
            {!account
                ? <Row> {<Col className="d-flex justify-content-center"><ConnectPLS/></Col>}</Row>
                :
            <Switch>
                <Route path={`${path}/wrap`}>
                    <Wrap></Wrap>
                </Route>
                <Route path={`${path}/withdraw`}>
                    <Row className="d-flex justify-content-center">
                        <Col xs={12} md={10} xl={6}>
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
                        </Col>
                    </Row>
                </Route>
                <Route path={`${path}/stake`}>
                    <Row className="d-flex justify-content-center">
                        <Col xs={12} md={10} xl={6}>
                            <InputBox>
                                <Col xs={12}>
                                    <h4>Stake NU on Threshold</h4>
                                </Col>
                                <Col xs={12}>
                                    <Row className="mb-3 flex-row align-items-center">
                                        <Col xs={12}>
                                            <div className="assetDisplay">
                                                <img src={require('../../assets/icons/nu.svg')}/>
                                                <TokenBalance balance={context.stakedNU}/>
                                                <a href={makeEtherscanAccountLink(TOKENSTAKINGAddress, networkName)}>
                                                    <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                                </a>
                                            </div>

                                            <PendingButton
                                                activeCheck={stakingNU}
                                                onClick={handleStakeNU}
                                                abort={setStakingNU}>
                                                <div className="conversionHint">
                                                    <span>Stake NU on Threshold</span>
                                                    <img className="from" src={require('../../assets/icons/nu.svg')}/>
                                                    <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                                    <img src={require('../../assets/icons/t.svg')}/>
                                                </div>
                                            </PendingButton>
                                        </Col>
                                    </Row>
                                    {networkName == 'rinkeby' ? <Row className="mb-3 flex-row align-items-center">
                                        <Col className="d-flex justify-content-center" xs={12}>OR</Col>
                                        <Col xs={12}>
                                            <div className="assetDisplay">
                                                <img src={require('../../assets/icons/t.svg')}/>
                                                <TokenBalance label="T" balance={context.availableT.get}/>
                                                <a href={makeEtherscanAccountLink(TOKENSTAKINGAddress, networkName)}>
                                                    <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                                </a>
                                            </div>
                                    
                                            <PendingButton
                                                activeCheck={stakingT}
                                                onClick={handleStakeT}
                                                abort={setStakingT}>
                                                <div className="conversionHint">
                                                    <span>Stake liquid T on {networkName}</span>
                                                    <img className="from" src={require('../../assets/icons/nu.svg')}/>
                                                    <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                                    <img src={require('../../assets/icons/t.svg')}/>
                                                </div>
                                            </PendingButton>
                                        </Col>
                                    </Row>:<></>}
                                </Col>
                            </InputBox>
                        </Col>
                    </Row>
                </Route>
                <Route path={`${path}/delegate`}>
                    <Delegate/>
                </Route>
                <Route path={`${path}/bond`}>
                    <BondOperator/>
                </Route>
                <Route path={`${path}/operator`}>
                    <BondOperator/>
                </Route>
                <Route path={`${path}`}>
                    <Row className="d-flex justify-content-center">
                        <Col xs={12} md={10} xl={6}>
                            <InputBox className="flex flex-row align-items-center">
                                <Col xs={12}>
                                    <p><strong>Staker Stats for: </strong><Address>{context.wallet.account}</Address> </p>
                                    <DataRow className="mb-3"><img src={require('../../assets/icons/nu.svg')}/></DataRow>
                                    <DataRow><span>Liquid NU</span><span><TokenBalance balance={context.availableNU.get}/></span></DataRow>
                                    <DataRow><span>Staked NU</span><span><TokenBalance balance={context.stakedNU}/></span></DataRow>
                                    <DataRow><span>Available to withdraw</span><span><TokenBalance balance={context.canWithdraw}/></span></DataRow>
                                    <DataRow><span>Liquid T</span><span><TokenBalance label="T" balance={context.availableT.get}/></span></DataRow>
                                    
                                    <DataRow className="mt-3 mb-3"><img src={require('../../assets/icons/t.svg')}/></DataRow>
                                    <DataRow><span>Migrated NU staked as T</span><span><TokenBalance label="T" balance={context.StakeInfo.nuInTStake}/></span></DataRow>
                                    <DataRow><span>Migrated KEEP staked as T</span><span><TokenBalance label="T" balance={context.StakeInfo.keepInTStake}/></span></DataRow>
                                    <DataRow><span>Liquid staked T </span><span><TokenBalance label="T" balance={context.StakeInfo.tStake}/></span></DataRow>
                                    <hr></hr>
                                    <DataRow><span>Total staked T </span><span><TokenBalance label="T" balance={context.StakeInfo.total}/></span></DataRow>
                                    <div className="mt-5">find more staking tools on the <Purple><a target="threshold" href="https://dashboard.threshold.network/overview/network"> Threshold Dashboard</a></Purple></div>
                                </Col>
                            </InputBox>
                        </Col>
                    </Row>
                </Route>
            </Switch>
        }
        </Container>
    )
}

