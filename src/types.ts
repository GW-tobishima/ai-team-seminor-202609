export interface Task {
  id: string; // 連番の数値文字列 "1","2",...(nextId を localStorage で管理)
  title: string;
  assignee: string;
  priority: 1 | 2 | 3; // 1=高 2=中 3=低
  dueDate: string; // "YYYY-MM-DD"
  completed: boolean;
  createdAt: string; // ISO文字列
}

export type Filter = "all" | "active" | "completed" | "overdue";

export type SortKey = "dueDate" | "priority" | "title";
