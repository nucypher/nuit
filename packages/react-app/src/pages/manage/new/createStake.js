import React, { useContext } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap/';

import { Context } from '@project/react-app/src/services'

import { InputBox, PrimaryButton, CreateStake } from '@project/react-app/src/components'
import { Link } from 'react-router-dom'


export default (props) => {

    const context = useContext(Context)
    const stakerData = context.stakerData

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col xs={12} >
                    <InputBox>
                        <Form>
                            <CreateStake {...props} />
                        </Form>
                    </InputBox>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs={4} className="d-flex justify-content-center biglink mt-3">
                {stakerData.lockedNU ? <Link to="/new/bond"><PrimaryButton>Continue</PrimaryButton></Link> : ''}
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