import { formatDate, Task } from "../data/tasks";
import { PriorityBadge, StatusBadge } from "./Badges";
import { RowMenu } from "./TaskTable";

interface Props {
  rows: Task[];
  onStatus: Parameters<typeof RowMenu>[0]["onStatus"];
  onDelete: Parameters<typeof RowMenu>[0]["onDelete"];
}

export default function TaskGrid({ rows, onStatus, onDelete }: Props) {
  if (rows.length === 0) return <div className="empty-card">No tasks found.</div>;
  return (
    <div className="task-grid">
      {rows.map((t) => (
        <article className="card" key={t.id}>
          <div className="card-top">
            <StatusBadge status={t.status} />
            <RowMenu task={t} onStatus={onStatus} onDelete={onDelete} />
          </div>
          <h3>{t.title}</h3>
          <span className="project">
            <span className="logo-dot" style={{ background: t.color }}>{t.project[0]}</span>
            {t.project}
          </span>
          <div className="card-foot">
            <span className="total">Due {formatDate(t.due)}</span>
            <PriorityBadge priority={t.priority} />
          </div>
        </article>
      ))}
    </div>
  );
}
