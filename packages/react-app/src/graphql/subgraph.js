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


export const GET_STAKER_HISTORY = gql`
query Staker($address: String!) {
  staker (id: $address, first: 1000) {
    id
    events (orderBy: timestamp, orderDirection: desc) {
        __typename
        timestamp
    }
  }
}
`
