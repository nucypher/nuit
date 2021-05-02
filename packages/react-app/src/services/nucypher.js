import { daysPerPeriod } from '@project/react-app/src/constants'

export const daysToPeriods = (days) => {
  return Math.ceil(parseInt(days)/daysPerPeriod).toString()
}

export const validateMerge = (selection, substakes) => {

}