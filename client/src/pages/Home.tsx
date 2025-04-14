import React from 'react';
import TaskForm from '../components/TaskForm';
import Toggle from '../components/Toggle';

const Home = () => {
  return (
    <div className="w-[1420px] h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800 px-4 sm:px-6 py-10 overflow-hidden relative">
      {/* Top decorative shape */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full opacity-30 -z-10" />

      <div>
        {/* Main title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            <span className="text-indigo-500">✓</span> Task Management
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          <p className="mt-4 text-gray-600">Organize your work. Simplify your life.</p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[680px]">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full overflow-hidden">
            <TaskForm />
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full overflow-hidden">
            <Toggle />
          </div>
        </div>
      </div>

      {/* Bottom decorative shape */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-50 rounded-tr-full opacity-30 -z-10" />

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
};

export default Home;


