import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/';
import { PendingButton, Slider, Grey, Blue, DataRow, CircleQ, Period } from '@project/react-app/src/components'

import { Context, ContractCaller, daysToPeriods } from '@project/react-app/src/services'

export const MergeStakes = (props) => {

    const context = useContext(Context)
    const { web3, contracts } = context.wallet

    const stake1 = props.stake1
    const stake2 = props.stake2
    const [iAmDisclaimed, setIAmDisclaimed] = useState(false)


    const handleAction = (e) => {

        ContractCaller(
            contracts.STAKINGESCROW.methods.mergeStake(stake1.id, stake2.id),
            context,
            [`substakeupdate${stake1.id}`, `substakeupdate${stake2.id}`],
            `merging substakes ${stake1.id} and ${stake2.id}`
          )

        e.preventDefault()
        if (props.setShow){
            props.setShow(false)
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <p>
                        Note: Due to a known issue with the StakingEscrow contract, merged stakes may suffer some loss of earnings for a single period.  Depending on gas prices it is probably financially preferable to just leave your stakes unmerged or wait until the issue is resolved.
                    </p>
                    <p>More at <Blue><a href="https://github.com/nucypher/nucypher/issues/2691#issuecomment-858792634" target="blank">the issue in GitHub</a></Blue></p>
                    <label> <input onChange={e => {setIAmDisclaimed(!iAmDisclaimed)}} className="ml-3" type="checkbox"></input> OK. I understand.</label>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mt-3">
                <Col className="d-flex justify-content-center">
                    <PendingButton disabled={!iAmDisclaimed} onClick={handleAction} width="100%">Merge</PendingButton>
                </Col>
            </Row>

        </Container>
    )
}