import type { Task } from "./types";
import { createSeedTasks } from "./seed";

const TASKS_KEY = "team-tasks/v1";
const NEXT_ID_KEY = "team-tasks/v1/nextId";

/**
 * localStorage からタスク一覧を読み込む。
 * 初回起動時(データが存在しないとき)は seed データを投入して保存する。
 */
export function loadTasks(): Task[] {
  const raw = window.localStorage.getItem(TASKS_KEY);

  if (raw === null) {
    const seedTasks = createSeedTasks();
    saveTasks(seedTasks);
    saveNextId(seedTasks.length + 1);
    return seedTasks;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Task[];
    }
    return [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function loadNextId(): number {
  const raw = window.localStorage.getItem(NEXT_ID_KEY);
  if (raw === null) {
    return 1;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? 1 : parsed;
}

export function saveNextId(nextId: number): void {
  window.localStorage.setItem(NEXT_ID_KEY, String(nextId));
}
