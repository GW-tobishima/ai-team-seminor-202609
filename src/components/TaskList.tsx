import type { Task } from "../types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  totalTasksCount: number;
  searchQuery: string;
  today: string;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TaskList({
  tasks,
  totalTasksCount,
  searchQuery,
  today,
  onToggle,
  onRemove,
}: TaskListProps) {
  if (tasks.length === 0) {
    if (searchQuery.trim()) {
      return (
        <div className="task-empty-state">
          <div className="task-empty-state__icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="task-empty-state__icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="task-empty-state__title">検索結果が見つかりません</h3>
          <p className="task-empty-state__desc">
            「{searchQuery}」に一致するタスクはありません。検索条件を変更してみてください。
          </p>
        </div>
      );
    }

    if (totalTasksCount > 0) {
      return (
        <div className="task-empty-state task-empty-state--celebrate">
          <div className="task-empty-state__icon-wrap task-empty-state__icon-wrap--celebrate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="task-empty-state__icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="task-empty-state__title">この条件のタスクはありません</h3>
          <p className="task-empty-state__desc">
            お疲れ様です！このカテゴリのタスクはすべて完了しているか、登録されていません。
          </p>
        </div>
      );
    }

    return (
      <div className="task-empty-state">
        <div className="task-empty-state__icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="task-empty-state__icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="task-empty-state__title">タスクが登録されていません</h3>
        <p className="task-empty-state__desc">
          上のフォームから新しいタスクを追加して、チームで共有しましょう。
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          today={today}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
