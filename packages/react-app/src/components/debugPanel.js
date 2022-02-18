import React, {useContext, useEffect, useState} from "react"
import {Context} from '@project/react-app/src/services'
import {Col, Container, Row} from 'react-bootstrap/'
import { DisplayWei } from '@project/react-app/src/components'

export default function DebugPanel(props) {
    const context = useContext(Context)

    return (
        <Container>
            <Row className="justify-content-center text-center full-width">
                <Col>
                <div id="debugPanel" className="flex-row justify-content-lg-center text-center">
                            <h4>Debug</h4>
                {[
                        {val: context.availableNU, label: "liquid NU"},
                        {val: context.stakedNU, label:"staked NU"},
                        {val: context.availableT, label:"available T"}
                    ].map(kv => {
                       return kv.val.get ? <div key={kv.label}>{kv.label}: <DisplayWei>{kv.val.get}</DisplayWei></div> : <span key={kv.label}></span>
                    })
                }
                </div>
                </Col>
            </Row>
        </Container>
    )
}

