
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onAddTaskClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onAddTaskClick }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <i className="fas fa-columns text-white text-xl"></i>
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">ZenKanban</h1>
      </div>

      <div className="flex items-center gap-3 flex-1 md:max-w-md">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all outline-none text-slate-600 text-sm"
          />
        </div>
        <button
          onClick={onAddTaskClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-lg shadow-indigo-200"
        >
          <i className="fas fa-plus"></i>
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
