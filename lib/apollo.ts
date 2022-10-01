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
    uri: `${process.env.NEXT_PUBLIC_WP_API_URL}/index.php?graphql`,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
})


