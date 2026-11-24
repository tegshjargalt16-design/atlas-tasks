import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  pages: number;
  total: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, pages, total, onChange }: Props) {
  return (
    <div className="pagination">
      <div className="pager">
        <button disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={14} /></button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button key={p} className={p === page ? "on" : ""} onClick={() => onChange(p)}>{p}</button>
        ))}
        <button disabled={page >= pages} onClick={() => onChange(page + 1)}><ChevronRight size={14} /></button>
      </div>
      <div className="total">Total {total} Data</div>
    </div>
  );
}
