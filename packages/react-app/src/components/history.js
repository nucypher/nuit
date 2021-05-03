import React, {useContext} from 'react'

import {Col, Row, Tab, Table, Tabs} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_STAKER_HISTORY} from "../graphql/subgraph";
import {Context, truncateAddress} from "../services";
import {PUBLIC_CHAINS} from "../constants";
import Web3 from "web3";


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
    for (let data of datum) if (data !== undefined) {
        if (typeof(data) === 'boolean') return data ? 'Enabled' : 'Disabled'
        if (String(data).startsWith("0x")) return <a href={makeEtherscanAccountLink(data)}>{truncateAddress(data)}</a>
        if (event.__typename === "CommitmentEvent") return 'Period #' + data
        else return Math.fround(data).toString() + " NU"
    }
}


function EventHistory(props) {

    const context = useContext(Context)
    const {account, provider} = context.wallet
    let chainId, networkName;
    if (provider && provider.chainID) {
        chainId = provider.chainID
        networkName = PUBLIC_CHAINS[chainId].toLowerCase();
    }

    // query
    let {loading, error, data} = useQuery(
        GET_STAKER_HISTORY,
        {variables: {address: account}},
    );

    // handle query
    if (loading) return <p>Loading...</p>;
    if (error) return <p><i>There was a problem fetching staker history.</i></p>

    // post-processing
    let eventRows = []
    if (data.staker) {
        for (const event of data.staker.events) {
            if ((props.filter) && !(eventTypes[props.filter].includes(event.__typename))) continue
            eventRows.push(
                <tr key={event.id}>
                    <td>
                        <a href={makeEtherscanTxLink(event.transaction.id)}>
                            {event.__typename.replace("Event", "")}
                        </a>
                    </td>
                    <td>
                        <a href={makeEtherscanAccountLink(event.transaction.from, networkName)}>
                            {truncateAddress(Web3.utils.toChecksumAddress(event.transaction.from))}
                        </a>
                    </td>
                    <td>{new Date(event.timestamp * 1000).toDateString()}</td>
                    <td>{getEventMeta(event)}</td>
                </tr>
            )
        }
    }

    // TODO: Paginate
    // let pages = [1, 2, 3]
    // const paginationBasic = (
    //   <div>
    //     <Pagination size="sm">{pages}</Pagination>
    //   </div>
    // );

    return (<Table striped borderless hover className="text-left" variant={props.theme.name}>
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


export function HistoryPane(props) {
    return (
        <Row className="justify-content-center text-center full-width">
            <Col>
                <div id="eventHistory" className="justify-content-center">
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="All Events">
                            <EventHistory theme={props.theme}/>
                        </Tab>
                        <Tab eventKey="user" title="User Events">
                            <EventHistory filter={"user"} theme={props.theme}/>
                        </Tab>
                        <Tab eventKey="system" title="System Events">
                            <EventHistory filter={"system"} theme={props.theme}/>
                        </Tab>
                    </Tabs>
                </div>
            </Col>
        </Row>
    )
}

