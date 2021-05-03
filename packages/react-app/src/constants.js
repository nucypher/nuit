// NuCypher constants
const MIN_STAKE = 15000

export const daysPerPeriod = 7

export const getCurrentPeriod = () => {
    return Math.round(Math.floor(new Date().getTime() / 86400000) / daysPerPeriod)
}

const EMPTY_WORKER = "0x0000000000000000000000000000000000000000"

const calcROI = (amount, duration) => {
    const dailyRewardMultiplier = (.05 * duration + 13.4) // based on plotting actual min stake yield
    const dailyMinNU = dailyRewardMultiplier * duration
    const apr = (365/duration * dailyMinNU / MIN_STAKE) * 100
    const net = dailyMinNU * amount / MIN_STAKE
    return { apr, net }
}

export { calcROI, MIN_STAKE, EMPTY_WORKER }

export const PUBLIC_CHAINS = {
    0: "Olympic",
    1: "Mainnet",
    2: "Morden",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    6: "Kotti",
    42: "Kovan",
    77: "Sokol",
    100: "xDai",
}