import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css'
import App from './App'

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: 'https://raw.githubusercontent.com/nucypher/nucypher-subgraph/main/subgraph.yaml?token=AABODDFNE6FBWX44Y4EWGJTANN6PG',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
