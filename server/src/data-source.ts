// This is required for TypeORM to support decorators like @Entity, @Column, etc.
import 'reflect-metadata';

// Importing the DataSource class from TypeORM — this is how we connect to the database
import { DataSource } from 'typeorm';

// Importing our Task entity (which defines the shape of the "tasks" table in the database)
import { Task } from './entity/Task';

// dotenv is a package that loads environment variables from a .env file
import dotenv from 'dotenv';

// This line actually loads the .env file so we can use things like process.env.DB_HOST
dotenv.config();

// Creating a new DataSource instance, which is the main thing TypeORM uses to connect to the database
export const AppDataSource = new DataSource({
  // Type of database we are connecting to
  type: 'postgres',

  // Hostname for the database (e.g. localhost or a server IP). Gets from .env or defaults to localhost
  host: process.env.DB_HOST || 'localhost',

  // Port number PostgreSQL is running on (usually 5432). Uses .env or default
  port: Number(process.env.DB_PORT) || 5432,

  // Username for the database (used to log in). Uses .env or default
  username: process.env.DB_USERNAME || 'postgres',

  // Password for the database user. Uses .env or default
  password: process.env.DB_PASSWORD || 'postgres',

  // Name of the database we want to connect to. Uses .env or default
  database: process.env.DB_DATABASE || 'taskmanagement',

  // If true, TypeORM will automatically create/update tables based on your entities
  // Great for development, but NOT recommended in production
  synchronize: true,

  // If true, logs all SQL queries in the console (can help with debugging)
  logging: false,

  // List of entities (like tables) your app uses. We’re using only Task here.
  entities: [Task],

  // Migrations (for database version control) — empty for now
  migrations: [],

  // Subscribers (to listen for DB events like insert/update) — also empty for now
  subscribers: [],
});

