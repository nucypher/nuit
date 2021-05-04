import React, {useContext} from 'react'

import {useQuery} from '@apollo/client';
import {GET_GENESIS_PERIODS, GET_PERIODS} from "../graphql/subgraph";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Context} from "../services";
import {apolloClients} from "../graphql/apollo";
import moment from "moment";
import {ButtonGroup, SecondaryButton} from "./index";
import {Row} from "../pages/home";


const xFormatter = (s) => {
    return new Date(s * 1000).toLocaleDateString("en-US", {month: "short"}).toLowerCase();
}

function epochToHumanDate(epoch) {
    return new Date(epoch * 1000).toDateString("en-US")
}

function dateToUTCEpoch(d) {
    const utcMilllisecondsSinceEpoch = d.getTime() + (d.getTimezoneOffset() * 60 * 1000)
    return Number(Math.round(utcMilllisecondsSinceEpoch / 1000))
}

function oneYearAgo() {
    let d = new Date()
    d.setFullYear(d.getFullYear() - 1);
    return dateToUTCEpoch(d)
}

function oneMonthAgo() {
    let d = new Date()
    d.setMonth(d.getMonth() - 1)
    return dateToUTCEpoch(d)
}

function threeMonthsAgo() {
    let d = new Date()
    d.setMonth(d.getMonth() - 3)
    return dateToUTCEpoch(d)
}

function sixMonthsAgo() {
    let d = new Date()
    d.setMonth(d.getMonth() - 6)
    return dateToUTCEpoch(d)
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
    if (name === "circulatingSupply") name = "totalSupply"
    if (value) value = new Intl.NumberFormat('en').format(round(value))
    else value = '- '
    return [value, camelToTitleCase(name)]
}

function scrubPeriods(periods) {
    let formattedPeriods = []
    for (let period of periods) {
        if (Number(period.circulatingSupply) === 0) {
            period = Object.assign({}, period)
            period.circulatingSupply = null;
            period.participationRate = null;
        }
        formattedPeriods.push(period)
    }
    return formattedPeriods
}

function calculateNewStakerDelta(period1, period2) {

}

export default function StakerChart() {

    const context = useContext(Context)
    const {provider, account, web3} = context.wallet
    let chainID;
    if (provider) {
        chainID = provider.chainId || 0
    }

    let epoch = 1; // "all-time" is default
    const client = apolloClients[chainID || 0]
    const {data: gData, error: gError, loading: gLoading, refetch: gRefetch} = useQuery(
        GET_GENESIS_PERIODS,
        {variables: {epoch: epoch}, client: client}
    );
    const {loading, error, data, refetch} = useQuery(
        GET_PERIODS, {variables: {epoch: epoch}, client: client}
    );

    // handle query
    if (gLoading || loading) return <p>Loading...</p>;
    if (gError || error) return <p><i>There was a problem fetching the latest network status.</i></p>

    // post-processing
    let normalizedPeriods = [];

    // process genesis periods (take evey seventh element)
    for (let i = 0; i < gData.periods.length; i = i + 7) normalizedPeriods.push(gData.periods[i])

    // nullify partially unfinalized period circulating supply and participation
    let periods = scrubPeriods(data.periods)

    // do not include the current period since it is completely unfinalized
    normalizedPeriods.push(...periods.slice(1, periods.length - 1))

    return (
        <div>
            <ButtonGroup aria-label="Timeframe" id="timeframe-buttons">
                <SecondaryButton onClick={() => {
                    const t = {epoch: 1}
                    refetch(t);
                    gRefetch(t)
                }}>
                    All-time
                </SecondaryButton>
                <SecondaryButton onClick={() => {
                    const t = {epoch: oneYearAgo()}
                    refetch(t);
                    gRefetch(t)
                }}>
                    12 Months
                </SecondaryButton>
                <SecondaryButton onClick={() => {
                    const t = {epoch: sixMonthsAgo()}
                    refetch(t);
                    gRefetch(t)
                }}>
                    6 Months
                </SecondaryButton>
                <SecondaryButton onClick={() => {
                    const t = {epoch: threeMonthsAgo()}
                    refetch(t);
                    gRefetch(t)
                }}>
                    3 Months
                </SecondaryButton>

            </ButtonGroup>
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
                        // tick={{transform: 'translate(80, 0)'}}
                        tickCount={3}
                        tickFormatter={xFormatter}
                        tickMargin={5}
                        interval={4}
                        // startOffset={2}
                        domain={['dataMin', 'dataMax']}
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
                        labelFormatter={epochToHumanDate}
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
                        activeDot={<SupplyActiveDot/>}
                    />

                    <Area
                        dataKey="totalStaked"
                        type="monotone"
                        unit=" NU"
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
        </div>
    )
}

