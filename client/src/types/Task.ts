// types.ts

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'red' | 'yellow' | 'green';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: 'red' | 'yellow' | 'green';
  dueDate?: string;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'red' | 'yellow' | 'green';
  dueDate?: string;
}

