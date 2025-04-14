import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../graphql/mutations/taskMutations';
import { GET_TASKS, GET_TASKS_BY_STATUS } from '../graphql/queries/taskQueries';
import { CreateTaskInput } from '../types/Task';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'green' | 'yellow' | 'red' | ''>('');
  const [dueDate, setDueDate] = useState('');

  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      { query: GET_TASKS },
      { query: GET_TASKS_BY_STATUS, variables: { completed: false } },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const taskInput: CreateTaskInput = {
      title,
      description: description || undefined,
      priority: priority || 'green', // default to green
      completed: false,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    };

    createTask({ variables: { data: taskInput } });

    setTitle('');
    setDescription('');
    setPriority('');
    setDueDate('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-pink-500 rounded-full mr-3"></div>
        <h2 className="text-2xl font-bold text-blue-600">Add New Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-blue-700">
            Title <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
            placeholder="What needs to be done?"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-blue-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all resize-none"
            placeholder="Add details about this task..."
          />
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <label htmlFor="dueDate" className="block text-sm font-medium text-blue-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
          />
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-700">Priority</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPriority('green')}
              className={`px-4 py-2 rounded-md border transition-all ${
                priority === 'green'
                  ? 'bg-green-500 text-white border-green-600'
                  : 'bg-white border-green-400 text-green-600'
              } hover:shadow-md`}
            >
              Low
            </button>

            <button
              type="button"
              onClick={() => setPriority('yellow')}
              className={`px-4 py-2 rounded-md border transition-all ${
                priority === 'yellow'
                  ? 'bg-yellow-400 text-white border-yellow-500'
                  : 'bg-white border-yellow-400 text-yellow-600'
              } hover:shadow-md`}
            >
              Medium
            </button>

            <button
              type="button"
              onClick={() => setPriority('red')}
              className={`px-4 py-2 rounded-md border transition-all ${
                priority === 'red'
                  ? 'bg-red-500 text-white border-red-600'
                  : 'bg-white border-red-400 text-red-600'
              } hover:shadow-md`}
            >
              High
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className={`w-full flex items-center justify-center rounded-md px-4 py-3 text-white font-medium ${
            loading || !title.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transform hover:scale-105 transition-all'
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Adding Task...
            </>
          ) : (
            'Add Task'
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;



