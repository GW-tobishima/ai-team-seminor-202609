import { useState } from "react";
import type { FormEvent } from "react";
import type { NewTaskInput } from "../taskUtils";

interface TaskFormProps {
  onAdd: (input: NewTaskInput) => void;
}

function todayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(2);
  const [dueDate, setDueDate] = useState(todayString());

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    onAdd({ title: title.trim(), assignee: assignee.trim(), priority, dueDate });
    setTitle("");
    setAssignee("");
    setPriority(2);
    setDueDate(todayString());
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__title"
        type="text"
        placeholder="タスク名"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="task-form__assignee"
        type="text"
        placeholder="担当者"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <select
        className="task-form__priority"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
      >
        <option value={1}>高</option>
        <option value={2}>中</option>
        <option value={3}>低</option>
      </select>
      <input
        className="task-form__due-date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit" className="task-form__submit">
        追加
      </button>
    </form>
  );
}
