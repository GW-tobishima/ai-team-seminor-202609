import type { Task } from "./types";

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

/**
 * 初回起動時(localStorage が空のとき)に投入する seed データ。
 * 未完了4件 + 完了3件、うち期限切れ2件・今日締切1件。
 * id は連番の数値文字列 "1"〜"7"。
 */
export function createSeedTasks(): Task[] {
  const now = new Date().toISOString();

  return [
    {
      id: "1",
      title: "API仕様レビュー依頼への回答",
      assignee: "佐藤",
      priority: 1,
      dueDate: offsetDate(-5),
      completed: false,
      createdAt: now,
    },
    {
      id: "2",
      title: "顧客向け週次レポートの作成",
      assignee: "田中",
      priority: 2,
      dueDate: offsetDate(-2),
      completed: false,
      createdAt: now,
    },
    {
      id: "3",
      title: "リリースノートの最終確認",
      assignee: "鈴木",
      priority: 1,
      dueDate: offsetDate(0),
      completed: false,
      createdAt: now,
    },
    {
      id: "4",
      title: "新メンバー向けオンボーディング資料の更新",
      assignee: "高橋",
      priority: 3,
      dueDate: offsetDate(5),
      completed: false,
      createdAt: now,
    },
    {
      id: "5",
      title: "定例ミーティングの議事録共有",
      assignee: "伊藤",
      priority: 2,
      dueDate: offsetDate(-3),
      completed: true,
      createdAt: now,
    },
    {
      id: "6",
      title: "経費精算の提出",
      assignee: "渡辺",
      priority: 3,
      dueDate: offsetDate(1),
      completed: true,
      createdAt: now,
    },
    {
      id: "7",
      title: "社内勉強会の会場予約",
      assignee: "山本",
      priority: 2,
      dueDate: offsetDate(-10),
      completed: true,
      createdAt: now,
    },
  ];
}
