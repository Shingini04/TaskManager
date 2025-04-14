import { gql } from '@apollo/client';
//parses GraphQL queries/mutations into a format Apollo Client understands.

export const CREATE_TASK = gql`
  mutation CreateTask($data: CreateTaskInput!) {
    createTask(data: $data) {
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

export const UPDATE_TASK = gql`
  mutation UpdateTask($data: UpdateTaskInput!) {
    updateTask(data: $data) {
      id
      title
      description
      completed
      priority
      dueDate
      updatedAt
    }
  }
`;


export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`;

export const TOGGLE_MULTIPLE_TASKS = gql`
  mutation ToggleMultipleTasksStatus($ids: [String!]!, $completed: Boolean!) {
    toggleMultipleTasksStatus(ids: $ids, completed: $completed) {
      id
      title
      completed
    }
  }
`;

