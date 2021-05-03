import {gql} from '@apollo/client'

export const GET_GENESIS_PERIODS = gql`
     query Periods($epoch: Int!){
        periods (where: {timestamp_gt: $epoch, genesis: true}, first: 365) {
            timestamp
            totalStaked
            circulatingSupply
            activeStakers
            participationRate
            minted
        }
    }
`
export const GET_PERIODS = gql`
    query Periods($epoch: Int!){
        periods (where: {timestamp_gt: $epoch, genesis: false}, first: 52) {
            timestamp
            totalStaked
            circulatingSupply
            activeStakers
            participationRate
            minted
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
        staker (id: $address) {
            id
            events (orderBy: timestamp, orderDirection: desc, first: 1000) {
                id
                timestamp
                transaction { id from }
                __typename
                ... on MintedEvent { value }
                ... on CommitmentEvent { commitmentPeriod }
                ... on WindDownEvent { windDown }
                ... on ReStakeEvent { reStake }
                ... on LockedEvent { value }
                ... on WorkerBondedEvent { worker }
                ... on WithdrawEvent { value }
            }
        }
    }
`
