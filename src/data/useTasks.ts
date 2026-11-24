import { useCallback, useEffect, useState } from "react";
import { initialTasks, Status, Task } from "./tasks";

const KEY = "atlas-tasks:v1";

function load(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as Task[];
    }
  } catch {
    /* storage unavailable or corrupted -> fall back to seed data */
  }
  return initialTasks;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
      /* ignore */
    }
  }, [tasks]);

  const addTask = useCallback((t: Omit<Task, "id">) => {
    setTasks((prev) => [{ ...t, id: prev.reduce((m, x) => Math.max(m, x.id), 0) + 1 }, ...prev]);
  }, []);

  const setStatus = useCallback((id: number, status: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const reset = useCallback(() => setTasks(initialTasks), []);

  return { tasks, addTask, setStatus, removeTask, reset };
}
