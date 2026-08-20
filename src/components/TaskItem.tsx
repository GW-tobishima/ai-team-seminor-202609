import type { Task } from "../types";
import { isOverdue } from "../taskUtils";

interface TaskItemProps {
  task: Task;
  today: string;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const PRIORITY_LABEL: Record<1 | 2 | 3, string> = {
  1: "高",
  2: "中",
  3: "低",
};

export function TaskItem({ task, today, onToggle, onRemove }: TaskItemProps) {
  const overdue = isOverdue(task, today);

  return (
    <li className={`task-item${task.completed ? " task-item--completed" : ""}`}>
      <input
        type="checkbox"
        className="task-item__checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-item__title">{task.title}</span>
      <span className={`task-item__priority task-item__priority--${task.priority}`}>
        {PRIORITY_LABEL[task.priority]}
      </span>
      <span className="task-item__meta">
        <span className="task-item__assignee">担当: {task.assignee}</span>
        <span className="task-item__due-date">期限: {task.dueDate}</span>
      </span>
      {overdue && <span className="task-item__overdue-badge">期限切れ</span>}
      <button
        type="button"
        className="task-item__remove"
        onClick={() => onRemove(task.id)}
        aria-label="削除"
      >
        削除
      </button>
    </li>
  );
}
