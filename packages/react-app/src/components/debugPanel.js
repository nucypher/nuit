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
                {context.NUallowance ? <span>NUallowance: <DisplayWei>{context.NUallowance.get}</DisplayWei></span>: null}
                </div>
                </Col>
            </Row>
        </Container>
    )
}

