import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS, GET_TASKS_BY_STATUS } from '../graphql/queries/taskQueries';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const { loading, error, data } = useQuery(
    filter === 'all' ? GET_TASKS : GET_TASKS_BY_STATUS,
    {
      variables: filter !== 'all' ? { completed: filter === 'completed' } : undefined,
    }
  );

  if (loading) return (
    <div className="flex justify-center items-center h-40">
      <div className="w-8 h-8 border-3 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-sm">
      <p className="text-red-700 font-medium">Error loading tasks: {error.message}</p>
    </div>
  );

  const tasks = filter === 'all' ? data.tasks : data.tasksByStatus;

  const getSortedTasks = () => {
    if (filter === 'all' || !tasks) return tasks;

    return [...tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      return filter === 'pending'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  };

  const sortedTasks = getSortedTasks();

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-[700px] mx-auto mt-8 border border-gray-100 mb-8">
      

      <div className="flex bg-gray-50 rounded-xl p-1 mb-8 shadow-sm">
        {['all', 'pending', 'completed'].map((type) => (
          <button
            key={type}
            className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
              filter === type
                ? 'bg-white text-indigo-700 font-medium shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFilter(type as 'all' | 'pending' | 'completed')}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {sortedTasks?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 bg-gray-50 rounded-xl border border-gray-100">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No tasks to show</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

