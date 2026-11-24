import { Priority, Status } from "../data/tasks";

const statusClass: Record<Status, string> = {
  "To Do": "todo",
  "In Progress": "progress",
  Complete: "complete",
  Overdue: "overdue",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status ${statusClass[status]}`}>
      <i /> {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className="priority">{priority}</span>;
}
