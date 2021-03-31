export const truncate = (address) => {
    if (address){
        return `${address.slice(0,6)}...${address.slice(38,42)}`
    }
    return ''
}
