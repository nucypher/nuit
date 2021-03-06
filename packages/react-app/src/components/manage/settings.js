import {CircleQ} from "../circleQ";
import {InputBox, ToggleButton} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../../services";


export default function StakeSettingsPanel(props) {

    const context = useContext(Context)
    const [windingdown, setWindingdown] = useState(false)
    const [restaking, setRestaking] = useState(false)

    const handleChangeRestake = () => {
        context.modals.triggerModal({message: "Toggle Re-stake", component: "Restake"})
    }

    const handleChangeWindDown = () => {
        context.modals.triggerModal({message: "Toggle Wind Down", component: "Winddown"})
    }

    useEffect(() => {
        setWindingdown(context.pending.indexOf('winddown') > -1)
        setRestaking(context.pending.indexOf('restake') > -1)

    }, [context.pending.length, context.pending])

    return (
        <InputBox className="mt-4 mb-4">
            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Settings</h5>
                </Col>
            </Row>

            <Row noGutters>
                {props.flags ? <Col>
                    <Row className="d-flex justify-content-between">
                        <Col xs={6} xl={12} className="mb-3">
                            <div className="nowrap d-flex align-content-center">
                                <strong className="nowrap">Re-Stake</strong>
                                <CircleQ>Compound your staking returns by automatically re-staking each period's rewards.</CircleQ>
                            </div>
                            <ToggleButton abort={setRestaking}
                                          activeCheck={restaking}
                                          boolState={props.flags.reStake}
                                          onClick={handleChangeRestake}/>
                        </Col>
                        <Col xs={6} xl={12}>
                            <div className="nowrap d-flex align-content-center">
                                <strong className="nowrap">Wind Down</strong>
                                <CircleQ>Each period committed will reduce stake length by one period.</CircleQ>
                            </div>
                            <ToggleButton abort={setWindingdown}
                                          activeCheck={windingdown}
                                          boolState={props.flags.windDown}
                                          onClick={handleChangeWindDown}/>
                        </Col>
                    </Row>
                </Col> : null}
            </Row>
        </InputBox>

    )
}
