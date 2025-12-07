import { AddTask } from "@/features/AddTask/ui/AddTask";
import { EditTask } from "@/features/EditTask/ui/EditTask";
import { DeleteTask } from "@/features/DeleteTask/ui/DeleteTask";
import { AddedTask } from "@/entities/Task/ui/AddedTask/AddedTask";

export const TasksPanel = ({ tasks = [], onChangeTasks }) => {
  const handleToggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    onChangeTasks?.(updated);
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
      {/* Feature: AddTask */}
      <AddTask tasks={tasks} onChangeTasks={onChangeTasks} />

      {/* Liste der Aufgaben */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {tasks.length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Aufgaben. Füge die erste Aufgabe hinzu ✨
          </p>
        )}

        {tasks.map((task) => (
          <AddedTask
            key={task.id}
            task={task}
            onToggle={() => handleToggleTask(task.id)}
            onDelete={undefined} // не используем, т.к. выносим в feature
            extraActions={
              <>
                <EditTask
                  task={task}
                  tasks={tasks}
                  onChangeTasks={onChangeTasks}
                />
                <DeleteTask
                  taskId={task.id}
                  tasks={tasks}
                  onChangeTasks={onChangeTasks}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};