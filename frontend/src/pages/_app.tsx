import "@/styles/globals.css";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import createApolloClient from "./apollo-client";


function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
