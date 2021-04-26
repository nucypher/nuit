import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap/';

import { Grey, Blue, InputBox, Slider, PrimaryButton, NuStakeAllocator, CircleQ } from '@project/react-app/src/components'
import { calcROI } from '@project/react-app/src/constants'
import { Link } from 'react-router-dom'

export default (props) => {

    const [nuAllocated, setNuAllocation] = useState(props.amount || 15000)
    const [AllocationValid, setAllocationValid] = useState(true)
    const [duration, setDuration] = useState(props.duration || 30)

    const [roi, setRoi] = useState({apr: 0, net: 0})

    const onAmountChanged = (amount) => {

        if (amount >= 15000){
            setNuAllocation(amount)
            setAllocationValid(true)
            if (amount && duration){
                setRoi(calcROI(amount, duration))
            }
        } else{
            setNuAllocation(amount)
            setAllocationValid(false)
        }
    }

    const onDurationChanged = (duration) => {
        setDuration(duration)
        if (nuAllocated && duration){
            setRoi(calcROI(nuAllocated, duration))
        }
    }

    const handleNewStake = (e) =>{
        console.log(e)
        e.preventDefault()
        props.setStake(true)
    }

    useEffect(() => {
        if (nuAllocated && duration){
            setRoi(calcROI(nuAllocated, duration))
        }
    }, [duration, AllocationValid])

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col xs={12} >
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
                                    <Slider duration={duration} onChange={onDurationChanged} />
                                </Col>
                            </Row>
                            <Row noGutters className="d-flex justify-content-center mt-3">
                                <Col xs={6} className="d-flex justify-content-between">
                                    <h5 className="nowrap mr-3">Estimated ROI</h5>
                                    <strong className="nowrap">
                                        <Blue>
                                            {roi.apr.toFixed(2)} %
                                            <CircleQ tooltip="estimate based on duration of stake and current network participation"/>
                                        </Blue>
                                        <br/><Grey>{roi.net.toFixed(2)} NU</Grey>
                                    </strong>
                                </Col>
                            </Row>
                            <Row noGutters className="d-flex justify-content-center mt-3">
                                <Col className="d-flex justify-content-center">
                                    <PrimaryButton disabled={!AllocationValid} onClick={handleNewStake} width={100}>Create Stake</PrimaryButton>
                                </Col>
                            </Row>
                        </Form>
                    </InputBox>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs={4} className="d-flex justify-content-center biglink mt-3">
                {props.stake ? <Link to="/new/bond"><PrimaryButton>Continue</PrimaryButton></Link> : ''}
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5">
                <Col xs={12} md={8}>
                    <h4 className="d-flex justify-content-center mb-4">
                        What you need to know?
                    </h4>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non ipsum viverra ipsum est non ac dignissim diam. Euismod blandit viverra pretium est mi convallis. Eu risus, sed sit mi vulputate tortor vestibulum integer. Nam ante at quis eget volutpat dignissim lobortis. Dictum congue ipsum in dis ultricies.
Neque a pellentesque et rutrum dui diam euismod. Dictum cursus tincidunt at aliquam et vehicula. Ut pellentesque elementum interdum accumsan laoreet. Faucibus id ullamcorper eu venenatis facilisi. Suspendisse fermentum euismod tincidunt enim, arcu cursus. Fames placerat enim, elit commodo venenatis.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}