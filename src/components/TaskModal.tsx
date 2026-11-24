import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Priority, PRIORITIES, Status, STATUSES, Task } from "../data/tasks";

const PALETTE = ["#1f4fe0", "#3fa66b", "#e0577a", "#e0a13a", "#8b5cf6", "#0ea5b7", "#f97316"];

interface Props {
  projects: Task[]; // existing tasks, used to reuse project names/colors
  onSubmit: (t: Omit<Task, "id">) => void;
  onClose: () => void;
}

export default function TaskModal({ projects, onSubmit, onClose }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [due, setDue] = useState(today);
  const [status, setStatus] = useState<Status>("To Do");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const names = Array.from(new Set(projects.map((t) => t.project)));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const p = project.trim();
    if (!t || !p || !due) {
      setError("Title, project and due date are required.");
      return;
    }
    const existing = projects.find((x) => x.project.toLowerCase() === p.toLowerCase());
    const color = existing?.color ?? PALETTE[names.length % PALETTE.length];
    onSubmit({ title: t, project: existing?.project ?? p, color, due, status, priority });
    onClose();
  };

  return (
    <div className="overlay" onMouseDown={onClose}>
      <form className="modal" onMouseDown={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className="modal-head">
          <h2>Create New Task</h2>
          <button type="button" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <label>Task title
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Write release notes" />
        </label>
        <label>Project
          <input list="project-names" value={project} onChange={(e) => setProject(e.target.value)} placeholder="Choose or type a project" />
          <datalist id="project-names">
            {names.map((n) => <option key={n} value={n} />)}
          </datalist>
        </label>
        <div className="row2">
          <label>Due date
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          </label>
          <label>Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>
        <label>Status
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>

        {error && <p className="form-error">{error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Create Task</button>
        </div>
      </form>
    </div>
  );
}
