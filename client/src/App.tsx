import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Home />
      </div>
    </ApolloProvider>
  );
}

export default App;
