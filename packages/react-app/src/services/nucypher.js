import { daysPerPeriod, getCurrentPeriod } from '@project/react-app/src/constants'
import { ContractCaller } from './ethereum'
import Web3 from "web3";

function _filterSelection(selection, substakes) {
  return substakes.filter((st, index) => { return selection[index] })
}

export const daysToPeriods = (days) => {
  return Math.ceil(parseInt(days) / daysPerPeriod).toString()
}

export const periodsToDays = (periods) => {
  return parseInt(periods) * daysPerPeriod
}

export class Merge {

  static validate(selection, substakes) {
    const selected = _filterSelection(selection, substakes)

    if (selected.length !== 2) return false
    // from https://github.com/nucypher/nucypher/blob/main/nucypher/blockchain/eth/sol/source/contracts/StakingEscrow.sol#L1116
    // "both sub-stakes must have equal last period to be mergeable"

    // since we know the selection length is always 2 this is simple
    const [stake1, stake2] = selected
    if (stake1.lastPeriod === "1") return false
    if (stake2.lastPeriod === "1") return false
    return stake1.lastPeriod === stake2.lastPeriod
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    const [stake1, stake2] = selected
    const { contracts } = context.wallet

    context.modals.triggerModal({ message: "Merge Stakes", component: "MergeStakes", props: { stake1, stake2 } })
  }
}


export class Remove {

  static validate(selection, substakes) {
    const selected = _filterSelection(selection, substakes)

    if (selected.length !== 1) return false
    const [stake] = selected

    if (parseInt(stake.lastPeriod) >= getCurrentPeriod()) return false
    if (stake.unlockingDuration !== "0") return false

    return true
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    const [stake] = selected
    const { contracts } = context.wallet

    ContractCaller(
      contracts.STAKINGESCROW.methods.removeUnusedSubStake(stake.id),
      context,
      [`substakeupdate${stake.id}`],
      `removing substake #${stake.id}`
    )
  }
}

export class Divide {

  static validate(selection, substakes) {
    const selected = _filterSelection(selection, substakes)
    const [stake] = selected
    /*
    * @notice Divide sub stake into two parts
    * @param _index Index of the sub stake
    * @param _newValue New sub stake value
    * @param _additionalDuration Amount of periods for extending sub stake
    */
    // require(_newValue >= minAllowableLockedTokens && _additionalDuration > 0);

    // seems like we can let the contract handle this.
    if (selected.length !== 1) return false
    if (parseInt(stake.lockedValue) < 30000000000000000000000) return false
    if (stake.lastPeriod === "1") return false
    if (stake.unlockingDuration === "0") return false

    return true
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    context.modals.triggerModal({ message: "Divide Stake", component: "DivideStake", props: { substake: selected[0] } })
  }
}



export class Extend {

  static validate(selection, substakes) {
    const selected = _filterSelection(selection, substakes)
    const [stake] = selected

    if (selected.length !== 1) return false
    if (stake.lastPeriod === "1") return false
    if (stake.unlockingDuration === "0") return false

    return true
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    context.modals.triggerModal({ message: "Extend Stake", component: "ExtendStake", props: { substake: selected[0] } })
  }
}


export class Increase {

  static validate(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    const [stake] = selected

    if (selected.length !== 1) return false
    if (stake.lastPeriod === "1") return false
    if (stake.unlockingDuration === "0") return false

    if (context.availableNU.get === "0") return false

    return true
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    context.modals.triggerModal({ message: "Increase Stake", component: "IncreaseStake", props: { substake: selected[0] } })
  }
}

export const setNUAllowance = async (amountWei, context) => {
  const { contracts } = context.wallet
  const amount_bn = Web3.utils.toBN(amountWei)

  if (context.NUallowance.get === '0') {
    ContractCaller(
      contracts.NU.methods.approve(
        contracts.STAKINGESCROW._address,
        amountWei
      ),
      context,
      [`approvingNUspend`],
      `Approving NU spend`
    )
  } else if (amount_bn.gt(context.NUallowance.get)) {
    ContractCaller(
      contracts.NU.methods.increaseAllowance(
        contracts.STAKINGESCROW._address,
        amount_bn.sub(context.NUallowance.get)
      ),
      context,
      [`approvingNUspend`],
      `Approving NU spend`
    )
  } else {
    ContractCaller(
      contracts.NU.methods.decreaseAllowance(
        contracts.STAKINGESCROW._address,
        context.NUallowance.get
      ),
      context,
      [`approvingNUspend`],
      `Approving NU spend`
    )
  }
}

export const setTAllowance = async (amountWei, context) => {
  const { contracts } = context.wallet
  const amount_bn = Web3.utils.toBN(amountWei)

  ContractCaller(
    contracts.T.methods.approve(
      contracts.TOKENSTAKING._address,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    ),
    context,
    [`approvingTspend`],
    `Approving T spend`
  )
}


export const getNodeStatus = async (network, stakingProvider) => {
  const porters = {
    4: "https://porter-ibex.nucypher.community",
    1: "https://porter.nucypher.community",
  }

  const url = porters[network];
  if (url === undefined){
    return false
  }
  const response = await fetch(`${url}/get_ursulas?quantity=1&include_ursulas=${stakingProvider}`)
  let data = await response.json();
  if (data.result.ursulas && data.result.ursulas.length){
    const foundUrs = data.result.ursulas[0]
    if (foundUrs.uri && foundUrs.encrypting_key){
      return foundUrs.uri
    }
  }

  return false
}