import React from 'react'
import { render } from '@testing-library/react'
import App from '@project/react-app/src/App'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app'
})

test('renders learn react link', () => {
  const { getByText } = render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
