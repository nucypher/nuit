import {CircleQ} from "../circleQ";
import {Grey, InputBox, TokenBalance, PendingButton} from "../index";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Context} from "../../services";


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
                            <div className="nowrap d-flex align-content-center">
                                <strong>Staking</strong>
                                <CircleQ>NU Rewards earned by committing to work for the network</CircleQ>
                            </div>
                            <PendingButton
                                small
                                activeCheck={withdrawingNU}
                                onClick={handleWithdrawNU}
                                className="mt-2 reward-button">
                                <div className="d-flex">
                                <span className="mr-2">
                                    {Number(props.availableNUWithdrawal) > 0 ? 'Withdraw ' : ' '}
                                 </span>
                                    <TokenBalance balance={props.availableNUWithdrawal}/>
                                </div>
                            </PendingButton>
                        </Col>
                        <Col xs={6} xl={12}>
                            <div className="nowrap d-flex align-content-center">
                                <strong>Policy</strong>
                                <CircleQ>ETH rewards collected from policy fees</CircleQ>
                            </div>
                            <PendingButton className="mt-2 reward-button">
                                {Number(props.availableETHWithdrawal) > 0 ? 'Withdraw ' : ' '}{props.availableETHWithdrawal || "0"}
                                &nbsp;<Grey> ETH</Grey>
                            </PendingButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </InputBox>)
}