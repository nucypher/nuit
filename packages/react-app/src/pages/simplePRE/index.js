import React, {useContext, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap/';
import { DisplayWei, ConnectPLS, InputBox, PendingButton, TokenBalance } from '@project/react-app/src/components'
import {
    useRouteMatch,
    Route,
    Switch,
  } from 'react-router-dom'

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
    if (provider && contracts){
        TOKENSTAKINGAddress = context.wallet.contracts.TOKENSTAKING._address
        chainId = parseInt(provider.chainId)
        networkName = PUBLIC_CHAINS[chainId].toLowerCase()
    }

    const [stakingNU, setStakingNU] = useState(false)

    const handleStakeNU = () => {
        context.modals.triggerModal({message: "Upgrade NU Stake", component: "StakeNU"})
    }

    return (
        <Container fluid>
            <Row>
                <Breadcrumbs paths={[
                    {path:'/', label: 'Home', enabled: true },
                    {path: 'upgrade-stake', label: 'Upgrade legacy NU Stake', enabled: true },
                    {path: 'bond', label: 'Bond an operator to a stake', enabled: true }
                ]}/>
            </Row>
            {!account
                ? <Row> {<Col className="d-flex justify-content-center"><ConnectPLS/></Col>}</Row>
                :
            <Switch>
                <Route path={`simplepre`}>
                    <div>hi.</div>
                </Route>
                <Route path={`${path}/upgrade-stake`}>
                    <InputBox>
                    <Col xs={12}>
                        <Row className="mb-3 flex-row align-items-center">
                            <Col xs={12} sm={6}>
                                <div className="assetDisplay">
                                    <img src={require('../../assets/icons/nu.svg')}/>
                                    <TokenBalance balance={context.stakedNU.get}/>
                                    <a href={makeEtherscanAccountLink(TOKENSTAKINGAddress, networkName)}>
                                        <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                    </a>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
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
                    <div>bond</div>
                </Route>
            </Switch>
        }
        </Container>
    )
}

