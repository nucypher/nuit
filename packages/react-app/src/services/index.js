import React from "react";
import Web3 from "web3";

export { truncateAddress, validateAddress, ContractCaller, eventQueue } from './ethereum'
export { daysToPeriods, periodsToDays, Merge, Divide, Remove, Extend, Increase, setNUAllowance, setTAllowance, getNodeStatus } from './nucypher'

export const toQuery = (params) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
} 

export const Context = React.createContext();

export const AggregateStakes = async (stake_events, contracts) => {

    return Promise.all(stake_events.map(e => contracts.TOKENSTAKING.methods.stakes(e.returnValues.stakingProvider).call())).then((res)=>{
        return res.reduce((previousValue, currentValue)=>{
            return {
                nuInTStake: previousValue.nuInTStake.add(new Web3.utils.BN(currentValue.nuInTStake)),
                tStake: previousValue.tStake.add(new Web3.utils.BN(currentValue.tStake)),
                keepInTStake: previousValue.keepInTStake.add(new Web3.utils.BN(currentValue.keepInTStake))
            }
        }, {nuInTStake: new Web3.utils.BN("0"), tStake: new Web3.utils.BN("0"), keepInTStake: new Web3.utils.BN("0")})
    }, (err, something)=>{
        console.log(err, something)
    })
}