import { useEffect, useState } from "react";
import type { Filter, SortKey, Task } from "./types";
import { loadNextId, loadTasks, saveNextId, saveTasks } from "./storage";
import {
  addTask,
  filterTasks,
  removeTask,
  searchTasks,
  sortTasks,
  toggleComplete,
} from "./taskUtils";
import type { NewTaskInput } from "./taskUtils";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  // フィルタ -> 検索 -> ソート の順で適用
  const filtered = filterTasks(tasks, filter, today);
  const searched = searchTasks(filtered, searchQuery);
  const visibleTasks = sortTasks(searched, sortKey);

  return (
    <div className="app">
      {/* Top Application Header */}
      <header className="app-header">
        <div className="app-header__brand">
          <div className="app-header__logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="app-header__logo-svg">
              <rect width="24" height="24" rx="7" fill="url(#logo-grad)" />
              <path
                d="M7 12.5l3.5 3.5 6.5-7"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <div className="app-header__badge">TEAM WORKSPACE</div>
            <h1 className="app-header__title">チーム共有タスク管理</h1>
          </div>
        </div>
      </header>

      {/* Overview Statistics Dashboard */}
      <TaskStats
        tasks={tasks}
        today={today}
        currentFilter={filter}
        onSelectFilter={(f) => setFilter(f)}
      />

      {/* Task Creation Card */}
      <TaskForm onAdd={handleAdd} />

      {/* Interactive Control & Search Bar */}
      <section className="control-panel" aria-label="検索と表示切り替え">
        {/* Search Bar */}
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-bar__icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="search-bar__input"
            placeholder="タスク名や担当者で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-bar__clear"
              onClick={() => setSearchQuery("")}
              aria-label="検索文字をクリア"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills & Sort Select */}
        <div className="control-panel__actions">
          {/* Segmented Filter Buttons */}
          <div className="segmented-filter" role="tablist" aria-label="タスク絞り込み">
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              className={`segmented-filter__item ${filter === "all" ? "segmented-filter__item--active" : ""}`}
              onClick={() => setFilter("all")}
            >
              すべて
              <span className="segmented-filter__count">{tasks.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "active"}
              className={`segmented-filter__item ${filter === "active" ? "segmented-filter__item--active" : ""}`}
              onClick={() => setFilter("active")}
            >
              進行中
              <span className="segmented-filter__count">
                {tasks.filter((t) => !t.completed).length}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "completed"}
              className={`segmented-filter__item ${filter === "completed" ? "segmented-filter__item--active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              完了
              <span className="segmented-filter__count">
                {tasks.filter((t) => t.completed).length}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "overdue"}
              className={`segmented-filter__item segmented-filter__item--overdue ${
                filter === "overdue" ? "segmented-filter__item--active" : ""
              }`}
              onClick={() => setFilter("overdue")}
            >
              期限切れ
              <span className="segmented-filter__count">
                {tasks.filter((t) => !t.completed && t.dueDate < today).length}
              </span>
            </button>
          </div>

          {/* Sort Selection */}
          <div className="sort-selector">
            <label htmlFor="task-sort" className="sort-selector__label">
              並び替え:
            </label>
            <div className="sort-selector__wrap">
              <select
                id="task-sort"
                className="sort-selector__select"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
              >
                <option value="dueDate">締切が近い順</option>
                <option value="priority">優先度が高い順</option>
                <option value="title">五十音順（タイトル）</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Task List Header with Task Count */}
      <div className="task-list-header">
        <h2 className="task-list-header__title">
          タスク一覧
          <span className="task-list-header__badge">{visibleTasks.length} 件</span>
        </h2>
        {searchQuery && (
          <span className="task-list-header__filter-hint">
            「{searchQuery}」の検索結果
          </span>
        )}
      </div>

      {/* Task List Section */}
      <TaskList
        tasks={visibleTasks}
        totalTasksCount={tasks.length}
        searchQuery={searchQuery}
        today={today}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    </div>
  );
}
