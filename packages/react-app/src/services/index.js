import React from "react";

export { truncateAddress, validateAddress, ContractCaller, eventQueue } from './ethereum'
export { daysToPeriods, periodsToDays, Merge, Divide, Remove, Extend, Increase, setNUAllowance, setTAllowance, getNodeStatus } from './nucypher'

export const toQuery = (params) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
} 


export const Context = React.createContext();







