import { Search, Plus, HelpCircle, Bell, ChevronDown } from "lucide-react";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  onCreate: () => void;
}

export default function Topbar({ query, onQuery, onCreate }: Props) {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={14} />
        <input placeholder="Search" value={query} onChange={(e) => onQuery(e.target.value)} />
        <kbd>⌘ + F</kbd>
      </div>
      <div className="topbar-right">
        <button className="btn-outline" onClick={onCreate}>
          <Plus size={14} /> Create New
        </button>
        <HelpCircle size={18} className="icon" />
        <Bell size={18} className="icon" />
        <div className="user">
          <div className="avatar" />
          <div>
            <div className="user-name">Reyhan Adinata</div>
            <div className="user-role">Lead Product</div>
          </div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}
