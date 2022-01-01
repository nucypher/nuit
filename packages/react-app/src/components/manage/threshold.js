import {InputBox, TokenBalance} from "../index";
import React, {useContext} from "react";
import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {Context} from "../../services";


export default function ThresholdBalance(props) {
    const context = useContext(Context)

        const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.contract} Threshold Token on Etherscan
        </Tooltip>
    );

    return (
        <InputBox>

            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Threhold Balance</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col xs={6}>
                    <Row className="d-flex flex-row align-items-center align-content-center">
                        <Col xs={12} sm={6}>
                            <div className="assetDisplay">
                                <img src={require('../../assets/icons/t.svg')}/>
                                <TokenBalance label={"T"} balance={context.availableT.get}/>
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
                    </Row>
                </Col>
            </Row>
        </InputBox>)
}