import React, {useContext, useState} from 'react'

import {Context} from '@project/react-app/src/services'

import {Col, Container, Row} from 'react-bootstrap/';
import {ConnectPLS} from '@project/react-app/src/components'
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import AssetsPanel from "../components/manage/assets";
import Accordion from "react-bootstrap/Accordion";
import FAQ_QUESTIONS from "./manage/new/wrapping_faq.json";
import {Card} from "react-bootstrap";
import ThresholdBalance from "../components/manage/threshold";
import RatioPanel from "../components/manage/ratio";

export function Wrap(props) {

    const context = useContext(Context)
    const {account} = context.wallet

    const [migrating, setMigrating] = useState(false)

    return (

        <Container fluid>
            <Row>
                <Breadcrumbs paths={[
                    {path: '/', label: 'Home', enabled: true},
                    {path: '/wrap', label: 'Wrap', enabled: true},
                ]}/>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Upgrade NU/KEEP</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <p>
                        The NU / KEEP Vending Machine smart contracts to convert NU / KEEP to T
                        using a fixed conversion ratio will be available indefinitely.
                        Only liquid NU / KEEP tokens can be wrapped to T.
                        <br/><br/>
                        Locked NU / KEEP <b>cannot</b> be wrapped to T until their stakes unlock. There
                        is no time pressure or disadvantage in waiting to upgrade T.
                    </p>
                </Col>
            </Row>
            {!account
                ? <Row> {<Col className="d-flex justify-content-center"><ConnectPLS/></Col>}</Row>
                : <Row className="d-flex justify-content-center">

                    {/* Above */}
                    <Col xs={12}>
                    </Col>

                    { /* Left Side */}
                    <Col xs={12} md={10} xl={6}>
                        <AssetsPanel/>
                        <br/>
                    </Col>

                    {/* Right Side */}
                    <Col xs={12} md={10} xl={4}>
                        <ThresholdBalance/>
                        <br/>
                        <RatioPanel/>
                        {/* <StakerControlPanel {...stakerData}/> */}
                    </Col>

                    {/* Below */}
                    <Col xs={12}>
                        <div id="historyLabel" className="flex-row justify-content-lg-center text-center">
                            <h4>Token Upgrade FAQs</h4>
                        </div>
                        <Accordion id="self-hosted-accordian">
                        {FAQ_QUESTIONS.map((faq, index) => (
                            <Card key={`faq${index}`}>
                                <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                                    <b>{faq.question}</b><i className={true ? "faq-plus":"faq-minus"}></i>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index.toString()}>
                                    <Card.Body><p>{faq.answer}</p></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                        </Accordion>

                        {/*<div id="historyLabel" className="flex-row justify-content-lg-center text-center">*/}
                        {/*    <h4>History</h4>*/}
                        {/*</div>*/}
                        {/*<HistoryPane theme={props.theme}/>*/}

                    </Col>
                </Row>
            }
        </Container>
    )
}
