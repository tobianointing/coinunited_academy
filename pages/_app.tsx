import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import {ApolloProvider} from '@apollo/client/react'
import {client} from '../lib/apollo'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className='font-DmSans block overflow-hidden'>
        <Header />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
    )
}

export default MyApp
