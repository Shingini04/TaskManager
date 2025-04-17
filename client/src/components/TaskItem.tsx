import React from 'react';
import { Task, UpdateTaskInput } from '../types/Task';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK, DELETE_TASK } from '../graphql/mutations/taskMutations';
import { GET_TASKS, GET_TASKS_BY_STATUS } from '../graphql/queries/taskQueries';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: task.title,
    description: task.description || '',
  });

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      { query: GET_TASKS },
      { query: GET_TASKS_BY_STATUS, variables: { completed: true } },
      { query: GET_TASKS_BY_STATUS, variables: { completed: false } },
    ],
  });

  const handleToggleComplete = () => {
    const updateData: UpdateTaskInput = {
      id: task.id,
      completed: !task.completed,
    };

    updateTask({
      variables: { data: updateData },
      refetchQueries: [
        { query: GET_TASKS_BY_STATUS, variables: { completed: true } },
        { query: GET_TASKS_BY_STATUS, variables: { completed: false } },
      ],
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask({
        variables: { id: task.id },
      });
    }
  };

  const getPriorityColor = () => {
    if (task.priority === 'green') return { bg: 'bg-green-100', text: 'text-green-700', label: 'Low' };
    if (task.priority === 'yellow') return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium' };
    if (task.priority === 'red') return { bg: 'bg-red-100', text: 'text-red-700', label: 'High' };
    return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Default' };
  };

  const priorityStyle = getPriorityColor();

  const formatDueDate = () => {
    if (!task.dueDate) return null;
    const date = new Date(task.dueDate);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all duration-300 border ${
      task.completed ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'
    } hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-lg font-medium mb-2 border border-gray-300 p-2 rounded"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-sm border border-gray-300 p-2 rounded"
              />
            </>
          ) : (
            <>
              <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-blue-400' : 'text-blue-700'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
            {priorityStyle.label}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center text-sm mb-4">
        <div className="flex items-center">
          <span className={`flex items-center ${task.completed ? 'text-blue-400' : isOverdue() ? 'text-red-500' : 'text-gray-500'}`}>
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDueDate()}
              {isOverdue() && !task.completed && (
                <span className="ml-1 text-red-500 text-xs font-medium">(Overdue)</span>
              )}
            </>
          </span>
        </div>

        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          task.completed ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
        }`}>
          {task.completed ? 'Completed' : 'In Progress'}
        </span>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={handleToggleComplete}
          className={`flex-1 px-3 py-2 text-sm rounded-md transition-all font-medium ${
            task.completed
              ? 'bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-200'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200'
          }`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>

        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-2 text-sm rounded-md bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border border-yellow-300 font-medium transition-all"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-2 text-sm rounded-md bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {isEditing && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              updateTask({
                variables: {
                  data: {
                    id: task.id,
                    title: formData.title,
                    description: formData.description,
                  },
                },
                refetchQueries: [
                  { query: GET_TASKS },
                  { query: GET_TASKS_BY_STATUS, variables: { completed: true } },
                  { query: GET_TASKS_BY_STATUS, variables: { completed: false } },
                ],
              });
              setIsEditing(false);
            }}
            className="px-3 py-2 text-sm rounded-md bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 font-medium transition-all"
          >
            Save
          </button>

          <button
            onClick={() => {
              setFormData({ title: task.title, description: task.description || '' });
              setIsEditing(false);
            }}
            className="px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
