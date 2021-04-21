// NuCypher constants
const MIN_STAKE = 15000

const calcROI = (amount, duration) => {
    const dailyRewardMultiplier = (.05 * duration + 13.4) // based on plotting actual min stake yield
    const dailyMinNU = dailyRewardMultiplier * duration
    const apr = (365/duration * dailyMinNU / MIN_STAKE) * 100
    const net = dailyMinNU * amount / MIN_STAKE
    return { apr, net }
}

export { calcROI, MIN_STAKE }