// Importing required decorators from type-graphql
// These help define what data can be sent from the client
import { InputType, Field, ID } from 'type-graphql';

//
// 🎯 INPUT TYPE FOR CREATING A NEW TASK
//

// This decorator tells GraphQL that this class will be used to send data into the API
@InputType()
export class CreateTaskInput {
  // This is a required field. User must provide a title when creating a task
  @Field()
  title: string;

  // Optional field. User can provide a description if they want, or leave it empty
  @Field({ nullable: true })
  description?: string;

  // Optional field. If user doesn't send it, it will default to "false"
  @Field({ nullable: true, defaultValue: false })
  completed?: boolean;

  // Optional field. Default is "green" if user doesn't send a value
  @Field({ nullable: true, defaultValue: 'green' })
  priority?: 'red' | 'yellow' | 'green';

  // Optional field. User can set a deadline or due date for the task
  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}

//
// ✏️ INPUT TYPE FOR UPDATING AN EXISTING TASK
//

// Again, telling GraphQL this class is for input
@InputType()
export class UpdateTaskInput {
  // This is required. We need the task ID to know which task to update
  @Field(() => ID)
  id: string;

  // All fields below are optional — user can update one, some, or all of them

  // Optional title update
  @Field({ nullable: true })
  title?: string;

  // Optional description update
  @Field({ nullable: true })
  description?: string;

  // Optional completed status update
  @Field({ nullable: true })
  completed?: boolean;

  // Optional priority update (red/yellow/green)
  @Field({ nullable: true })
  priority?: 'red' | 'yellow' | 'green';

  // Optional due date update
  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}
