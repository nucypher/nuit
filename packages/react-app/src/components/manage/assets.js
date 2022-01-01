import {InputBox, PendingButton, TokenBalance} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {Context} from "../../services";


export default function AssetsPanel(props) {

    const context = useContext(Context)

    const [wrappingNU, setwrappingNU] = useState(false)
    const [wrappingKEEP, setwrappingKEEP] = useState(false)

    const handleWrapNU = () => {
        context.modals.triggerModal({message: "Wrap NU", component: "WrapNU"})
    }

    useEffect(() => {
        setwrappingNU(context.pending.indexOf('wrappingNU') > -1)
    }, [context.pending.length, context.pending])


    const handleWrapKEEP = () => {
        context.modals.triggerModal({message: "Wrap KEEP", component: "WrapKEEP"})
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.contract} VendingMachine on Etherscan
        </Tooltip>
    );

    useEffect(() => {
        setwrappingKEEP(context.pending.indexOf('wrappingKEEP') > -1)
    }, [context.pending.length, context.pending])


    return (
        <InputBox>

            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Assets</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col xs={12}>
                    <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <div className="assetDisplay">
                                <img src={require('../../assets/icons/nu.svg')}/>
                                <TokenBalance balance={context.availableNU.get}/>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 1200, hide: 400}}
                                    overlay={renderTooltip}
                                >
                                <a href={"https://etherscan.io/address/0x1cca7e410ee41739792ea0a24e00349dd247680e"}>
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
                            Wrap NU
                            </PendingButton>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <div className="assetDisplay">
                                <img src={require('../../assets/icons/keep.svg')}/>
                                <TokenBalance balance={context.availableKEEP.get} label="KEEP"/>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 1200, hide: 400}}
                                    overlay={renderTooltip}
                                >
                                    <a href={"https://etherscan.io/address/0xe47c80e8c23f6b4a1ae41c34837a0599d5d16bb0"}>
                                        <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                    </a>
                                </OverlayTrigger>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <PendingButton
                                        activeCheck={wrappingKEEP}
                                        onClick={handleWrapKEEP}
                                        abort={setwrappingKEEP}>
                            Wrap KEEP
                            </PendingButton>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Row>
                    <Col xs={12} sm={6}>
                            <TokenBalance balance={context.availableT.get} label="T"/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <SecondaryButton disabled="true">unwrap someday soon</SecondaryButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </InputBox>)
}