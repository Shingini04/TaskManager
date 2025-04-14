// client/src/graphql/queries/taskQueries.ts

import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      completed
      priority
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      id
      title
      description
      completed
      priority
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASKS_BY_STATUS = gql`
  query GetTasksByStatus($completed: Boolean!) {
    tasksByStatus(completed: $completed) {
      id
      title
      description
      completed
      priority
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASKS_BY_PRIORITY = gql`
  query GetTasksByPriority($priority: String!) {
    tasksByPriority(priority: $priority) {
      id
      title
      description
      completed
      priority
      createdAt
      updatedAt
    }
  }
`;



