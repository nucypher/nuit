import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { Grey, Blue, InputBox, ButtonBox, PrimaryButton, CircleQ, WorkerRunwayDisplay, DataRow, SecondaryButton, EthBalance, NuBalance} from '@project/react-app/src/components'
import useWeb3Modal from '../hooks/useWeb3Modal'

export function Manage() {

    const [availableNU, setAvailableNU] = useState(0);
    const [availableETH, setAvailableETH] = useState(0);

    const [availableNuRewards, setAvailableNuRewards] = useState(0);
    const [availableEthRewards, setAvailableEthRewards] = useState(0);

    const [workerAddress, setWorkerAddress] = useState(null);
    const [stakerAddress, setStakerAddress] = useState(null);

    const [stakerData, setStakerData] = useState({substakes:[]});

    const [provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts] = useWeb3Modal()

    useEffect(() => {
        const getStakerData = async () => {
            const stakerInfo = await contracts.STAKINGESCROW.methods.stakerInfo(account).call()
            stakerInfo.lockedTokens = await contracts.STAKINGESCROW.methods.getLockedTokens(account, 0).call();
            const flags = await contracts.STAKINGESCROW.methods.getFlags(account).call()
            const getSubStakesLength = await contracts.STAKINGESCROW.methods.getSubStakesLength(account).call()
            const policyInfo = await contracts.POLICYMANAGER.methods.nodes(stakerInfo.worker).call();

            let lockedNU = 0.0;
            // getting an array with all substakes
            const substakes = await (async () => {
                if (getSubStakesLength !== '0') {
                    let substakeList = [];
                    for (let i = 0; i < getSubStakesLength; i++) {
                    let rawList = await contracts.STAKINGESCROW.methods.getSubStakeInfo(account, i).call();
                    rawList.id = i.toString();
                    rawList.lastPeriod = await contracts.STAKINGESCROW.methods.getLastPeriodOfSubStake(account, i).call();
                    if (parseInt(rawList.lastPeriod) > 1){
                        substakeList.push(rawList);
                    }

                    lockedNU += parseInt(rawList.unlockingDuration) > 0 ? parseInt(rawList.lockedValue) : 0

                    }
                    return substakeList;
                } else {
                    let substakeList = null;
                    return substakeList;
                }
            })();
            setStakerData({
                info: stakerInfo,
                flags,
                substakes,
                lockedNU,
                policyInfo,
                availableNUWithdrawal: (new web3.utils.BN(stakerInfo.value)).sub(new web3.utils.BN(stakerInfo.lockedTokens)).toString(),
                availableETHWithdrawal: policyInfo[3]
            })
            setWorkerAddress(stakerInfo.worker)
        }
        if (contracts && account){
            getStakerData()
        }
    }, [account])
    console.log(stakerData)
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Manage Staked Nu</h1>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={12} >
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Rewards</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-flex justify-content-around">
                                <Col>
                                <strong>Staking</strong>
                                <CircleQ tooltip="NU Rewards earned by committing to work for the network"/>
                                <PrimaryButton className="mt-2" width="100"><small>Withdraw</small>  <NuBalance balance={stakerData.availableNUWithdrawal}/></PrimaryButton>
                                </Col>

                                <Col>
                                <strong>Policy</strong>
                                <CircleQ tooltip="ETH rewards collected from policy fees"/>
                                <PrimaryButton className="mt-2" width="100"><small>Withdraw</small> {stakerData.availableETHWithdrawal} <Grey>ETH</Grey></PrimaryButton>
                                </Col>
                            </Col>
                        </Row>
                    </InputBox>

                    <InputBox className="mt-5">
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Running</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <div className="d-flex justify-content-between">
                                <Grey>Worker</Grey>
                                <PrimaryButton small>{workerAddress ? 'Change' : 'Set Worker'}</PrimaryButton>
                                </div>
                               <ButtonBox className="mb-3 mt-1">
                                   { workerAddress ?
                                   <div>
                                    <strong>{workerAddress || account}</strong>
                                    <WorkerRunwayDisplay address={workerAddress}/>
                                    <DataRow>
                                        <strong>Last Committed Period</strong><span><Blue>{stakerData.info.currentCommittedPeriod}</Blue></span>
                                        </DataRow>
                                    </div> : <p> no worker associated with account</p>}
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3">
                                   <strong>{stakerAddress || account}</strong>
                                   <DataRow className="mt-3">
                                       <strong>ETH balance</strong><span><EthBalance balance={availableETH} onBalance={setAvailableETH}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>NU balance</strong><span><NuBalance balance={availableNU} onBalance={setAvailableNU}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>Total NU Locked</strong><span><NuBalance balance={stakerData.lockedNU}/></span>
                                    </DataRow>
                               </ButtonBox>
                               <div className="d-flex justify-content-between">
                                <Grey>Substakes</Grey>
                                <PrimaryButton small>Add Substake</PrimaryButton>
                                </div>
                               <ButtonBox className="mt-1">
                               {stakerData.substakes.length ?
                                    stakerData.substakes.map((st, index)=>{
                                        return(
                                        <div className="mt-3" key={index}>
                                            <DataRow>
                                                <strong>start: {st.firstPeriod}</strong>
                                                <strong>end: {st.lastPeriod}</strong>
                                                <span><NuBalance balance={st.lockedValue}/></span>
                                            </DataRow>
                                            <div className="d-flex justify-content-center">
                                            {parseInt(st.unlockingDuration) ? <div className="flex justify-content-around">
                                                <SecondaryButton className="mr-3" small>Prolong</SecondaryButton>
                                                <SecondaryButton className="mr-3" small>Divide</SecondaryButton>
                                            </div> : <Grey>unlocked</Grey>}
                                            </div>
                                        </div>
                                        )
                                    }) : null
                                }
                               </ButtonBox>
                            </Col>
                        </Row>
                    </InputBox>
                    <InputBox className="mt-5">
                        <Row>
                            <Col className="d-flex justify-content-center mb-4">
                                <h5>Settings</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-flex justify-content-around">
                                <Col>
                                <strong>Re-Stake</strong>
                                <CircleQ tooltip="Compound your stake by adding rewards back into it each period."/>
                                <PrimaryButton className="mt-2" width="100">On</PrimaryButton>
                                </Col>

                                <Col>
                                <strong>Wind Down</strong>
                                <CircleQ tooltip="Each period commited will reduce stake length."/>
                                <SecondaryButton className="mt-2" width="100">Off</SecondaryButton>
                                </Col>
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
            </Row>
        </Container>
    )
}