import {CircleQ} from "./circleQ";
import {Grey, InputBox, NuBalance, PendingButton} from "./index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../services";


export default function RewardsPanel(props) {

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
                    <h5>Rewards</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col>
                    <Row className="d-flex justify-content-between">
                        <Col xs={6} xl={12} className="mb-3">
                            <div className="nowrap">
                                <strong>Staking</strong>
                                <CircleQ tooltip="NU Rewards earned by committing to work for the network"/>
                            </div>
                            <PendingButton
                                small
                                activeCheck={withdrawingNU}
                                onClick={handleWithdrawNU}
                                className="mt-2 reward-button">
                                <div className="d-flex">
                                <span className="mr-2">
                                    {Number(props.availableNUWithdrawal) > 0 ? 'Withdraw ' : ''}
                                 </span>
                                    <NuBalance balance={props.availableNUWithdrawal}/>
                                </div>
                            </PendingButton>
                        </Col>
                        <Col xs={6} xl={12}>
                            <div className="nowrap">
                                <strong>Policy</strong>
                                <CircleQ tooltip="ETH rewards collected from policy fees"/>
                            </div>
                            <PendingButton className="mt-2 reward-button">
                                {Number(props.availableETHWithdrawal) > 0 ? 'Withdraw ' : ''}{props.availableETHWithdrawal}
                                <Grey> ETH</Grey>
                            </PendingButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </InputBox>)
}