import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import client from './apolloClient';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const AppLayout = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(AppLayout, document.getElementById('root'));
registerServiceWorker();
