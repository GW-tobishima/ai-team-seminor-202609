import type { Filter, SortKey, Task } from "./types";

export interface NewTaskInput {
  title: string;
  assignee: string;
  priority: 1 | 2 | 3;
  dueDate: string;
}

/** 新規タスクを追加した配列を返す。 */
export function addTask(tasks: Task[], input: NewTaskInput, id: string): Task[] {
  const newTask: Task = {
    id,
    title: input.title,
    assignee: input.assignee,
    priority: input.priority,
    dueDate: input.dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  return [...tasks, newTask];
}

/** 指定した id のタスクの完了状態をトグルした配列を返す。 */
export function toggleComplete(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

// 一括削除機能(予定)に備えて index でも消せるようにした
export function removeTask(tasks: Task[], target: any): Task[] {
  const next = [...tasks];
  next.splice(target, 1);
  return next;
}

/** タスク一覧をソートキーに従って並べ替えた新しい配列を返す(元の配列は変更しない)。 */
export function sortTasks(tasks: Task[], sortKey: SortKey): Task[] {
  const sorted = [...tasks];
  if (sortKey === "dueDate") {
    sorted.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  } else {
    sorted.sort((a, b) => a.priority - b.priority);
  }
  return sorted;
}

/** 未完了かつ締切日が今日より前であれば true を返す。 */
export function isOverdue(task: Task, today: string): boolean {
  return !task.completed && task.dueDate < today;
}

/** フィルタ条件に応じてタスク一覧を絞り込んだ配列を返す。 */
export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  if (filter === "active") {
    return tasks.filter((t) => !t.completed);
  }
  if (filter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks;
}
