import { useCallback, useEffect, useMemo, useState } from "react";
import { getTasks, updateTask } from "@/shared/api/tasks";

import { AddTask } from "@/features/AddTask";
import { EditTask } from "@/features/EditTask";
import { DeleteTask } from "@/features/DeleteTask";
import { AddedTask } from "@/entities/Task";

export const TasksPanel = ({ eventId, onCountChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const data = await getTasks(eventId);
      setTasks(data);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ✅ count (например, невыполненные)
  const openCount = useMemo(
    () => tasks.filter((t) => t.done !== true).length,
    [tasks]
  );

  useEffect(() => {
    onCountChange?.(openCount);
  }, [openCount, onCountChange]);

  const handleToggleTask = async (task) => {
    try {
      const nextDone = !task.done;

      // optimistic UI
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, done: nextDone } : t))
      );

      const result = await updateTask(eventId, task._id, { done: nextDone });
      const updated = result?.task ?? result;

      // normalize from server
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update task");
      loadTasks(); // rollback через перезагрузку
    }
  };

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        border: "1px solid #eee",
      }}
    >
      {/* ✅ AddTask теперь работает через API */}
      <AddTask eventId={eventId} onCreated={loadTasks} />

      {loading && (
        <p style={{ fontSize: "14px", color: "#777", margin: "8px 0 0" }}>
          Lade Aufgaben…
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: 8 }}>
        {!loading && tasks.length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Aufgaben. Füge die erste Aufgabe hinzu ✨
          </p>
        )}

        {tasks.map((task) => (
          <AddedTask
            key={task._id}
            task={task}
            onToggle={() => handleToggleTask(task)}
            onDelete={undefined}
            extraActions={
              <>
                <EditTask
                  eventId={eventId}
                  task={task}
                  onUpdated={loadTasks}
                />
                <DeleteTask
                  eventId={eventId}
                  taskId={task._id}
                  onDeleted={loadTasks}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};