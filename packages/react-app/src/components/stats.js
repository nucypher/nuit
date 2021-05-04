import {Col, Container, Row} from 'react-bootstrap/';
import {Blue, Grey, HR, Period, Purple} from "./index";
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_LATEST_FINALIZED_PERIOD} from "../graphql/subgraph";
import {getCurrentPeriod} from "../constants";

export default function NetworkStats() {

    let {loading, error, data} = useQuery(GET_LATEST_FINALIZED_PERIOD, {network: 'llamas'});
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p><i>There was a problem fetching the latest network status.</i></p>
    }
    const period = data.periods[0]
    const locale = "en-US"
    let supply = period.circulatingSupply ? Math.round(period.circulatingSupply).toLocaleString(locale) : "-"
    let staked = period.totalStaked ? Math.round(period.totalStaked).toLocaleString(locale) : "-"
    let stakers = period.activeStakers ? Number(period.activeStakers).toLocaleString(locale) : "-"

    return (
        <Row xs={1} md={4} className="d-flex justify-content-centered">
            <Col>
                <div>
                    <HR color="black"></HR>
                    <h5><strong>Current Period</strong></h5>
                    <h2><strong>{getCurrentPeriod()}</strong></h2>
                </div>
            </Col>
            <Col className="d-flex justify-content-center">
                <div>
                    <HR color="blue"></HR>
                    <h5><strong>Total NU Staked</strong></h5>
                    <h2><strong><Blue>{staked}</Blue></strong></h2>
                </div>
            </Col>
            <Col className="d-flex justify-content-center">
                <div>
                    <HR color="purple"></HR>
                    <h5><strong>Total Supply</strong></h5>
                    <h2><strong><Purple>{supply}</Purple></strong></h2>
                </div>
            </Col>
            <Col className="d-flex justify-content-center">
                <div>
                    <HR color="grey75"></HR>
                    <h5><strong>Active Stakers</strong></h5>
                    <h2><strong><Grey>{stakers}</Grey></strong></h2>
                </div>
            </Col>
        </Row>
    )
}