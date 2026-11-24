import { useMemo, useState } from "react";
import { LayoutGrid, List, Plus, Calendar } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskTable, { Sort, SortKey } from "../components/TaskTable";
import TaskGrid from "../components/TaskGrid";
import TaskModal from "../components/TaskModal";
import Select from "../components/Select";
import Pagination from "../components/Pagination";
import { formatMonth, PRIORITIES, Status, STATUSES, Task } from "../data/tasks";
import { useTasks } from "../data/useTasks";

const PAGE_SIZE = 10;
const tabLabel: Record<Status, string> = {
  "To Do": "To Do",
  "In Progress": "In Progress",
  Complete: "Completed",
  Overdue: "Overdue",
};
const statusRank: Record<Status, number> = { "To Do": 0, "In Progress": 1, Complete: 2, Overdue: 3 };
const priorityRank: Record<string, number> = { High: 0, Medium: 1, Low: 2 };

function compare(a: Task, b: Task, key: SortKey): number {
  switch (key) {
    case "status": return statusRank[a.status] - statusRank[b.status];
    case "priority": return priorityRank[a.priority] - priorityRank[b.priority];
    default: return a[key].localeCompare(b[key]);
  }
}

export default function MyTasks() {
  const { tasks, addTask, setStatus, removeTask } = useTasks();

  const [view, setView] = useState<"list" | "grid">("list");
  const [query, setQuery] = useState("");
  const [project, setProject] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatusFilter] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState<Sort | null>(null);
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);

  const projectOptions = useMemo(
    () => [{ value: "", label: "All Project" }, ...Array.from(new Set(tasks.map((t) => t.project))).sort().map((p) => ({ value: p, label: p }))],
    [tasks]
  );
  const monthOptions = useMemo(
    () => [{ value: "", label: "All Time" }, ...Array.from(new Set(tasks.map((t) => t.due.slice(0, 7)))).sort().map((m) => ({ value: m, label: formatMonth(m) }))],
    [tasks]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = tasks.filter(
      (t) =>
        (!status || t.status === status) &&
        (!project || t.project === project) &&
        (!month || t.due.startsWith(month)) &&
        (!priority || t.priority === priority) &&
        (!q || `${t.title} ${t.project}`.toLowerCase().includes(q))
    );
    if (!sort) return list;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => dir * compare(a, b, sort.key));
  }, [tasks, query, project, month, status, priority, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const count = (s: Status) => tasks.filter((t) => t.status === s).length;

  // any filter change should go back to page 1
  const withReset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1); };

  const onSort = (key: SortKey) => {
    setSort((s) => (s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));
  };

  return (
    <div className="layout">
      <Sidebar taskCount={tasks.length} />
      <div className="main">
        <Topbar query={query} onQuery={withReset(setQuery)} onCreate={() => setCreating(true)} />
        <section className="content">
          <div className="title-row">
            <h1>My Tasks</h1>
            <button className="btn-primary" onClick={() => setCreating(true)}>
              <Plus size={14} /> Create New Task
            </button>
          </div>

          <div className="toolbar">
            <div className="view-toggle">
              <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")} aria-label="Grid view"><LayoutGrid size={14} /></button>
              <button className={view === "list" ? "on" : ""} onClick={() => setView("list")} aria-label="List view"><List size={14} /></button>
            </div>
            <div className="filters">
              <Select value={project} options={projectOptions} onChange={withReset(setProject)} />
              <Select icon={<Calendar size={12} />} value={month} options={monthOptions} onChange={withReset(setMonth)} />
              <Select
                value={status}
                options={[{ value: "", label: "All Status" }, ...STATUSES.map((s) => ({ value: s, label: tabLabel[s] }))]}
                onChange={withReset(setStatusFilter)}
              />
              <Select
                value={priority}
                options={[{ value: "", label: "All Priority" }, ...PRIORITIES.map((p) => ({ value: p, label: p }))]}
                onChange={withReset(setPriority)}
              />
            </div>
          </div>

          <div className="stat-tabs">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`stat ${status === s ? "on" : ""}`}
                onClick={() => { setStatusFilter(status === s ? "" : s); setPage(1); }}
              >
                <span>{tabLabel[s]}</span>
                <b>{count(s)}</b>
              </button>
            ))}
          </div>

          {view === "list" ? (
            <TaskTable rows={rows} sort={sort} onSort={onSort} onStatus={setStatus} onDelete={removeTask} />
          ) : (
            <TaskGrid rows={rows} onStatus={setStatus} onDelete={removeTask} />
          )}
          <Pagination page={safePage} pages={pages} total={filtered.length} onChange={setPage} />
        </section>
      </div>

      {creating && <TaskModal projects={tasks} onSubmit={addTask} onClose={() => setCreating(false)} />}
    </div>
  );
}
