import {
    Address,
    Blue,
    ButtonBox,
    DataRow,
    EthBalance,
    Grey,
    InputBox,
    TokenBalance,
    PendingButton,
    Spinner,
    WorkerRunwayDisplay,
    DisplayWei,
} from "../index";
import Web3 from "web3";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../services";
import {Col, Row} from "react-bootstrap";
import {SubStakeList} from "./substake";

export default function StakerControlPanel(props) {

    const context = useContext(Context)
    const {account} = context.wallet

    const workerAddress = context.workerAddress.get
    const availableETH = context.availableETH.get
    const availableNU = context.availableNU.get
    const setAvailableETH = context.availableETH.set
    const setAvailableNU = context.availableNU.set

    const [bondingworker, setBondingWorker] = useState(false)
    const [addingsubstake, setAddingSubstake] = useState(false)

    const handleChangeWorker = () => {
        context.modals.triggerModal({message: "Bond Worker", component: "BondWorker"})
    }

    const handleAddSubstake = () => {
        context.modals.triggerModal({message: "Add Substake", component: "CreateStake"})
    }

    useEffect(() => {
        setBondingWorker(context.pending.indexOf('bondworker') > -1)
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
    }, [context.pending.length, context.pending])


    return (
        props.info
            ? <InputBox>
                <Row>
                    <Col className="d-flex justify-content-flex-start mb-4">
                        <h5>Running</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Grey>Worker</Grey>
                            <PendingButton small
                                           activeCheck={bondingworker}
                                           onClick={handleChangeWorker}
                                           abort={setBondingWorker}>
                                {workerAddress ? 'Change' : 'Set Worker'}
                            </PendingButton>
                        </div>
                        <ButtonBox className="mb-3 mt-1 control-box">
                            {
                                workerAddress
                                    ? <div>
                                        <strong><Address>{Web3.utils.toChecksumAddress(workerAddress)}</Address></strong>
                                        <WorkerRunwayDisplay address={workerAddress}/>
                                        <DataRow>
                                            <strong>Last Committed Period</strong>
                                            <span><strong><Blue>{props.info.nextCommittedPeriod || props.info.nextCommittedPeriod}</Blue></strong></span>
                                        </DataRow>
                                    </div>
                                    : <p> No worker associated with account</p>
                            }
                        </ButtonBox>

                        <div className="d-flex justify-content-between">
                            <Grey className="mb-3">Staker</Grey>
                        </div>
                        <ButtonBox className="mb-3 control-box">
                            <strong><Address>{Web3.utils.toChecksumAddress(account)}</Address></strong>
                            <DataRow className="mt-1">
                                <strong>ETH Balance</strong>
                                <span><EthBalance balance={availableETH} onBalance={setAvailableETH}/></span>
                            </DataRow>
                            <DataRow>
                                <strong>NU Balance <small>(wallet)</small></strong><span><TokenBalance
                                balance={availableNU} onBalance={setAvailableNU}/></span>
                            </DataRow>
                            <DataRow>
                                <strong>Total NU Locked</strong><span><TokenBalance
                                balance={props.lockedNU}/></span>
                            </DataRow>
                        </ButtonBox>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Grey>Sub-stakes</Grey>
                            <PendingButton small
                                           activeCheck={addingsubstake}
                                           onClick={handleAddSubstake}
                                           abort={setAddingSubstake}>
                                Add Sub-stake
                            </PendingButton>
                        </div>
                        {
                            props.substakes
                                ? <SubStakeList substakes={props.substakes} element={ButtonBox}/>
                                : null
                        }
                    </Col>
                </Row>
            </InputBox>
            : <InputBox><Spinner/></InputBox>
    )
}