import { gql } from '@apollo/client'

export const GET_FINALIZED_PERIODS = gql`
{
  periods (where: {timestamp_gt: 1, genesis: true, finalized: true}, first: 365, skip: 52) {
    timestamp
    totalStaked
    circulatingSupply
    activeStakers
    participationRate
  }
    periods (where: {timestamp_gt: 1, genesis: false, finalized: true}, first: 365) {
    timestamp
    totalStaked
    circulatingSupply
    activeStakers
    participationRate
  }
}
`

export const GET_LATEST_FINALIZED_PERIOD = gql`
{
  periods (where: {circulatingSupply_gt: 0},
           orderBy: timestamp,
           orderDirection: desc,
           finalized: true,
           first: 1) {
    id
    timestamp
    activeStakers
    totalStaked
    circulatingSupply
    participationRate
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
