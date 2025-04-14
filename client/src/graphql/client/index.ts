import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//manages all graphql interactions 
//caches data (thats like storing some frequently asked graphql request so that its faster)
//joins client and server with http link (like client sends request to that http link)
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', //link to send request // Uniform Resource Identifier
});

export const client = new ApolloClient({ //jate import kore other files use korte pare
  link: httpLink, //ei link e
  cache: new InMemoryCache(), //cache setup
});
