
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, Status } from '../types';
import TaskCard from './TaskCard';

interface ColumnProps {
  id: Status;
  title: string;
  tasks: Task[];
  color: string;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, content: string) => void;
  onMoveTask: (id: string, next: Status) => void;
}

const Column: React.FC<ColumnProps> = ({ 
  id, 
  title, 
  tasks, 
  color, 
  onDeleteTask, 
  onUpdateTask,
  onMoveTask
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className="flex flex-col w-80 min-h-[500px] bg-slate-100/50 rounded-2xl border border-slate-200/60 p-4 transition-colors"
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h2 className="font-bold text-slate-700">{title}</h2>
          <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-semibold">
            {tasks.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={onDeleteTask} 
              onUpdate={onUpdateTask}
              onMove={onMoveTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 text-slate-400">
              <i className="fas fa-inbox text-3xl mb-2 opacity-20"></i>
              <p className="text-sm font-medium">No tasks</p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
