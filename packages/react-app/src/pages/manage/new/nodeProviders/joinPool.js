import React from 'react'
import { Container, Row, Col, Table, Card} from 'react-bootstrap/';
import { Grey, Blue } from '../../../../components'

import POOLPROVIDERS from './pools.json'

export default () => {
    return (
        <Container>
            <Row className="d-flex justify-content-center mt-5 mb-2">
            <Col xs={10} sm={7}>
                <h5 className="d-flex justify-content-center mb-3">Join a Staking Pool</h5>
                <p>Staking pools organize independent NU holders to act as a single Staker in the NuCypher protocol.
                Participants deposit their NU into the pool and pool operators run a Worker node on
                behalf of the entire pool.</p>

                <p>Proceeds for each participant is calculated pro-rata based on their share
                of the NU deposited in the pool. Pool participants don't need to worry about running a worker node
                or the associated gas cost, but pool operators typically charge a percentage of staking rewards as a service fee.</p>

                <p>Anyone looking to deploy and run their own staking pool can do so via the <a target="blank" href="https://docs.nucypher.com/en/latest/architecture/staking_contracts.html#staking-pool-contract">NuCypher Staking Pool Contract.</a>
                </p>

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
                        <h4>Once you have selected a pool, follow the associated instructions for the pool. </h4>
                        <p>No additional configuration is needed.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}