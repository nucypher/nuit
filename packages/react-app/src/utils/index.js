export const truncate = (address) => {
    return `${address.slice(0,5)}...${address.slice(28,32)}`
}