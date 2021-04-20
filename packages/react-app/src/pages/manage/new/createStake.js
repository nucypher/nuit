import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap/';

import { Grey, Blue, InputBox, Slider, PrimaryButton, NuStakeAllocator } from '@project/react-app/src/components'


export default (props) => {

    const [nuAllocated, setNuAllocation] = useState(props.amount || 0)
    const [AllocationValid, setAllocationValid] = useState(null)
    const [duration, setDuration] = useState(props.duration || 30)

    const onAmountChanged = (amount) => {
        if (amount >= 15000){
            setNuAllocation(amount)
            setAllocationValid(true)
        } else{
            setAllocationValid(false)
        }
    }


    return (
        <Container>
            <InputBox>
                <Form>
                    <Row>
                        <Col className="d-flex justify-content-center mb-4 mt-2">
                            <h1>Set Stake</h1>
                        </Col>
                    </Row>
                    <Row noGutters className="d-flex justify-content-center">
                        <Col xs={12} className="d-flex justify-content-center">
                            <NuStakeAllocator valid={AllocationValid} value={nuAllocated} onChange={onAmountChanged}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mr-4 ml-3">
                            <div className="d-flex justify-content-between">
                                <Grey>Duration</Grey>
                                <strong><Blue>{duration}</Blue> <Grey>Days</Grey></strong>
                            </div>
                            <Slider duration={duration} onChange={setDuration} />
                        </Col>
                    </Row>
                </Form>
            </InputBox>
        </Container>
    )
}