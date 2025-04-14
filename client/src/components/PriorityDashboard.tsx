import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries/taskQueries';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'red' | 'yellow' | 'green';
  completed: boolean;
}

type PriorityType = 'red' | 'yellow' | 'green';

const priorityLabels: { [key in PriorityType]: string } = {
  red: 'High',
  yellow: 'Medium',
  green: 'Low',
};

const PriorityTaskFilter: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [priorityFilter, setPriorityFilter] = useState<PriorityType>('red');

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse text-lg font-semibold text-blue-500">
          Loading tasks...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-lg text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const tasks: Task[] = data.tasks;
  const filteredTasks = tasks.filter((task) => task.priority === priorityFilter);
  const priorities: PriorityType[] = ['red', 'yellow', 'green'];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 border border-gray-100">
      {/* Priority Selector */}
      <div className="mb-6">
        <label
          htmlFor="priority-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Priority:
        </label>
        <select
          id="priority-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as PriorityType)}
          className="w-full md:w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority]}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <div className={`w-3 h-3 rounded-full mr-2 bg-${priorityFilter}-500`} />
          <h3 className="text-lg font-medium text-gray-800">
            {priorityLabels[priorityFilter]} Priority Tasks
          </h3>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
            No tasks found with {priorityLabels[priorityFilter].toLowerCase()} priority.
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`p-4 rounded-lg border ${
                  task.completed
                    ? 'bg-green-50 border-green-100'
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4
                      className={`font-medium text-gray-800 ${
                        task.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="mt-1 text-gray-500">{task.description}</p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PriorityTaskFilter;


