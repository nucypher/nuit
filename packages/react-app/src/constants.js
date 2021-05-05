// NuCypher constants
const MIN_STAKE = 15000

export const daysPerPeriod = 7
export const secondsPerDay = 86400
export const millisecondsPerDay = secondsPerDay * 1000
export const millisecondsPerPeriod = millisecondsPerDay * daysPerPeriod

export const getCurrentPeriod = () => {
    return Math.floor(Math.floor(new Date().getTime() / millisecondsPerDay) / daysPerPeriod)
}

export function periodToEpoch(period) {
    return period * millisecondsPerPeriod
}

const EMPTY_WORKER = "0x0000000000000000000000000000000000000000"

const calcROI = (amount, duration) => {

    const MaxEffectiveDuration = Math.min(365, duration)

    const dailyRewardMultiplier = (.05 * MaxEffectiveDuration + 13.4) // based on plotting actual min stake yield
    const dailyMinNU = dailyRewardMultiplier * MaxEffectiveDuration
    const apr = (365/MaxEffectiveDuration * dailyMinNU / MIN_STAKE) * 100
    const net = (dailyMinNU * amount / MIN_STAKE) * duration/MaxEffectiveDuration
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