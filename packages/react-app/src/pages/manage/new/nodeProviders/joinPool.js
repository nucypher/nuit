import React from 'react'
import { Container, Row, Col, Table, Card} from 'react-bootstrap/';
import { Grey, Blue } from '../../../../components'

const POOLPROVIDERS = [
    {name:"Roma's thing he does", fee: "10%", link: "https://nucypher.com"},
    {name:"TuxPool", fee: "30%", link: "https://nucypher.com"},
    {name:"CoinList", fee: "15%", link: "https://tsm.coinlist.co/help/information-on-nucypher-nu-staking"},
]

export default () => {
    return (
        <Container>
            <Row className="d-flex justify-content-center mt-5 mb-2">
            <Col xs={10} sm={7}>
                <h5 className="d-flex justify-content-center mb-3">Join a community run staking pool</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio mi purus duis et nisi. Libero, laoreet fermentum a pretium ac. Lectus porta elit, tortor viverra libero ultrices orci. Massa, molestie turpis consequat a mauris tincidunt augue egestas quis.</p>
                <p>The following pool operators support the NuCypher Network <Grey>(alphabetical order):</Grey></p>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-2">
            <Col xs={10} sm={7}>
                <Table borderless striped className="nc-table nc-table2">
                <thead>
                    <tr>
                        <th><Grey>Pool</Grey></th>
                        <th><Grey>Fee</Grey></th>
                    </tr>
                </thead>
                <tbody>
                {POOLPROVIDERS.map((prv, index) => (
                    <tr key={index}>
                    <td><Blue className="mr-2">•</Blue><strong><a target="blank" href={prv.link}>{prv.name}</a></strong></td>
                    <td>{prv.fee}</td>
                    </tr>
                ))}
                    <tr></tr>
                </tbody>
                </Table>
            </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5 mb-2">
                <Col xs={10} sm={7}>
                    <Card>
                        <Card.Body>
                        <h4>Once you have selected a pool, follow the instructions on the pool's site. </h4>
                        <p>No additional configuration is needed.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}