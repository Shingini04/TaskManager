// Enables metadata reflection for decorators (required for type-graphql)
import 'reflect-metadata';

// Importing Express and its Application type
import express, { Application } from 'express';

// Apollo Server for running a GraphQL server with Express
import { ApolloServer } from 'apollo-server-express';

// Helps build GraphQL schema from TypeScript classes and decorators
import { buildSchema } from 'type-graphql';

// Your resolver file where GraphQL logic for "Task" lives
import { TaskResolver } from './resolvers/TaskResolver';

// Middleware to handle Cross-Origin Resource Sharing
import cors from 'cors';

// Loads environment variables from a .env file
import dotenv from 'dotenv';

// Import the data source (DB configuration and connection logic)
import { AppDataSource } from './data-source';

// Load environment variables into process.env
dotenv.config();

// Main function that sets up the entire server
const main = async () => {
  // Connect to the database
  await AppDataSource.initialize();

  // Log to confirm DB is connected
  console.log('Connected to database');

  // Create an Express app
  const app: Application = express();

  // Enable CORS so frontend apps can access this backend
  app.use(cors());

  // Build the GraphQL schema using the TaskResolver
  const schema = await buildSchema({
    resolvers: [TaskResolver], // Add more resolvers here if needed
    validate: false, // Disable automatic validation of input (can be enabled later)
  });

  // Create an Apollo GraphQL server and attach request/response to context
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }), // Useful for auth, sessions, etc.
  });

  // Start the Apollo Server
  await apolloServer.start();

  // Attach Apollo middleware to the Express app
  apolloServer.applyMiddleware({
    app,
    cors: false, // CORS already handled above by app.use(cors())
  });

  // Get the port from environment or default to 4000
  const PORT = process.env.PORT || 4000;

  // Start listening for incoming requests on the specified port
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
};

// Run the main function and catch any errors during startup
main().catch((error) => {
  console.error('Error starting server:', error);
});


