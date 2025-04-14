import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true, defaultValue: false })
  completed?: boolean;

  @Field({ nullable: true, defaultValue: 'green' })
  priority?: 'red' | 'yellow' | 'green';

  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  priority?: 'red' | 'yellow' | 'green';

  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}
