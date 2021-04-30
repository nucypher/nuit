
import {ApolloClient, InMemoryCache} from "@apollo/client";

const mainnetApolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/nucypher/nucypher',
  cache: new InMemoryCache()
})

const rinkebyApolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/nucypher/nucypher-rinkeby',
  cache: new InMemoryCache()
})

const goerliApolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/nucypher/nucypher-goerli',
  cache: new InMemoryCache()
})

export const apolloClients = {
    0: mainnetApolloClient,
    4: rinkebyApolloClient,
    5: goerliApolloClient
}