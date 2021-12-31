import {CircleQ} from "../circleQ";
import {Grey, InputBox, TokenBalance, PendingButton} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../../services";


export default function AssetsPanel(props) {

    const context = useContext(Context)

    const [wrappingNU, setwrappingNU] = useState(false)

    const handleWrapNU = () => {
        context.modals.triggerModal({message: "Wrapp NU", component: "WrapNU"})
    }

    useEffect(() => {
        setwrappingNU(context.pending.indexOf('wrappingNU') > -1)
    }, [context.pending.length, context.pending]
)


    return (
        <InputBox>

            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Assets</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col xs={3}>
                <TokenBalance balance={context.availableNU.get}/>
                <PendingButton
                                activeCheck={wrappingNU}
                                onClick={handleWrapNU}
                                abort={setwrappingNU}>
                    Wrap NU
                </PendingButton>
                </Col>
                <Col>
                <TokenBalance balance={context.availableKEEP.get} label="KEEP"/>
                </Col>
                <Col>
                <TokenBalance balance={context.availableT.get} label="T"/>
                </Col>
            </Row>
        </InputBox>)
}