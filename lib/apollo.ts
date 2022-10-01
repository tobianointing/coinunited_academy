import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client"

const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
  
export const client = new ApolloClient({
    uri: 'https://darp.coinunited.io/index.php?graphql',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
})


