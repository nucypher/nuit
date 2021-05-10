import {CircleQ, InputBox} from "../index";
import {getCurrentPeriod, periodToEpoch} from "../../constants";
import React, {useContext} from "react";
import {Context} from "../../services";
import {Col, Row} from "react-bootstrap";

export default function CurrentPeriodPanel() {

    const context = useContext(Context)
    const currentPeriodNumber = getCurrentPeriod();
    const nextPeriodNumber = currentPeriodNumber + 1
    const nextPeriodEpoch = periodToEpoch(nextPeriodNumber)
    const delta = new Date(nextPeriodEpoch).getTime() - new Date().getTime()

    const daysRemaining = (Math.floor(delta / 1000 / 60 / 60 / 24))
    const hoursRemaining = (Math.floor(delta / 1000 / 60 / 60) % 24)
    const minRemaining = (Math.floor(delta / 1000 / 60)) % 60

    const tooltipMessage = "The current network service period changes every Thursday at UTC midnight"

    return (
        <InputBox id="current-period" className="mb-4">
            <Row noGutters>
                <Col className="d-flex justify-content-flex-start">
                    <h5 className="d-flex align-content-center">
                        <span>Current Period #{currentPeriodNumber}</span>
                        <CircleQ>{tooltipMessage}</CircleQ>
                    </h5>
                </Col>
            </Row>
            <Row noGutters>
                <Col className="d-flex justify-content-flex-start">
                    <span>
                        Next Period in
                        <span id="remaining-time">
                            {daysRemaining
                                ? daysRemaining + " Day" + ((Number(daysRemaining)>1)?'s ':' ')
                                : ''}
                            {hoursRemaining
                                ? hoursRemaining + ' Hour' + ((Number(hoursRemaining)>1)?'s ':' ')
                                : minRemaining + ' Minutes'
                            }
                        </span>
                    </span>
                </Col>
            </Row>
        </InputBox>
    )
}
