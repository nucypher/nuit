import {CircleQ} from "../circleQ";
import {Grey, InputBox, TokenBalance, PendingButton, SecondaryButton} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../../services";


export default function RatioPanel(props) {
    const context = useContext(Context)
    return (
        <InputBox>

            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Conversion Ratios</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col xs={6}>
                    <Row className="mb-2">
                        <Col xs={12}>
                            <div className="ratio small text-muted mb-2">
                                <span className="mr-1">1</span>
                                <span className="mr-1">NU</span>
                                <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                <span className="mr-1">3.259242493160745</span>
                                <span className="mr-1">T</span>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="ratio small text-muted">
                                <span className="mr-1">1</span>
                                <span className="mr-1">KEEP</span>
                                <img className="conversionArrow" src={require('../../assets/icons/image.svg')}/>
                                <span className="mr-1">4.783188631255016</span>
                                <span className="mr-1">T</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </InputBox>
    )
}