// These are imports — we bring in stuff from libraries to use in our code
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'; 
// These are tools from TypeORM to define database tables and their columns

import { ObjectType, Field, ID } from 'type-graphql'; 
// These are tools from type-graphql to make the class work with GraphQL

// This decorator says "This class is a GraphQL object type", which means it can be used in the GraphQL API
@ObjectType()

// This decorator says "This class represents a table in the database"
@Entity()

// We are defining a class called Task (this will be our table/model)
export class Task {

  // This exposes the id field to GraphQL and says it's of type ID
  @Field(() => ID)

  // This creates a special id column in the database that auto-generates a unique ID (as a UUID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // This exposes the title field to GraphQL
  @Field()

  // This makes a normal column in the database for storing the task title
  @Column()
  title: string;

  // This exposes the description to GraphQL and says it can be null
  @Field({ nullable: true })

  // This creates a description column in the DB, which can also be null (optional)
  @Column({ nullable: true })
  description?: string;

  // This exposes the completed status to GraphQL
  @Field()

  // This creates a column in the DB for checking if a task is done. Default value is false
  @Column({ default: false })
  completed: boolean;

  // This exposes priority to GraphQL
  @Field()

  // This creates an enum column (can only be 'red', 'yellow', or 'green') with default as 'green'
  @Column({
    type: 'enum',
    enum: ['red', 'yellow', 'green'],
    default: 'red'
  })
  priority: 'red' | 'yellow' | 'green';

  // This exposes dueDate to GraphQL and says it can be null
  @Field(() => Date, { nullable: true })

  // This makes a column in the DB for dueDate with timestamp type, and it's optional
  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  // This exposes createdAt to GraphQL
  @Field()

  // This auto-generates a column that stores when this task was created
  @CreateDateColumn()
  createdAt: Date;

  // This exposes updatedAt to GraphQL
  @Field()

  // This auto-generates a column that updates whenever the task is updated
  @UpdateDateColumn()
  updatedAt: Date;
}


