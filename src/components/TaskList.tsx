import type { Task } from "../types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  today: string;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TaskList({ tasks, today, onToggle, onRemove }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">タスクがありません。</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} today={today} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
