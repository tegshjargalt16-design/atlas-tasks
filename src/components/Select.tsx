import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  icon?: ReactNode;
  value: string;
  options: Option[]; // first option (value "") is the "All ..." option
  onChange: (v: string) => void;
}

export default function Select({ icon, value, options, onChange }: Props) {
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

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="dropdown" ref={ref}>
      <button className={`select ${value ? "active" : ""}`} onClick={() => setOpen(!open)}>
        {icon} {current.label} <ChevronDown size={12} />
      </button>
      {open && (
        <ul className="menu">
          {options.map((o) => (
            <li key={o.value}>
              <button
                className={o.value === value ? "on" : ""}
                onClick={() => { onChange(o.value); setOpen(false); }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
