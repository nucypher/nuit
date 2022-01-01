

export const truncateAddress = (address) => {
    if (address){
        return `${address.slice(0,6)}...${address.slice(38,42)}`
    }
    return ''
}

export const validateAddress = (address) => {
    return address.length === 42 && address.startsWith('0x')
}

export const eventQueue = []

export const ContractCaller = (contractInstance, context, eventnames, messageData) => {
    const {account} = context.wallet
    if (!Array.isArray(eventnames)){
        eventnames = [eventnames]
    }

    return contractInstance.send({from: account}).on('transactionHash', (hash) => {
        console.log(eventnames.concat(context.pending))
        context.setStakerUpdates(eventnames.concat(context.pending))
        for (var event of eventnames) {
            const message = messageData || `pending transaction: ${event}`
            context.messages.setMessage({type: 'transaction', message, pending: event})
        }
    }).on('confirmation', (confirmationNumber, receipt) => {
    }).on('receipt', (receipt) => {
        for (var event of eventnames) {
            eventQueue.unshift(event)
        }
    }).on('error', (error, receipt) => {
        console.log(error)
        console.log(receipt)
        for (var event of eventnames) {
            eventQueue.unshift(event)
        }
    })
}
