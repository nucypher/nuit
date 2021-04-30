import React, {useContext} from 'react'

import {Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_STAKER_HISTORY} from "../graphql/subgraph";
import {Context, truncate} from "../utils";


function EventHistory(props) {

    const context = useContext(Context)
    const { account, provider } = context.wallet

    let chainId;
    if (provider) {
        chainId = provider.chainID
        console.log(chainId)
    }

    let {loading, error, data} = useQuery(
        GET_STAKER_HISTORY,
        {variables: {address: account}},
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p><i>There was a problem fetching staker history.</i></p>

    let eventRows = []
    if (data.staker) {
        eventRows = []
        for (const event of data.staker.events) {
            eventRows.push(
                <tr key={event.id}>
                    <td>{event.__typename.replace("Event", "")}</td>
                    <td>{truncate(data.staker.id)}</td>
                    <td>
                        {new Date(event.timestamp * 1000).toDateString()}
                        {event.value}
                    </td>
                </tr>
            )
          }
    }

    return (<Table striped borderless hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Wallet</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
              {eventRows}
            </tbody>
        </Table>
    )
}


export function HistoryPane() {
    return (
        <Row className="justify-content-center text-center full-width">
            <Col>
                <div id="eventHistory" className="justify-content-center">
                <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                    <Tab eventKey="all" title="All Events">
                        <EventHistory/>
                    </Tab>
                    <Tab eventKey="user" title="User Events">
                        <EventHistory/>
                    </Tab>
                    <Tab eventKey="system" title="System Events">
                        <EventHistory/>
                    </Tab>
                </Tabs>
                    </div>

            </Col>

        </Row>
    )
}

