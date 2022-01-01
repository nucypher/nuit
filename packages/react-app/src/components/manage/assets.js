import {CircleQ} from "../circleQ";
import {Grey, InputBox, TokenBalance, PendingButton, SecondaryButton} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
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
                        <TokenBalance balance={context.availableNU.get}/>
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
                        <TokenBalance label="KEEP" balance={context.availableKEEP.get}/>
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
                            <SecondaryButton disabled="true">Unwrap (someday soon)</SecondaryButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </InputBox>)
}