import {InputBox, Period} from "./index";
import {getCurrentPeriod} from "../constants";
import React, {useContext} from "react";
import {Context, periodsToDays} from "../services";
import {Col, Row} from "react-bootstrap";

export default function CurrentPeriodPanel() {
    const context = useContext(Context)

    let currentPeriod = getCurrentPeriod();
    let nextPeriod = currentPeriod + 1
    let timeRemaining = periodsToDays()

    return (
    <InputBox id="current-period" className="mb-2">
        <Row noGutters>
            <Col className="d-flex justify-content-flex-start">
                <h5>Current Period <Period>{currentPeriod}</Period></h5>
            </Col>
        </Row>
        <Row noGutters>
            <Col className="d-flex justify-content-flex-start">
                <span>Next Period in <Period>{nextPeriod}</Period></span>
            </Col>
        </Row>
    </InputBox>
    )
}
