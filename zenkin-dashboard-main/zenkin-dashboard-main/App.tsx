
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { Task, Status, COLUMNS, Priority } from './types';
import Column from './components/Column';
import TaskCard from './components/TaskCard';
import Header from './components/Header';
import AddTaskModal from './components/AddTaskModal';

const LOCAL_STORAGE_KEY = 'zenkanban_tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    }
  }, []);

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const addTask = useCallback((content: string, priority: Priority) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      priority,
      status: 'todo',
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTaskContent = useCallback((id: string, newContent: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, content: newContent } : t));
  }, []);

  const moveTaskDirectly = useCallback((id: string, nextStatus: Status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Check if dragging over a column
    const isOverAColumn = COLUMNS.some(col => col.id === overId);
    
    if (isOverAColumn) {
      const overStatus = overId as Status;
      if (activeTask.status !== overStatus) {
        setTasks(prev => prev.map(t => 
          t.id === activeId ? { ...t, status: overStatus } : t
        ));
      }
      return;
    }

    // Check if dragging over another task
    const overTask = tasks.find(t => t.id === overId);
    if (overTask && activeTask.status !== overTask.status) {
      setTasks(prev => prev.map(t => 
        t.id === activeId ? { ...t, status: overTask.status } : t
      ));
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeIndex = tasks.findIndex(t => t.id === activeId);
    const overIndex = tasks.findIndex(t => t.id === overId);

    if (overIndex !== -1) {
      setTasks(prev => arrayMove(prev, activeIndex, overIndex));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        onAddTaskClick={() => setIsModalOpen(true)}
      />

      <main className="flex-1 p-4 md:p-8 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex gap-6 min-w-max h-full pb-8">
            {COLUMNS.map(column => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={filteredTasks.filter(t => t.status === column.id)}
                color={column.color}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTaskContent}
                onMoveTask={moveTaskDirectly}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.5',
                },
              },
            }),
          }}>
            {activeTask ? (
              <TaskCard 
                task={activeTask} 
                onDelete={() => {}} 
                onUpdate={() => {}} 
                isOverlay 
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {isModalOpen && (
        <AddTaskModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={addTask} 
        />
      )}
    </div>
  );
};

export default App;
