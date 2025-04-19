// We import the decorators and helpers to define GraphQL resolvers, queries, mutations, and arguments
import { Resolver, Query, Mutation, Arg } from 'type-graphql';

// We import the Task entity (our DB model)
import { Task } from '../entity/Task';

// We import the input types used for creating and updating tasks
import { CreateTaskInput, UpdateTaskInput } from '../schema/task-input';

// We import our database source (basically our DB connection)
import { AppDataSource } from '../data-source';

// 'In' is a TypeORM helper to query for multiple values (like "WHERE id IN [a, b, c]")
import { In } from 'typeorm';

// This decorator says this class contains GraphQL resolver functions (queries & mutations)
@Resolver()

// We are creating a class to hold all logic related to tasks
export class TaskResolver {

  // We grab the Task repository so we can do DB operations like find, save, delete, etc.
  private taskRepository = AppDataSource.getRepository(Task);

  // ----------- QUERIES (to get data) -----------

  // Get all tasks
  @Query(() => [Task]) // Tells GraphQL this is a query returning an array of Task objects
  async tasks(): Promise<Task[]> {
    return await this.taskRepository.find(); // Fetch all tasks from the DB
  }

  // Get a single task by its ID
  @Query(() => Task, { nullable: true }) // Might return null if not found
  async task(@Arg('id') id: string): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id }); // Find task with matching ID
  }

  // Get all tasks based on completed or not
  @Query(() => [Task])
  async tasksByStatus(@Arg('completed') completed: boolean): Promise<Task[]> {
    return await this.taskRepository.find({ where: { completed } }); // Filter by completed status
  }

  // ----------- MUTATIONS (to change data) -----------

  // Create a new task
  @Mutation(() => Task) // GraphQL mutation that returns the newly created task
  async createTask(@Arg('data') data: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create({
      ...data, // Spread all input fields (title, description, etc.)
      priority: data.priority ?? 'green' // Use given priority or default to 'green'
    });
    return await this.taskRepository.save(task); // Save task to DB
  }

  // Update an existing task
  @Mutation(() => Task)
  async updateTask(@Arg('data') data: UpdateTaskInput): Promise<Task> {
    const task = await this.taskRepository.findOneByOrFail({ id: data.id }); // Get the task or throw error if not found

    // Update each field only if it was provided in the input
    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.completed !== undefined) task.completed = data.completed;
    if (data.priority !== undefined) task.priority = data.priority;

    return await this.taskRepository.save(task); // Save updated task
  }

  // Delete a task by its ID
  @Mutation(() => Boolean) // Returns true if deleted, false if not found
  async deleteTask(@Arg('id') id: string): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id }); // Look for task
    if (!task) return false; // Return false if not found
    await this.taskRepository.remove(task); // Delete it
    return true; // Successfully deleted
  }

  // Toggle completion status for multiple tasks
  @Mutation(() => [Task]) // Returns the updated tasks
  async toggleMultipleTasksStatus(
    @Arg('ids', () => [String]) ids: string[], // List of task IDs
    @Arg('completed') completed: boolean // New completed status
  ): Promise<Task[]> {
    const tasks = await this.taskRepository.findBy({ id: In(ids) }); // Find all tasks with those IDs
    if (tasks.length === 0) return []; // If no tasks found, return empty array

    // Set completed status for each task
    tasks.forEach(task => {
      task.completed = completed;
    });

    return await this.taskRepository.save(tasks); // Save all updated tasks
  }

  // Get tasks by priority (red, yellow, green)
  @Query(() => [Task])
  async tasksByPriority(
    @Arg('priority', () => String) priority: 'red' | 'yellow' | 'green'
  ): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { priority }, // Filter by priority
      order: { priority: 'DESC' } // Order results by priority value (not super useful here but okay)
    });
  }
}



