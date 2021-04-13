import React from 'react'
import { Container, Row, Col, ListGroup, Card, Badge} from 'react-bootstrap/';
import { Grey, Blue } from '../../../../components'

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

export default () => {
    return (
        <Container>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={10} sm={7}>
                    <h5 className="d-flex justify-content-center mb-3">Running a Self Hosted Worker</h5>
                    <p>The Worker is the bonded delegate of a Staker and an active network node. Each staking account or “Staker” is bonded to exactly one Worker. Workers must remain online to provide uninterrupted re-encryption services to network users on-demand and perform periodic automated transactions to signal continued commitment to availability.</p>
                    <Card className="mt-4 mb-4">
                        <Card.Body>
                            <p>Periodic automated commitments are required to signal continued availability.  Currently, Worker nodes must perform one commitment transaction every 7 days each costing ~200k gas. Average cost for last 30 days: </p>
                            <h3><Badge variant="secondary">.1ETH / Month</Badge></h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}