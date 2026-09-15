import { useState } from "react";
import type { FormEvent } from "react";
import type { NewTaskInput } from "../taskUtils";

interface TaskFormProps {
  onAdd: (input: NewTaskInput) => void;
}

const COMMON_ASSIGNEES = ["佐藤", "田中", "鈴木", "高橋", "伊藤", "渡辺"];

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getOffsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(2);
  const [dueDate, setDueDate] = useState(() => getOffsetDate(0));
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    onAdd({
      title: title.trim(),
      assignee: assignee.trim() || "未定",
      priority,
      dueDate,
    });
    setTitle("");
    setAssignee("");
    setPriority(2);
    setDueDate(getOffsetDate(0));
  }

  function handleQuickDate(days: number) {
    setDueDate(getOffsetDate(days));
  }

  return (
    <div className="task-form-card">
      <div className="task-form-card__header">
        <h2 className="task-form-card__title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="task-form-card__title-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          新規タスクの作成
        </h2>
        <button
          type="button"
          className="task-form-card__toggle-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "オプションを閉じる" : "詳細設定"}
        </button>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="task-form__main-row">
          <div className="task-form__input-group task-form__input-group--title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="task-form__field-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <input
              className="task-form__input task-form__title"
              type="text"
              placeholder="何に取り組みますか？（例: 新機能のリリース準備）"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="task-form__input-group task-form__input-group--assignee">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="task-form__field-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              className="task-form__input task-form__assignee"
              type="text"
              placeholder="担当者（省略可）"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
          </div>

          <div className="task-form__input-group task-form__input-group--date">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="task-form__field-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              className="task-form__input task-form__due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="task-form__submit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="task-form__submit-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>追加</span>
          </button>
        </div>

        {/* Priority Segment Buttons */}
        <div className="task-form__priority-row">
          <span className="task-form__section-label">優先度:</span>
          <div className="task-form__priority-group" role="radiogroup" aria-label="優先度選択">
            <button
              type="button"
              role="radio"
              aria-checked={priority === 1}
              className={`priority-btn priority-btn--1 ${
                priority === 1 ? "priority-btn--selected" : ""
              }`}
              onClick={() => setPriority(1)}
            >
              <span className="priority-btn__dot" />
              高（至急）
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={priority === 2}
              className={`priority-btn priority-btn--2 ${
                priority === 2 ? "priority-btn--selected" : ""
              }`}
              onClick={() => setPriority(2)}
            >
              <span className="priority-btn__dot" />
              中（標準）
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={priority === 3}
              className={`priority-btn priority-btn--3 ${
                priority === 3 ? "priority-btn--selected" : ""
              }`}
              onClick={() => setPriority(3)}
            >
              <span className="priority-btn__dot" />
              低（通常）
            </button>
          </div>

          <div className="task-form__quick-dates">
            <span className="task-form__section-label">期限ショートカット:</span>
            <button
              type="button"
              className="quick-chip"
              onClick={() => handleQuickDate(0)}
            >
              今日
            </button>
            <button
              type="button"
              className="quick-chip"
              onClick={() => handleQuickDate(1)}
            >
              明日
            </button>
            <button
              type="button"
              className="quick-chip"
              onClick={() => handleQuickDate(7)}
            >
              1週間後
            </button>
          </div>
        </div>

        {/* Quick Assignee Chips (展開時) */}
        {isExpanded && (
          <div className="task-form__expanded-row">
            <span className="task-form__section-label">クイック担当者選択:</span>
            <div className="task-form__assignee-chips">
              {COMMON_ASSIGNEES.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`quick-chip ${assignee === name ? "quick-chip--selected" : ""}`}
                  onClick={() => setAssignee(name)}
                >
                  <span className="quick-chip__avatar">{name.slice(0, 1)}</span>
                  {name}
                </button>
              ))}
              {assignee && (
                <button
                  type="button"
                  className="quick-chip quick-chip--clear"
                  onClick={() => setAssignee("")}
                >
                  クリア
                </button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
