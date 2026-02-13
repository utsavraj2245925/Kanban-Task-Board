
export type Priority = 'low' | 'medium' | 'high';

export type Status = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  content: string;
  status: Status;
  priority: Priority;
  createdAt: number;
}

export const COLUMNS: { id: Status; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
  { id: 'inprogress', title: 'In Progress', color: 'bg-amber-500' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];
