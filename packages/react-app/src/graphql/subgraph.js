import { gql } from '@apollo/client'

const GET_PERIODS = gql`
{
  periods {
    timestamp
    totalStaked
    circulatingSupply
    activeStakers
  }
}
`

export default GET_PERIODS
