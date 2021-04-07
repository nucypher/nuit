import React from 'react'
import { Container, Row, Col, ListGroup, Card} from 'react-bootstrap/';
import { Grey, Blue } from '../../components'

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
                <h5 className="d-flex justify-content-center mb-3">NuCypher Node-as-a-Service Providers</h5>
                <p>You can Delegate work via one of the service providers listed below and obtain worker address to bond it with your stake.</p>
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
                                <p>This is a community-generated list. Providers have not been vetted or endorsed by the core development team. Use your judgement in selecting a provider.</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <p>The following node infrastructure providers support the NuCypher Network <Grey>(alphabetical order):</Grey></p>
                </Col>
            </Row>
            <Row noGutters className="d-flex justify-content-center mb-2 bg-color p-4">
                <Col xs={12}>
                    <Row noGutters className="d-flex justify-content-left">
                        {SERVICEPROVIDERS.map((sp, index)=>{
                             return <Col key={index} xs={6} sm={3}><Blue className="mr-2">•</Blue><a href={sp.link}>{sp.name}</a></Col>
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}