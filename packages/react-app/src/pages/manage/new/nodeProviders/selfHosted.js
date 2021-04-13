import React from 'react'
import { Container, Row, Col, Form, Card, Badge} from 'react-bootstrap/';
import { Grey, Blue, InputBox, WorkerETHAddressField, PrimaryButton } from '../../../../components'
import { Link } from 'react-router-dom'

const SERVICEPROVIDERS = [
    {name: "Ankr", link: "https://ankr.com"},
    {name: "BisonTrails", link: "https://bisontrails.com"},
    {name: "CoinList", link: "https://coinlist.com"},
    {name: "Ankr", link: "https://ankr.com"},
    {name: "BisonTrails", link: "https://bisontrails.com"},
    {name: "CoinList", link: "https://coinlist.com"},
    {name: "Ankr", link: "https://ankr.com"},
    {name: "BisonTrails", link: "https://bisontrails.com"},
    {name: "CoinList", link: "https://coinlist.com"},
    {name: "Ankr", link: "https://ankr.com"},
    {name: "BisonTrails", link: "https://bisontrails.com"},
    {name: "CoinList", link: "https://coinlist.com"},
    {name: "Ankr", link: "https://ankr.com"},
    {name: "BisonTrails", link: "https://bisontrails.com"},
    {name: "CoinList", link: "https://coinlist.com"},
]

export default (props) => {
    return (
        <Container>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={10} sm={7}>
                    <h5 className="d-flex justify-content-center mb-3">Running a Self Hosted Worker</h5>
                    <p>The Worker is the bonded delegate of a Staker and an active network node. Each staking account or “Staker” is bonded to exactly one Worker. Workers must remain online to provide uninterrupted re-encryption services to network users on-demand and perform periodic automated transactions to signal continued commitment to availability.</p>
                    <h4>Cost of Running</h4>
                    <Card className="mt-4 mb-4">
                        <Card.Body>
                            <p>Periodic automated commitments are required to signal continued availability.  Currently, Worker nodes must perform one commitment transaction every 7 days each costing ~200k gas. Average cost for last 30 days: </p>
                            <h3><Badge variant="secondary">.1ETH / Month</Badge></h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={10} sm={7}>
                    <p>Follow one of the many tutorials to assist you in setting up your worker. You will need the wallet address of the Ursula's worker to proceed.</p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={12} className="d-flex justify-content-center">
                    <h4>Enter Worker Address to Proceed</h4>
                </Col>
                <Col xs={12} className="d-flex justify-content-center">
                    <InputBox>
                        <Form.Group>
                            <WorkerETHAddressField
                                label="Worker Address"
                                value={props.workerAddress}
                                onChange={props.setWorkerAddress}
                                description="The worker address generated by your chosen provider."
                            />
                        </Form.Group>
                    </InputBox>
                </Col>
                <Col xs={12} className="d-flex justify-content-center">
                {props.workerAddress ? <Link to="/new/set-stake"><PrimaryButton>Continue</PrimaryButton></Link> : ''}
                </Col>
            </Row>
        </Container>
    )
}