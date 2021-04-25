import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css'
import App from './App'

// You should replace this url with your own and put it into a .env file
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/nucypher/nucypher',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
