import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ default: false })
  completed: boolean;

  @Field()
  @Column({
    type: 'enum',
    enum: ['red', 'yellow', 'green'],
    default: 'green'
  })
  priority: 'red' | 'yellow' | 'green';

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}


