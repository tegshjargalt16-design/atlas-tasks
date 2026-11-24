import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, MoreVertical } from "lucide-react";
import { formatDate, Status, STATUSES, Task } from "../data/tasks";
import { PriorityBadge, StatusBadge } from "./Badges";

export type SortKey = "title" | "project" | "due" | "status" | "priority";
export interface Sort { key: SortKey; dir: "asc" | "desc" }

interface Props {
  rows: Task[];
  sort: Sort | null;
  onSort: (k: SortKey) => void;
  onStatus: (id: number, s: Status) => void;
  onDelete: (id: number) => void;
}

export function RowMenu({ task, onStatus, onDelete }: { task: Task; onStatus: Props["onStatus"]; onDelete: Props["onDelete"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="dropdown right" ref={ref}>
      <button className="icon-btn" onClick={() => setOpen(!open)} aria-label="Task actions">
        <MoreVertical size={16} />
      </button>
      {open && (
        <ul className="menu">
          {STATUSES.filter((s) => s !== task.status).map((s) => (
            <li key={s}>
              <button onClick={() => { onStatus(task.id, s); setOpen(false); }}>Mark as {s}</button>
            </li>
          ))}
          <li>
            <button className="danger" onClick={() => { onDelete(task.id); setOpen(false); }}>Delete task</button>
          </li>
        </ul>
      )}
    </div>
  );
}

const columns: { key: SortKey; label: string }[] = [
  { key: "title", label: "Task Title" },
  { key: "project", label: "Project" },
  { key: "due", label: "Due Date" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
];

export default function TaskTable({ rows, sort, onSort, onStatus, onDelete }: Props) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>
              <button className="th-btn" onClick={() => onSort(c.key)}>
                {c.label}
                {sort?.key === c.key && (sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
              </button>
            </th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td>{t.title}</td>
            <td>
              <span className="project">
                <span className="logo-dot" style={{ background: t.color }}>{t.project[0]}</span>
                {t.project}
              </span>
            </td>
            <td>{formatDate(t.due)}</td>
            <td><StatusBadge status={t.status} /></td>
            <td><PriorityBadge priority={t.priority} /></td>
            <td className="more"><RowMenu task={t} onStatus={onStatus} onDelete={onDelete} /></td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={6} className="empty">No tasks found.</td></tr>
        )}
      </tbody>
    </table>
  );
}
