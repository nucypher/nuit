import React from 'react'

import {useQuery} from '@apollo/client';
import GET_PERIODS from "../graphql/subgraph";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';


const xFormatter = (seconds) => new Date(seconds * 1000).toLocaleDateString("en-US", { month: "short" });

class SupplyActiveDot extends React.Component {
    render() {
        const { cx, cy } = this.props;
        console.log(this.props.payload.circulatingSupply)
        return (
            <circle cx={cx} cy={cy} r={4} stroke="#6B32D8" strokeWidth={2.5} fill="white" />
        );
    }
}


class StakedActiveDot extends React.Component {
    render() {
        const { cx, cy } = this.props;
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
    let { loading, error, data } = useQuery(GET_PERIODS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (

        <AreaChart width={918} height={304} data={data.periods}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

            <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="13%" stopColor="#1E65F3" stopOpacity={0.4} />
                    <stop offset="92%" stopColor="#1E65F3" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              type="number"
              // scale="time"
              domain = {['dataMin', 'dataMax']}
              tickFormatter = {xFormatter}
            />
            <YAxis hide="true" type="number"/>
            <YAxis hide="true"
                   type="number"
                   yAxisId={1}
                   domain={[0, 5000]}
            />

            <CartesianGrid horizontal={false} srroke="#E0E4E8" />

            <Tooltip
                offset={-10}
                allowEscapeViewBox={{x: true, y: true}}
            />

            <Area
                dataKey="circulatingSupply"
                type="basis"
                stroke="#6B32D8"
                strokeWidth={2}
                fillOpacity={0}
                activeDot={<SupplyActiveDot />}
            />

            <Area
                dataKey="totalStaked"
                type="basis"
                stroke="#1E65F3"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPv)"
                activeDot={<StakedActiveDot />}
            />

            <Area
                dataKey="activeStakers"
                type="basis"
                stroke="#828A9C"
                strokeWidth={2}
                fillOpacity={0}
                yAxisId={1}
                activeDot={false}
            />
        </AreaChart>
    )
}

