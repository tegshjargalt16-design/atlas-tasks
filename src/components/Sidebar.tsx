import { LayoutGrid, FolderKanban, CheckCircle2, Calendar, BarChart3, Users, Files, Plug, Settings, ChevronDown, ChevronUp } from "lucide-react";

const groups = [
  { label: "Projects", icon: FolderKanban },
  { label: "Tasks", icon: CheckCircle2 },
  { label: "Calendar", icon: Calendar },
  { label: "Analytics", icon: BarChart3 },
  { label: "Team", icon: Users },
  { label: "Files", icon: Files },
  { label: "Integrations", icon: Plug },
  { label: "Settings", icon: Settings },
];

export default function Sidebar({ taskCount }: { taskCount: number }) {
  return (
    <aside className="sidebar">
      <div className="logo">Atlas</div>

      <div className="nav-item">
        <LayoutGrid size={16} /> <span>Dashboard</span>
        <ChevronUp size={14} className="push" />
      </div>
      <div className="sub-item">Overview</div>
      <div className="sub-item active">
        My Tasks <span className="count">{taskCount}</span>
      </div>
      <div className="sub-item">Activity</div>

      {groups.map(({ label, icon: Icon }) => (
        <div className="nav-item" key={label}>
          <Icon size={16} /> <span>{label}</span>
          <ChevronDown size={14} className="push" />
        </div>
      ))}
    </aside>
  );
}
