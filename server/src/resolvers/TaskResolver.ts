import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Task } from '../entity/Task';
import { CreateTaskInput, UpdateTaskInput } from '../schema/task-input';
import { AppDataSource } from '../data-source';
import { In } from 'typeorm';

@Resolver()
export class TaskResolver {
  private taskRepository = AppDataSource.getRepository(Task);

  // Get all tasks
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // Get a single task by ID
  @Query(() => Task, { nullable: true })
  async task(@Arg('id') id: string): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  // Get tasks by completion status
  @Query(() => [Task])
  async tasksByStatus(@Arg('completed') completed: boolean): Promise<Task[]> {
    return await this.taskRepository.find({ where: { completed } });
  }

  // Create a new task
  @Mutation(() => Task)
  async createTask(@Arg('data') data: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create({
      ...data,
      priority: data.priority ?? 'green' // default fallback
    });
    return await this.taskRepository.save(task);
  }

  // Update an existing task
  @Mutation(() => Task)
  async updateTask(@Arg('data') data: UpdateTaskInput): Promise<Task> {
    const task = await this.taskRepository.findOneByOrFail({ id: data.id });

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.completed !== undefined) task.completed = data.completed;
    if (data.priority !== undefined) task.priority = data.priority;

    return await this.taskRepository.save(task);
  }

  // Delete a task
  @Mutation(() => Boolean)
  async deleteTask(@Arg('id') id: string): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return false;
    await this.taskRepository.remove(task);
    return true;
  }

  // Toggle multiple tasks' completion status
  @Mutation(() => [Task])
  async toggleMultipleTasksStatus(
    @Arg('ids', () => [String]) ids: string[],
    @Arg('completed') completed: boolean
  ): Promise<Task[]> {
    const tasks = await this.taskRepository.findBy({ id: In(ids) });
    if (tasks.length === 0) return [];

    tasks.forEach(task => {
      task.completed = completed;
    });

    return await this.taskRepository.save(tasks);
  }

  // Get tasks by exact priority
  @Query(() => [Task])
  async tasksByPriority(
    @Arg('priority', () => String) priority: 'red' | 'yellow' | 'green'
  ): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { priority },
      order: { priority: 'DESC' }
    });
  }
}


