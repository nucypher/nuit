import React, {useContext} from 'react'

import {useQuery} from '@apollo/client';
import {GET_FINALIZED_GENESIS_PERIODS, GET_FINALIZED_PERIODS, GET_LATEST_FINALIZED_PERIOD} from "../graphql/subgraph";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Context} from "../services";
import {PUBLIC_CHAINS} from "../constants";
import {apolloClients} from "../graphql/apollo";


const xFormatter = (s) => {
    return new Date(s * 1000).toLocaleDateString("en-US", {month: "short"}).toLowerCase();
}

function epochToDate(epoch) {
    return new Date(epoch * 1000).toDateString("en-US")
}

class SupplyActiveDot extends React.Component {
    render() {
        const {cx, cy} = this.props;
        // console.log(this.props.payload.circulatingSupply)
        return (
            <circle cx={cx} cy={cy} r={4} stroke="#6B32D8" strokeWidth={2.5} fill="white"/>
        );
    }
}

class ActiveStakersActiveDot extends React.Component {
    render() {
        const {cx, cy} = this.props;
        // console.log(this.props.payload.circulatingSupply)
        return (
            <circle cx={cx} cy={cy} r={4} stroke="#828A9C" strokeWidth={2.5} fill="white"/>
        );
    }
}


class StakedActiveDot extends React.Component {
    render() {
        const {cx, cy} = this.props;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={4}
                stroke="#1E65F3"
                strokeWidth={2.5}
                fill="white"
            />
        );
    }
}

function camelToTitleCase(text) {
    let result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

function round(value, decimals) {
    if (decimals === undefined) decimals = 2
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function tooltipFormatter(value, name, props) {
    if (name === "participationRate") value = value * 100
    if (value) value = new Intl.NumberFormat('en').format(round(value))
    else value = '- '
    return [value, camelToTitleCase(name)]
}

export default function StakerChart() {

    // Example Result
    // activeStakers: "1090"
    // circulatingSupply: "1000000000"
    // id: "18551"
    // timestamp: 1602721501
    // totalStaked: "464307169.521157467877708038"

    let d = new Date()
    d.setFullYear(d.getFullYear() - 1);
    const utcMilllisecondsSinceEpoch = d.getTime() + (d.getTimezoneOffset() * 60 * 1000)
    const epoch = Number(Math.round(utcMilllisecondsSinceEpoch / 1000))

    const context = useContext(Context)
    const {provider, account, web3} = context.wallet
    let chainID;
    if (provider) {
        chainID = provider.chainId || 0
    }

    const client = apolloClients[chainID || 0]

    const {data: genesisData, error: genesisError, loading: genesisLoading} = useQuery(
        GET_FINALIZED_GENESIS_PERIODS,
        {variables: {epoch: epoch}, client: client});
    const {loading, error, data} = useQuery(
        GET_FINALIZED_PERIODS,
        {variables: {epoch: epoch}, client: client}
    );

    if (genesisLoading || loading) return <p>Loading...</p>;
    if (genesisError || error) return <p><i>There was a problem fetching the latest network status.</i></p>

    // post-processing
    let normalizedPeriods = [];
    for (let i = 0; i < genesisData.periods.length; i = i + 7) normalizedPeriods.push(genesisData.periods[i])
    normalizedPeriods.push(...data.periods.slice(1, data.periods.length - 1))

    return (
        <ResponsiveContainer aspect={2.38974359}>
            <AreaChart
                data={normalizedPeriods}
                margin={{top: 0, right: 15, left: 15, bottom: 0}}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="13%" stopColor="#1E65F3" stopOpacity={0.4}/>
                        <stop offset="92%" stopColor="#1E65F3" stopOpacity={0}/>
                    </linearGradient>
                </defs>

                <XAxis
                    dataKey="timestamp"
                    type="number"
                    scale="time"
                    tickSize={2}
                    tick={{transform: 'translate(80, 0)'}}
                    // tickCount={3}
                    tickFormatter={xFormatter}
                    tickMargin={5}
                    interval={3}
                    // startOffset={2}
                    domain={['dataMin', 'dataMax']}
                    // allowDataOverflow={false}
                    // stroke={0}
                    axisLine={false}
                    mirror={false}
                />

                <YAxis hide="true"
                       type="number"
                       orientation="top"
                />

                <YAxis hide="true"
                       type="number"
                       yAxisId={1}
                       domain={[0, 5000]}
                />

                <YAxis hide="true"
                       type="number"
                       yAxisId={2}
                       domain={[0, 1]}
                />

                <CartesianGrid horizontal={false} srroke="#E0E4E8"/>

                <Tooltip
                    labelFormatter={epochToDate}
                    formatter={tooltipFormatter}
                    cursor={{stroke: '#1E65F3', opacity: 0.5}}
                    offset={15}
                    wrapperStyle={{opacity: 0.9}}
                />

                <Area
                    dataKey="circulatingSupply"
                    type="monotone"
                    unit=" NU"
                    stroke="#6B32D8"
                    strokeWidth={2.5}
                    fillOpacity={0}
                    // stackId="0"
                    activeDot={<SupplyActiveDot/>}
                />

                <Area
                    dataKey="totalStaked"
                    type="monotone"
                    unit=" NU"
                    // stackId="1"
                    stroke="#1E65F3"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPv)"
                    activeDot={<StakedActiveDot/>}
                />

                <Area
                    dataKey="activeStakers"
                    type="monotone"
                    unit=" Stakers"
                    stroke="#828A9C"
                    strokeWidth={2}
                    fillOpacity={0}
                    yAxisId={1}
                    activeDot={<ActiveStakersActiveDot/>}
                />

                <Area
                    dataKey="participationRate"
                    type="monotone"
                    unit="%"
                    strokeWidth={0}
                    fillOpacity={0}
                    yAxisId={2}
                    activeDot={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

