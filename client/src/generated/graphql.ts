import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateTaskInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Scalars['Boolean']['output'];
  toggleMultipleTasksStatus: Array<Task>;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  data: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationToggleMultipleTasksStatusArgs = {
  completed: Scalars['Boolean']['input'];
  ids: Array<Scalars['String']['input']>;
};


export type MutationUpdateTaskArgs = {
  data: UpdateTaskInput;
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks: Array<Task>;
  tasksByPriority: Array<Task>;
  tasksByStatus: Array<Task>;
};


export type QueryTaskArgs = {
  id: Scalars['String']['input'];
};


export type QueryTasksByPriorityArgs = {
  priority: Scalars['String']['input'];
};


export type QueryTasksByStatusArgs = {
  completed: Scalars['Boolean']['input'];
};

export type Task = {
  __typename?: 'Task';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  priority: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateTaskInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskMutationVariables = Exact<{
  data: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, description?: string | null, completed: boolean, priority: string, dueDate?: any | null, createdAt: any, updatedAt: any } };

export type UpdateTaskMutationVariables = Exact<{
  data: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, title: string, description?: string | null, completed: boolean, priority: string, dueDate?: any | null, updatedAt: any } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type ToggleMultipleTasksStatusMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
  completed: Scalars['Boolean']['input'];
}>;


export type ToggleMultipleTasksStatusMutation = { __typename?: 'Mutation', toggleMultipleTasksStatus: Array<{ __typename?: 'Task', id: string, title: string, completed: boolean }> };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, completed: boolean, priority: string, dueDate?: any | null, createdAt: any, updatedAt: any }> };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: string, title: string, description?: string | null, completed: boolean, priority: string, createdAt: any, updatedAt: any } | null };

export type GetTasksByStatusQueryVariables = Exact<{
  completed: Scalars['Boolean']['input'];
}>;


export type GetTasksByStatusQuery = { __typename?: 'Query', tasksByStatus: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, completed: boolean, priority: string, createdAt: any, updatedAt: any }> };

export type GetTasksByPriorityQueryVariables = Exact<{
  priority: Scalars['String']['input'];
}>;


export type GetTasksByPriorityQuery = { __typename?: 'Query', tasksByPriority: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, completed: boolean, priority: string, createdAt: any, updatedAt: any }> };


export const CreateTaskDocument = gql`
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
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
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
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: String!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ToggleMultipleTasksStatusDocument = gql`
    mutation ToggleMultipleTasksStatus($ids: [String!]!, $completed: Boolean!) {
  toggleMultipleTasksStatus(ids: $ids, completed: $completed) {
    id
    title
    completed
  }
}
    `;
export type ToggleMultipleTasksStatusMutationFn = Apollo.MutationFunction<ToggleMultipleTasksStatusMutation, ToggleMultipleTasksStatusMutationVariables>;

/**
 * __useToggleMultipleTasksStatusMutation__
 *
 * To run a mutation, you first call `useToggleMultipleTasksStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleMultipleTasksStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleMultipleTasksStatusMutation, { data, loading, error }] = useToggleMultipleTasksStatusMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useToggleMultipleTasksStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleMultipleTasksStatusMutation, ToggleMultipleTasksStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleMultipleTasksStatusMutation, ToggleMultipleTasksStatusMutationVariables>(ToggleMultipleTasksStatusDocument, options);
      }
export type ToggleMultipleTasksStatusMutationHookResult = ReturnType<typeof useToggleMultipleTasksStatusMutation>;
export type ToggleMultipleTasksStatusMutationResult = Apollo.MutationResult<ToggleMultipleTasksStatusMutation>;
export type ToggleMultipleTasksStatusMutationOptions = Apollo.BaseMutationOptions<ToggleMultipleTasksStatusMutation, ToggleMultipleTasksStatusMutationVariables>;
export const GetTasksDocument = gql`
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

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTaskDocument = gql`
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

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables> & ({ variables: GetTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<typeof useGetTaskSuspenseQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const GetTasksByStatusDocument = gql`
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

/**
 * __useGetTasksByStatusQuery__
 *
 * To run a query within a React component, call `useGetTasksByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksByStatusQuery({
 *   variables: {
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useGetTasksByStatusQuery(baseOptions: Apollo.QueryHookOptions<GetTasksByStatusQuery, GetTasksByStatusQueryVariables> & ({ variables: GetTasksByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksByStatusQuery, GetTasksByStatusQueryVariables>(GetTasksByStatusDocument, options);
      }
export function useGetTasksByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksByStatusQuery, GetTasksByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksByStatusQuery, GetTasksByStatusQueryVariables>(GetTasksByStatusDocument, options);
        }
export function useGetTasksByStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksByStatusQuery, GetTasksByStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksByStatusQuery, GetTasksByStatusQueryVariables>(GetTasksByStatusDocument, options);
        }
export type GetTasksByStatusQueryHookResult = ReturnType<typeof useGetTasksByStatusQuery>;
export type GetTasksByStatusLazyQueryHookResult = ReturnType<typeof useGetTasksByStatusLazyQuery>;
export type GetTasksByStatusSuspenseQueryHookResult = ReturnType<typeof useGetTasksByStatusSuspenseQuery>;
export type GetTasksByStatusQueryResult = Apollo.QueryResult<GetTasksByStatusQuery, GetTasksByStatusQueryVariables>;
export const GetTasksByPriorityDocument = gql`
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

/**
 * __useGetTasksByPriorityQuery__
 *
 * To run a query within a React component, call `useGetTasksByPriorityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksByPriorityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksByPriorityQuery({
 *   variables: {
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useGetTasksByPriorityQuery(baseOptions: Apollo.QueryHookOptions<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables> & ({ variables: GetTasksByPriorityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables>(GetTasksByPriorityDocument, options);
      }
export function useGetTasksByPriorityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables>(GetTasksByPriorityDocument, options);
        }
export function useGetTasksByPrioritySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables>(GetTasksByPriorityDocument, options);
        }
export type GetTasksByPriorityQueryHookResult = ReturnType<typeof useGetTasksByPriorityQuery>;
export type GetTasksByPriorityLazyQueryHookResult = ReturnType<typeof useGetTasksByPriorityLazyQuery>;
export type GetTasksByPrioritySuspenseQueryHookResult = ReturnType<typeof useGetTasksByPrioritySuspenseQuery>;
export type GetTasksByPriorityQueryResult = Apollo.QueryResult<GetTasksByPriorityQuery, GetTasksByPriorityQueryVariables>;