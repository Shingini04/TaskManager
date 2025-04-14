import React, { useState } from 'react';
import TaskList from './TaskList';
import PriorityDashboard from './PriorityDashboard';

const Toggle = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="h-[570px] flex flex-col">
      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'tasks'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('tasks')}
        >
          Task List
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'priority'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('priority')}
        >
          Priority List
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === 'tasks' ? <TaskList /> : <PriorityDashboard />}
      </div>
    </div>
  );
};

export default Toggle;

