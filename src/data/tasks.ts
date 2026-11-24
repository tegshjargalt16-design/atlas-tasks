export type Status = "To Do" | "In Progress" | "Complete" | "Overdue";
export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: number;
  title: string;
  project: string;
  color: string; // project logo color
  due: string; // ISO date: YYYY-MM-DD
  status: Status;
  priority: Priority;
}

export const STATUSES: Status[] = ["To Do", "In Progress", "Complete", "Overdue"];
export const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-01-10" -> "10 Jan 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
}

/** "2026-01" -> "Jan 2026" */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export const initialTasks: Task[] = [
  { id: 1, title: "Design System Audit", project: "Amazon Dashboard", color: "#ff9900", due: "2026-01-10", status: "Complete", priority: "High" },
  { id: 2, title: "Landing Page Copywriting", project: "Microsoft", color: "#00a4ef", due: "2026-01-12", status: "Complete", priority: "High" },
  { id: 3, title: "Mobile App Redesign", project: "Apple", color: "#555555", due: "2026-01-14", status: "Complete", priority: "High" },
  { id: 4, title: "Key Metrics Layout", project: "Facebook Dashboard", color: "#1877f2", due: "2026-01-16", status: "Overdue", priority: "Low" },
  { id: 5, title: "Wireframe v2 Upload", project: "Netflix", color: "#e50914", due: "2026-01-17", status: "In Progress", priority: "Low" },
  { id: 6, title: "QA Testing", project: "Nvidia", color: "#76b900", due: "2026-01-17", status: "In Progress", priority: "Low" },
  { id: 7, title: "Prototype Review", project: "Behance", color: "#1769ff", due: "2026-01-18", status: "In Progress", priority: "Medium" },
  { id: 8, title: "Copywriting Review", project: "Google Dashboard", color: "#ea4335", due: "2026-01-24", status: "To Do", priority: "Medium" },
  { id: 9, title: "UX Audit", project: "Grab Map App", color: "#00b14f", due: "2026-01-25", status: "To Do", priority: "Medium" },
  { id: 10, title: "Review Landing Page", project: "Lego", color: "#d01012", due: "2026-01-04", status: "Complete", priority: "Medium" },
];
