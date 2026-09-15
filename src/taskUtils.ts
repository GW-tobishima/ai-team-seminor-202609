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

// ID指定またはindex指定でタスクを削除する(anyを排除して型安全に)
export function removeTask(tasks: Task[], target: string | number): Task[] {
  if (typeof target === "number") {
    const next = [...tasks];
    next.splice(target, 1);
    return next;
  }
  return tasks.filter((t) => t.id !== target);
}

/** タスク一覧をソートキーに従って並べ替えた新しい配列を返す(元の配列は変更しない)。 */
export function sortTasks(tasks: Task[], sortKey: SortKey): Task[] {
  const sorted = [...tasks];
  if (sortKey === "dueDate") {
    sorted.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  } else if (sortKey === "priority") {
    sorted.sort((a, b) => a.priority - b.priority);
  } else if (sortKey === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title, "ja"));
  }
  return sorted;
}

/** 未完了かつ締切日が今日より前であれば true を返す。 */
export function isOverdue(task: Task, today: string): boolean {
  return !task.completed && task.dueDate < today;
}

/** 締切日と今日の日付から、直感的な相対日時の情報とラベルを算出する。 */
export function getDueDateInfo(dueDate: string, today: string): {
  label: string;
  diffDays: number;
  isOverdue: boolean;
  isToday: boolean;
  isTomorrow: boolean;
} {
  const target = new Date(`${dueDate}T00:00:00`);
  const current = new Date(`${today}T00:00:00`);
  const diffTime = target.getTime() - current.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const isToday = diffDays === 0;
  const isTomorrow = diffDays === 1;
  const isOverdue = diffDays < 0;

  let label = "";
  if (isToday) {
    label = "今日締切";
  } else if (isTomorrow) {
    label = "明日締切";
  } else if (diffDays > 1 && diffDays <= 7) {
    label = `あと${diffDays}日`;
  } else if (diffDays > 7) {
    label = dueDate;
  } else if (diffDays === -1) {
    label = "昨日 (1日超過)";
  } else {
    label = `${Math.abs(diffDays)}日超過`;
  }

  return { label, diffDays, isOverdue, isToday, isTomorrow };
}

/** フィルタ条件に応じてタスク一覧を絞り込んだ配列を返す。 */
export function filterTasks(tasks: Task[], filter: Filter, today: string = ""): Task[] {
  if (filter === "active") {
    return tasks.filter((t) => !t.completed);
  }
  if (filter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  if (filter === "overdue") {
    return tasks.filter((t) => isOverdue(t, today));
  }
  return tasks;
}

/** タイトルや担当者名でタスクを部分一致検索する。 */
export function searchTasks(tasks: Task[], query: string): Task[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return tasks;
  }
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q)
  );
}
