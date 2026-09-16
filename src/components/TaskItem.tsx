import type { Task } from "../types";
import { getDueDateInfo } from "../taskUtils";

interface TaskItemProps {
  task: Task;
  today: string;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const PRIORITY_CONFIG: Record<
  1 | 2 | 3,
  { label: string; textClass: string; dotColor: string }
> = {
  1: { label: "高優先度", textClass: "priority-pill--high", dotColor: "#ef4444" },
  2: { label: "中優先度", textClass: "priority-pill--medium", dotColor: "#f59e0b" },
  3: { label: "低優先度", textClass: "priority-pill--low", dotColor: "#0ea5e9" },
};

// 担当者名から一意なアバター背景色を決定
function getAvatarColor(name: string): string {
  const colors = [
    "linear-gradient(135deg, #6366f1, #4f46e5)",
    "linear-gradient(135deg, #ec4899, #d946ef)",
    "linear-gradient(135deg, #06b6d4, #0284c7)",
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #f59e0b, #d97706)",
    "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  ];
  if (!name || name === "未定") {
    return "linear-gradient(135deg, #94a3b8, #64748b)";
  }
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function TaskItem({ task, today, onToggle, onRemove }: TaskItemProps) {
  const dueInfo = getDueDateInfo(task.dueDate, today);
  const priorityInfo = PRIORITY_CONFIG[task.priority];
  const avatarChar = (task.assignee || "未").slice(0, 1);

  return (
    <li
      className={`task-item ${task.completed ? "task-item--completed" : ""} ${
        !task.completed && dueInfo.isOverdue ? "task-item--is-overdue" : ""
      }`}
      data-priority={task.priority}
    >
      {/* Priority accent bar */}
      <span
        className={`task-item__accent-bar task-item__accent-bar--${task.priority}`}
        aria-hidden="true"
      />

      {/* Checkbox with custom animation */}
      <label className="task-item__checkbox-wrap" aria-label="完了切り替え">
        <input
          type="checkbox"
          className="task-item__checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__checkbox-custom" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="currentColor" className="task-item__check-icon">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>

      {/* Main Task Body */}
      <div className="task-item__main">
        <div className="task-item__title-row">
          <span className="task-item__title">{task.title}</span>
          <span className={`priority-pill ${priorityInfo.textClass}`}>
            <span
              className="priority-pill__dot"
              style={{ backgroundColor: priorityInfo.dotColor }}
              aria-hidden="true"
            />
            {priorityInfo.label}
          </span>
        </div>

        {/* Task Meta Information */}
        <div className="task-item__meta-row">
          <div className="task-item__assignee-badge">
            <span
              className="task-item__avatar"
              style={{ background: getAvatarColor(task.assignee) }}
              aria-hidden="true"
            >
              {avatarChar}
            </span>
            <span className="task-item__assignee-name">
              {task.assignee || "未定"}
            </span>
          </div>

          <div
            className={`task-item__due-badge ${
              !task.completed && dueInfo.isOverdue
                ? "task-item__due-badge--overdue"
                : dueInfo.isToday
                ? "task-item__due-badge--today"
                : ""
            }`}
            title={`締切日: ${task.dueDate}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="task-item__meta-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="task-item__due-text">期限: {task.dueDate}</span>
          </div>

          {!task.completed && dueInfo.isOverdue && (
            <span className="task-item__alert-badge">
              <svg viewBox="0 0 20 20" fill="currentColor" className="task-item__alert-icon">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {dueInfo.label}
            </span>
          )}

          {!task.completed && !dueInfo.isOverdue && dueInfo.isToday && (
            <span className="task-item__today-badge">
              今日締切
            </span>
          )}

          {!task.completed && !dueInfo.isOverdue && dueInfo.isTomorrow && (
            <span className="task-item__soon-badge">
              明日締切
            </span>
          )}

          {!task.completed && !dueInfo.isOverdue && dueInfo.diffDays > 1 && dueInfo.diffDays <= 7 && (
            <span className="task-item__soon-badge">
              あと{dueInfo.diffDays}日
            </span>
          )}
        </div>
      </div>

      {/* Delete action button */}
      <button
        type="button"
        className="task-item__delete-btn"
        onClick={() => onRemove(task.id)}
        aria-label={`タスク「${task.title}」を削除`}
        title="削除"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="task-item__delete-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span className="task-item__delete-text">削除</span>
      </button>
    </li>
  );
}
