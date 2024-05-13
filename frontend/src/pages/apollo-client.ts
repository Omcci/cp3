import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
};

export default createApolloClient;
