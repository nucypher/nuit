import {CircleQ} from "../circleQ";
import {Grey, InputBox, TokenBalance, PendingButton} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../../services";


export default function AssetsPanel(props) {

    const context = useContext(Context)
    const [withdrawingNU, setWithdrawingNU] = useState(false)
    const handleWithdrawNU = () => {
        context.modals.triggerModal({message: "Withdraw NU", component: "WithdrawNU"})
    }

    useEffect(() => {
            setWithdrawingNU(context.pending.indexOf('withdrawNU') > -1)
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
                <Col>
                    <TokenBalance balance={context.availableNU.get}/>
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