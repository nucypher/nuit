import React, {useContext} from 'react'

import {Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_STAKER_HISTORY} from "../graphql/subgraph";
import {Context, truncate} from "../utils";


function makeEtherscanTxLink(txhash, networkName) {
    return 'https://'
        + (networkName ? (networkName + '.') : '')
        + 'etherscan.io/tx/' + txhash
}

function makeEtherscanAccountLink(address, networkName) {
    return 'https://'
        + (networkName ? (networkName + '.') : '')
        + 'etherscan.io/address/' + address
}


// Allow list and categorize of events to display
const eventTypes = {
    system: [
        'CommitmentEvent',
        'MintedEvent',
        'SlashedEvent',
        'MigratedEvent'
    ],
    user: [
        "DepositedEvent",
        "DividedEvent",
        "MergedEvent",
        "ProlongEvent",
        "ReStakeEvent",
        "WindDownEvent",
        "WithdrawEvent",
        "WorkerBondedEvent"
    ]
}


function getEventMeta(event) {
    let datum = [
        event.value,  // lock, deposit, withdraw
        event.commitmentPeriod,
        event.reStake,
        event.windDown,
        event.worker
    ]
    console.log(event.__typename, event.reStake)
    for (let data of datum) if (data !== undefined) {
        if (typeof(data) === 'boolean') return data ? 'Enabled' : 'Disabled'
        if (String(data).startsWith("0x")) return <a href={makeEtherscanAccountLink(data)}>{truncate(data)}</a>
        if (event.__typename === "CommitmentEvent") return 'Period #' + data
        else return Math.fround(data).toString() + " NU"
    }
}



function EventHistory(props) {

    const context = useContext(Context)
    const { account, provider } = context.wallet

    let chainId;
    if (provider) {
        chainId = provider.chainID
    }

    let {loading, error, data} = useQuery(
        GET_STAKER_HISTORY,
        {variables: {address: account}},
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p><i>There was a problem fetching staker history.</i></p>

    let eventRows = []
    if (data.staker) {
        for (const event of data.staker.events) {
            if ((props.filter) && !(eventTypes[props.filter].includes(event.__typename)) ) continue
            eventRows.push(
                <tr key={event.id}>
                    <td>
                        <a href={makeEtherscanTxLink(event.transaction.id)}>{event.__typename.replace("Event", "")}</a>
                    </td>
                    <td>{truncate(event.transaction.from)}</td>
                    <td>{new Date(event.timestamp * 1000).toDateString()}</td>
                    <td>{getEventMeta(event)}</td>
                </tr>
            )
          }
    }

    return (<Table striped borderless hover className="text-left">
            <thead>
            <tr>
                <th>Name</th>
                <th>Wallet</th>
                <th>Timestamp</th>
                <th>Data</th>
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
                        <EventHistory filter={"user"}/>
                    </Tab>
                    <Tab eventKey="system" title="System Events">
                        <EventHistory filter={"system"}/>
                    </Tab>
                </Tabs>
                    </div>
            </Col>
        </Row>
    )
}

