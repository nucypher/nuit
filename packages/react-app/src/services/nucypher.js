import { daysPerPeriod } from '@project/react-app/src/constants'
import { ContractCaller } from './ethereum'


function _filterSelection(selection, substakes){
  return substakes.filter((st,index) => {return selection[index]})
}


export const daysToPeriods = (days) => {
  return Math.ceil(parseInt(days)/daysPerPeriod).toString()
}


export class Merge {

  static validate(selection, substakes) {
    const selected = _filterSelection(selection, substakes)

    if (selected.length !== 2) return false
    // from https://github.com/nucypher/nucypher/blob/main/nucypher/blockchain/eth/sol/source/contracts/StakingEscrow.sol#L1116
    // "both sub-stakes must have equal last period to be mergeable"

    // since we know the selection length is always 2 this is simple
    const [stake1, stake2] = selected
    return stake1.lastPeriod === stake2.lastPeriod
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    const [stake1, stake2] = selected
    const { contracts } = context.wallet


    ContractCaller(
      contracts.STAKINGESCROW.methods.mergeStake(stake1.id, stake2.id),
      context,
      [`substakeupdate${stake1.id}`, `substakeupdate${stake2.id}`]
    )
  }
}


export class Divide {

  static validate(selection, substakes) {
    const selected = _filterSelection(selection, substakes)
    /*
    * @notice Divide sub stake into two parts
    * @param _index Index of the sub stake
    * @param _newValue New sub stake value
    * @param _additionalDuration Amount of periods for extending sub stake
    */
    // require(_newValue >= minAllowableLockedTokens && _additionalDuration > 0);

    // seems like we can let the contract handle this.
    return selected.length === 1
  }

  static execute(selection, substakes, context) {
    const selected = _filterSelection(selection, substakes)
    context.modals.triggerModal({message: "Divide Stake", component: "DivideStake", props: {substake: selected[0]}})
  }
}


