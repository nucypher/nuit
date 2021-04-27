import React from "react";

export const truncate = (address) => {
    if (address){
        return `${address.slice(0,6)}...${address.slice(38,42)}`
    }
    return ''
}


export const validateEthAdress = (address) => {
    return address.length === 42 && address.startsWith('0x')
}


export const Context = React.createContext();

export const ContractCaller = (contractInstance, context) => {
    const {account} = context.wallet


    return contractInstance.send({from: account}).on('transactionHash', (hash) => {
        console.log(hash)
    }).on('confirmation', (confirmationNumber, receipt) => {
        console.log(confirmationNumber,receipt)
    }).on('receipt', (receipt) => {
        console.log(receipt)
    }).on('error', (error, receipt) => {
        console.log(error)
        console.log(receipt)
    })
}