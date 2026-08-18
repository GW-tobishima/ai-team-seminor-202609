import { useEffect, useState } from "react";
import type { Filter, SortKey, Task } from "./types";
import { loadNextId, loadTasks, saveNextId, saveTasks } from "./storage";
import { addTask, filterTasks, removeTask, sortTasks, toggleComplete } from "./taskUtils";
import type { NewTaskInput } from "./taskUtils";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function todayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [nextId, setNextId] = useState<number>(() => loadNextId());
  const [filter, setFilter] = useState<Filter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveNextId(nextId);
  }, [nextId]);

  const today = todayString();

  function handleAdd(input: NewTaskInput) {
    setTasks((prev) => addTask(prev, input, String(nextId)));
    setNextId((prev) => prev + 1);
  }

  function handleToggle(id: string) {
    setTasks((prev) => toggleComplete(prev, id));
  }

  function handleRemove(id: string) {
    setTasks((prev) => removeTask(prev, id));
  }

  const visibleTasks = sortTasks(filterTasks(tasks, filter), sortKey);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">チーム共有タスク管理</h1>
        <div className="app__controls">
          <label className="app__control">
            フィルタ:
            <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
              <option value="all">すべて</option>
              <option value="active">未完了のみ</option>
              <option value="completed">完了のみ</option>
            </select>
          </label>
          <label className="app__control">
            並び替え:
            <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
              <option value="dueDate">締切順</option>
              <option value="priority">優先度順</option>
            </select>
          </label>
        </div>
      </header>

      <TaskForm onAdd={handleAdd} />

      <TaskList tasks={visibleTasks} today={today} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
}
