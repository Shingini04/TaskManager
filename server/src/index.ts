import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/TaskResolver';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';

dotenv.config();

const main = async () => {
  await AppDataSource.initialize();
  console.log('Connected to database');

  const app: Application = express(); // 👈 FIXED HERE
  app.use(cors());

  const schema = await buildSchema({
    resolvers: [TaskResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
};

main().catch((error) => {
  console.error('Error starting server:', error);
});

