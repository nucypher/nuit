import { gql } from '@apollo/client'

export const GET_PERIODS = gql`
{
  periods (timestamp_gt: $epoch, first: 365) {
    timestamp
    totalStaked
    circulatingSupply
    activeStakers
  }
}
`

export const GET_LATEST_PERIOD = gql`
{
  periods (orderBy: timestamp, first: 1, orderDirection: desc) {
    id
    timestamp
    activeStakers
    totalStaked
    circulatingSupply
  }
}

`
