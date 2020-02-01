import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import { render } from 'react-dom';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloNetworkStatusProvider, useApolloNetworkStatus } from 'react-apollo-network-status';
import { ThemeProvider } from 'styled-components';

import Router from './Router';
import Layout from './components/Layout';
import registerServiceWorker from './registerServiceWorker';

import baseTheme from './styles/baseTheme';
import GlobalStyle from './styles/globalStyle';
// import './normalize.css';

registerServiceWorker();

function GlobalLoadingIndicator() {
  const status = useApolloNetworkStatus();

  if (status.numPendingQueries > 0 || status.numPendingMutations > 0) {
    document.body.style.borderTop = '4px solid yellow';
    return <p>Loading …</p>;
  }

  if (status.queryError || status.mutationError) {
    document.body.style.borderTop = '4px solid red';
    return null;
  }

  document.body.style.borderTop = '0px';
  return null;
}

// Create an http link:
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_GRAPHQL_HOST}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_GRAPHQL_WSS_HOST}/subscriptions`,
  options: {
    reconnect: true,
  },
});

const link = ApolloLink.split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <>
      <ApolloNetworkStatusProvider>
        <ThemeProvider theme={baseTheme}>
          <GlobalStyle />
          <Layout>
            <GlobalLoadingIndicator />
            <Router />
          </Layout>
        </ThemeProvider>
      </ApolloNetworkStatusProvider>
    </>
  </ApolloProvider>
);

render(<Root />, document.getElementById('root'));
