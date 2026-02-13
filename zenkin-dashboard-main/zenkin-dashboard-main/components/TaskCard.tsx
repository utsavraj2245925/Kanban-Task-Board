
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Status } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  onMove?: (id: string, next: Status) => void;
  isOverlay?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onDelete, 
  onUpdate, 
  onMove,
  isOverlay 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-amber-500',
    low: 'border-l-emerald-500',
  };

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(task.id, editContent);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditContent(task.content);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white border border-slate-200 border-l-4 rounded-xl p-4 shadow-sm hover:shadow-md transition-all ${priorityColors[task.priority]} ${isOverlay ? 'cursor-grabbing shadow-xl ring-2 ring-indigo-500' : 'cursor-default'}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            task.priority === 'high' ? 'bg-red-50 text-red-600' : 
            task.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 
            'bg-emerald-50 text-emerald-600'
          }`}>
            {task.priority}
          </span>
          <div className="flex items-center gap-1">
             <button 
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Delete task"
            >
              <i className="fas fa-trash-alt text-xs"></i>
            </button>
            <div 
              {...attributes} 
              {...listeners}
              className="p-1.5 text-slate-400 hover:text-indigo-600 cursor-grab active:cursor-grabbing"
            >
              <i className="fas fa-grip-vertical text-xs"></i>
            </div>
          </div>
        </div>

        {isEditing ? (
          <textarea
            autoFocus
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full text-sm text-slate-700 bg-slate-50 p-2 rounded-lg border border-indigo-200 outline-none resize-none"
            rows={2}
          />
        ) : (
          <p 
            onClick={() => setIsEditing(true)}
            className="text-sm text-slate-700 font-medium leading-relaxed hover:bg-slate-50 p-1 rounded transition-colors cursor-text"
          >
            {task.content}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
           <div className="flex items-center gap-1">
              <i className="far fa-clock"></i>
              {new Date(task.createdAt).toLocaleDateString()}
           </div>
           
           {onMove && (
             <div className="flex gap-1">
               {task.status !== 'todo' && (
                 <button 
                   onClick={() => onMove(task.id, 'todo')}
                   className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                   title="Move to To Do"
                 >
                   <i className="fas fa-chevron-left"></i>
                 </button>
               )}
               {task.status === 'todo' && (
                 <button 
                   onClick={() => onMove(task.id, 'inprogress')}
                   className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                   title="Move to Progress"
                 >
                   <i className="fas fa-chevron-right"></i>
                 </button>
               )}
               {task.status === 'inprogress' && (
                  <>
                    <button 
                      onClick={() => onMove(task.id, 'todo')}
                      className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Move to To Do"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button 
                      onClick={() => onMove(task.id, 'done')}
                      className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Move to Done"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
               )}
               {task.status === 'done' && (
                 <button 
                   onClick={() => onMove(task.id, 'inprogress')}
                   className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                   title="Move back to Progress"
                 >
                   <i className="fas fa-undo"></i>
                 </button>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
