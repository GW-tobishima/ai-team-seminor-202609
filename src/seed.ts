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
 * 未完了10件 + 完了6件、うち期限切れ4件・今日締切2件。
 * id は連番の数値文字列 "1"〜"16"。
 */
export function createSeedTasks(): Task[] {
  const now = new Date().toISOString();

  return [
    {
      id: "1",
      title: "本番環境の証明書更新",
      assignee: "佐藤",
      priority: 1,
      dueDate: offsetDate(-5),
      completed: false,
      createdAt: now,
    },
    {
      id: "2",
      title: "障害報告書のレビュー",
      assignee: "田中",
      priority: 2,
      dueDate: offsetDate(-3),
      completed: false,
      createdAt: now,
    },
    {
      id: "3",
      title: "顧客からの問い合わせ対応",
      assignee: "鈴木",
      priority: 1,
      dueDate: offsetDate(-1),
      completed: false,
      createdAt: now,
    },
    {
      id: "4",
      title: "月次バックアップの動作確認",
      assignee: "高橋",
      priority: 3,
      dueDate: offsetDate(-8),
      completed: false,
      createdAt: now,
    },
    {
      id: "5",
      title: "リリース判定会議の資料準備",
      assignee: "伊藤",
      priority: 1,
      dueDate: offsetDate(0),
      completed: false,
      createdAt: now,
    },
    {
      id: "6",
      title: "SQLインデックス追加の効果測定",
      assignee: "渡辺",
      priority: 2,
      dueDate: offsetDate(0),
      completed: false,
      createdAt: now,
    },
    {
      id: "7",
      title: "新人研修用資料の校正",
      assignee: "山本",
      priority: 3,
      dueDate: offsetDate(1),
      completed: false,
      createdAt: now,
    },
    {
      id: "8",
      title: "APIレート制限の見直し",
      assignee: "中村",
      priority: 2,
      dueDate: offsetDate(5),
      completed: false,
      createdAt: now,
    },
    {
      id: "9",
      title: "セキュリティ診断の指摘事項対応",
      assignee: "小林",
      priority: 1,
      dueDate: offsetDate(9),
      completed: false,
      createdAt: now,
    },
    {
      id: "10",
      title: "次期スプリント計画の叩き台作成",
      assignee: "加藤",
      priority: 3,
      dueDate: offsetDate(14),
      completed: false,
      createdAt: now,
    },
    {
      id: "11",
      title: "社内勉強会の会場予約",
      assignee: "佐藤",
      priority: 2,
      dueDate: offsetDate(-10),
      completed: true,
      createdAt: now,
    },
    {
      id: "12",
      title: "経費精算の提出",
      assignee: "田中",
      priority: 3,
      dueDate: offsetDate(-6),
      completed: true,
      createdAt: now,
    },
    {
      id: "13",
      title: "定例ミーティングの議事録共有",
      assignee: "鈴木",
      priority: 1,
      dueDate: offsetDate(-2),
      completed: true,
      createdAt: now,
    },
    {
      id: "14",
      title: "顧客向け週次レポートの作成",
      assignee: "高橋",
      priority: 2,
      dueDate: offsetDate(3),
      completed: true,
      createdAt: now,
    },
    {
      id: "15",
      title: "API仕様レビュー依頼への回答",
      assignee: "伊藤",
      priority: 1,
      dueDate: offsetDate(6),
      completed: true,
      createdAt: now,
    },
    {
      id: "16",
      title: "新メンバー向けオンボーディング資料の更新",
      assignee: "渡辺",
      priority: 3,
      dueDate: offsetDate(10),
      completed: true,
      createdAt: now,
    },
  ];
}
