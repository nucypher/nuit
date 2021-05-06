import React from 'react'
import {Col, Container, Row} from 'react-bootstrap/';
import {NCLogo} from "./index";

export default function () {
    return (
            <Row className="footer">
                <Col xs={3} id="footer-logo">
                <NCLogo/>
                <span id="copyright-year">2021</span>
                </Col>
                <Col xs={6} md={3}>
                    <span>Community</span>
                    <ul className="d-flex flex-column justify-content-around">
                        <li><a target="_blank" href='https://discord.gg/7rmXa3S'>Chat</a></li>
                        <li><a target="_blank" href='https://dao.nucypher.com/'>DAO Forum</a></li>
                        <li><a target="_blank" href='https://github.com/nucypher/'>Github</a></li>
                    </ul>
                </Col>
                <Col xs={6} md={3}>
                    <span>Resources</span>
                    <ul>
                        <li><a target="_blank" href='https://blog.nucypher.com/'>Blog</a></li>
                        <li><a target="_blank"
                               href='https://www.youtube.com/channel/UC-BQfqCN2_Icg_0MGAvCd9w/videos'>Videos</a></li>
                        <li><a href='https://www.nucypher.com/newsletter'>Mailing List</a></li>
                    </ul>
                </Col>
                <Col xs={6} md={3}>
                    <span>Use Cases</span>
                    <ul>
                        <li><a href='https://www.nucypher.com/secrets-management'>Secrets Management</a></li>
                        <li><a href='https://www.nucypher.com/dynamic-access-control'>Dynamic Access Control</a></li>
                    </ul>
                </Col>
            </Row>
    )
}