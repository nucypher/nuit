import {InputBox, PendingButton, TokenBalance} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {Context} from "../../services";
import {makeEtherscanAccountLink, PUBLIC_CHAINS} from "../../constants";


export default function AssetsPanel(props) {

    const context = useContext(Context)

    const [wrappingNU, setwrappingNU] = useState(false)
    const [wrappingKEEP, setwrappingKEEP] = useState(false)

    const handleWrapNU = () => {
        context.modals.triggerModal({message: "NU to T Upgrade", component: "WrapNU"})
    }

    useEffect(() => {
        setwrappingNU(context.pending.indexOf('wrappingNU') > -1)
    }, [context.pending.length, context.pending])


    const handleWrapKEEP = () => {
        context.modals.triggerModal({message: "KEEP to T Upgrade", component: "WrapKEEP"})
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.contract} VendingMachine on Etherscan
        </Tooltip>
    );

    useEffect(() => {
        setwrappingKEEP(context.pending.indexOf('wrappingKEEP') > -1)
    }, [context.pending.length, context.pending])

    const {account, provider, contracts} = context.wallet
    let chainId, networkName;
    if (provider && provider.networkVersion) {
        chainId = provider.networkVersion
        networkName = PUBLIC_CHAINS[chainId].toLowerCase();
    }
    return (
        <InputBox>

            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Vending Machines</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col xs={12}>
                    <Row className="mb-3 flex-row align-items-center">
                        <Col xs={12} sm={6}>
                            <div className="assetDisplay">
                                <img src={require('../../assets/icons/nu.svg')}/>
                                <TokenBalance balance={context.availableNU.get}/>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 1200, hide: 400}}
                                    overlay={renderTooltip}
                                >
                                    <a href={makeEtherscanAccountLink(contracts.NUVENDINGMACHINE._address, networkName)}>
                                    <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                </a>
                                </OverlayTrigger>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <PendingButton
                                activeCheck={wrappingNU}
                                onClick={handleWrapNU}
                                abort={setwrappingNU}>
                                <div className="conversionHint">
                                    <span>Upgrade</span>
                                    <img src={require('../../assets/icons/nu.svg')}/>
                                    <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                    <img src={require('../../assets/icons/t.svg')}/>
                                </div>
                            </PendingButton>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Row className="mb-3 flex-row align-items-center">
                        <Col xs={12} sm={6}>
                            <div className="assetDisplay">
                                <img src={require('../../assets/icons/keep.svg')}/>
                                <TokenBalance balance={context.availableKEEP.get} label="KEEP"/>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 1200, hide: 400}}
                                    overlay={renderTooltip}
                                >
                                    <a href={makeEtherscanAccountLink(contracts.KEEPVENDINGMACHINE._address, networkName)}>
                                        <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                    </a>
                                </OverlayTrigger>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <PendingButton
                                id="keep-button"
                                activeCheck={wrappingKEEP}
                                onClick={handleWrapKEEP}
                                abort={setwrappingKEEP}>
                                <div className="conversionHint">
                                    <span>Upgrade</span>
                                    <img src={require('../../assets/icons/keep.svg')}/>
                                    <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                    <img src={require('../../assets/icons/t.svg')}/>
                                </div>
                            </PendingButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </InputBox>)
}