import React, { useContext, useState, useEffect } from 'react'
import Web3 from "web3";

import { Container, Row, Col } from 'react-bootstrap/';
import { TypeOver, DataRow, Period, PendingButton, Slider, Grey, Blue, Purple, NuStakeAllocator, CircleQ, ConnectPLS, DisplayWei } from '@project/react-app/src/components'

import { Context, ContractCaller, setKEEPAllowance } from '@project/react-app/src/services'
import { calcTReturn, MIN_STAKE, daysPerPeriod, getCurrentPeriod, formatWei, formatNumber } from '@project/react-app/src/constants'


export const WatchVideo = (props) => {

    return(
        <Container>
            <Row noGutters className="d-flex justify-content-center">
                <Col xs={12} className="d-flex justify-content-center">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/FJOnWai4UzE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
               </Col>
            </Row>
        </Container>
    )
}