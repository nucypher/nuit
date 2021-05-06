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
                <Card className="mt-4 mb-4">
                    <Card.Body>
                        <Row>
                            <Col xs={1}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.5" cy="12" r="12" fill="#E12C2C"/>
                            <path d="M12.5 4.5C11.6925 4.5 11.0575 5.19014 11.1246 5.99482L11.6877 12.7526C11.7229 13.1751 12.0761 13.5 12.5 13.5C12.9239 13.5 13.2771 13.175 13.3123 12.7526L13.8754 5.99482C13.9425 5.19014 13.3075 4.5 12.5 4.5Z" fill="white"/>
                            <path d="M12.5 18.75C13.3284 18.75 14 18.0784 14 17.25C14 16.4216 13.3284 15.75 12.5 15.75C11.6716 15.75 11 16.4216 11 17.25C11 18.0784 11.6716 18.75 12.5 18.75Z" fill="white"/>
                            </svg>
                            </Col>
                            <Col>
                                <p>This is a community-generated list. Pools/operators have not been vetted or endorsed by the core development team. Use your judgement in selecting a pool.</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
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
                        <h4>Once you have selected a pool, follow the associated instructions.</h4>
                        <p>No additional configuration is needed.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}