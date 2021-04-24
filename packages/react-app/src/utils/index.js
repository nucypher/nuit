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
