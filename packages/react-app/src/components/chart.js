import React from 'react'

import {useQuery} from '@apollo/client';
import {GET_PERIODS, GET_LATEST_PERIOD} from "../graphql/subgraph";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';


const xFormatter = (s) => {
    return new Date(s * 1000).toLocaleDateString("en-US", {month: "short"}).toLowerCase();
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

    let {loading, error, data} = useQuery(GET_PERIODS, {variables: {epoch: epoch}});
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p><i>There was a problem fetching the latest network status.</i></p>
    }

    return (
        <ResponsiveContainer aspect={2.38974359}>
            <AreaChart
                data={data.periods}
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
                    tick={{ transform: 'translate(80, 0)' }}
                    tickCount={6}
                    interval={29}
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={xFormatter}
                    tickMargin={5}
                    allowDataOverflow={false}
                />

                <YAxis hide="true" type="number"/>
                <YAxis hide="true"
                       type="number"
                       yAxisId={1}
                       domain={[0, 5000]}
                />

                <CartesianGrid horizontal={false} srroke="#E0E4E8"/>

                <Tooltip/>

                <Area
                    dataKey="circulatingSupply"
                    type="monotone"
                    unit=" NU"
                    stroke="#6B32D8"
                    strokeWidth={2}
                    fillOpacity={0}
                    activeDot={<SupplyActiveDot/>}
                    // stackId={0}
                />

                <Area
                    dataKey="totalStaked"
                    type="monotone"
                    unit=" NU"
                    stroke="#1E65F3"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPv)"
                    activeDot={<StakedActiveDot/>}
                    // stackId={0}

                />

                <Area
                    dataKey="activeStakers"
                    type="monotone"
                    unit=" Stakers"
                    stroke="#828A9C"
                    strokeWidth={2}
                    fillOpacity={0}
                    yAxisId={1}
                    activeDot={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

