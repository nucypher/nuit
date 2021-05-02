import React from "react";
import { daysPerPeriod } from '@project/react-app/src/constants'

export const truncate = (address) => {
    if (address){
        return `${address.slice(0,6)}...${address.slice(38,42)}`
    }
    return ''
}

export const validateEthAddress = (address) => {
    return address.length === 42 && address.startsWith('0x')
}

export const Context = React.createContext();

export const eventQueue = []

export const ContractCaller = (contractInstance, context, name) => {
    const {account} = context.wallet
    return contractInstance.send({from: account}).on('transactionHash', (hash) => {
        context.setStakerUpdates([name, ... context.pending])
    }).on('confirmation', (confirmationNumber, receipt) => {
    }).on('receipt', (receipt) => {
        eventQueue.unshift(name)
    }).on('error', (error, receipt) => {
        console.log(error)
        console.log(receipt)
    })
}


export const daysToPeriods = (days) => {
  return Math.ceil(parseInt(days)/daysPerPeriod).toString()
}