import { useCallback, useEffect, useState } from "react";
import { getTasks, updateTask } from "@/shared/api/tasks";
import { AddTask } from "@/features/AddTask";
import { EditTask } from "@/features/EditTask";
import { DeleteTask } from "@/features/DeleteTask";
import { AddedTask } from "@/entities/Task";
import styles from "./TasksPanel.module.scss";

export const TasksPanel = ({ eventId, onChanged }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const data = await getTasks(eventId);
      setTasks(Array.isArray(data) ? data : []);
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

  const handleToggleTask = async (task) => {
    try {
      const nextDone = !task.done;

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, done: nextDone } : t))
      );

      const result = await updateTask(eventId, task._id, { done: nextDone });
      const updated = result?.task ?? result;

      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));

      onChanged?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update task");
      loadTasks();
    }
  };

  return (
    <div className={styles.panelCont}>
      <AddTask
        eventId={eventId}
        onCreated={async () => {
          await loadTasks();
          onChanged?.();
        }}
      />

      {loading && (
        <p>Lade Aufgaben…</p>
      )}

      <div className={styles.rows}>
        {!loading && tasks.length === 0 && (
          <p>Noch keine Aufgaben. Füge die erste Aufgabe hinzu ✨</p>
        )}

        {tasks.map((task) => (
          <AddedTask
            key={task._id}
            task={task}
            onToggle={() => handleToggleTask(task)}
            onDelete={undefined}
            actions={
              <>
                <EditTask
                  eventId={eventId}
                  task={task}
                  onUpdated={async () => {
                    await loadTasks();
                    onChanged?.();
                  }}
                />
                <DeleteTask
                  eventId={eventId}
                  taskId={task._id}
                  onDeleted={async () => {
                    await loadTasks();
                    onChanged?.();
                  }}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};