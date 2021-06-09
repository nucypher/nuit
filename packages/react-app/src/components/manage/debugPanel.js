import React, {useContext, useEffect, useState} from "react"
import {Context} from '@project/react-app/src/services'
import {Col, Container, Row} from 'react-bootstrap/'
import { DisplayWei } from '@project/react-app/src/components'

export default function DebugPanel(props) {
    const context = useContext(Context)

    return (
        <Row className="justify-content-center text-center full-width">
            <Col>
            {context.NUallowance ? <span>NUallowance: <DisplayWei>{context.NUallowance.get}</DisplayWei></span>: null}
            </Col>
        </Row>
    )
}

