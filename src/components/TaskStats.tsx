import type { Filter, Task } from "../types";
import { isOverdue } from "../taskUtils";

interface TaskStatsProps {
  tasks: Task[];
  today: string;
  currentFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

export function TaskStats({
  tasks,
  today,
  currentFilter,
  onSelectFilter,
}: TaskStatsProps) {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const overdueCount = tasks.filter((t) => isOverdue(t, today)).length;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="stats-dashboard" aria-label="タスク統計サマリー">
      <div className="stats-grid">
        <button
          type="button"
          className={`stat-card stat-card--total ${
            currentFilter === "all" ? "stat-card--active" : ""
          }`}
          onClick={() => onSelectFilter("all")}
        >
          <div className="stat-card__icon stat-card__icon--total" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">全タスク</span>
            <span className="stat-card__value">{totalCount}</span>
          </div>
        </button>

        <button
          type="button"
          className={`stat-card stat-card--active-tasks ${
            currentFilter === "active" ? "stat-card--active" : ""
          }`}
          onClick={() => onSelectFilter("active")}
        >
          <div className="stat-card__icon stat-card__icon--active" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">進行中</span>
            <span className="stat-card__value">{activeCount}</span>
          </div>
        </button>

        <button
          type="button"
          className={`stat-card stat-card--overdue ${
            currentFilter === "overdue" ? "stat-card--active" : ""
          }`}
          onClick={() => onSelectFilter("overdue")}
        >
          <div className="stat-card__icon stat-card__icon--overdue" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__label-wrap">
              <span className="stat-card__label">期限切れ</span>
              {overdueCount > 0 && (
                <span className="stat-card__badge-pulse">要注意</span>
              )}
            </div>
            <span className="stat-card__value stat-card__value--danger">
              {overdueCount}
            </span>
          </div>
        </button>

        <button
          type="button"
          className={`stat-card stat-card--completed ${
            currentFilter === "completed" ? "stat-card--active" : ""
          }`}
          onClick={() => onSelectFilter("completed")}
        >
          <div className="stat-card__icon stat-card__icon--completed" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">完了済み</span>
            <span className="stat-card__value stat-card__value--success">
              {completedCount}
            </span>
          </div>
        </button>
      </div>

      <div className="progress-section">
        <div className="progress-section__header">
          <div className="progress-section__title">
            <span>タスク達成率</span>
            <span className="progress-section__fraction">
              {completedCount} / {totalCount} 完了
            </span>
          </div>
          <span className="progress-section__percentage">{completionRate}%</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-bar"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </section>
  );
}
