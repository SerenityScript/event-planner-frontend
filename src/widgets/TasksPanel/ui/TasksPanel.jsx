// src/widgets/TasksPanel/ui/TasksPanel.jsx
import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";

export const TasksPanel = ({ tasks, onChangeTasks }) => {
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    const text = newTaskText.trim();
    if (!text) return;

    const newTask = {
      id: Date.now().toString() + Math.random().toString(16),
      text,
      done: false,
    };

    onChangeTasks?.([...(tasks || []), newTask]);
    setNewTaskText("");
  };

  const handleToggleTask = (id) => {
    const updated = (tasks || []).map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    onChangeTasks?.(updated);
  };

  const handleDeleteTask = (id) => {
    const updated = (tasks || []).filter((task) => task.id !== id);
    onChangeTasks?.(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask();
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
      {/* Form zum Hinzufügen */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Neue Aufgabe hinzufügen..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        <SubmitButton>Aufgabe hinzufügen</SubmitButton>
      </form>

      {/* Liste der Aufgaben */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(tasks || []).length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Aufgaben. Füge die erste Aufgabe hinzu ✨
          </p>
        )}

        {(tasks || []).map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleToggleTask(task.id)}
            />

            <span
              style={{
                flex: 1,
                fontSize: "14px",
                textDecoration: task.done ? "line-through" : "none",
                color: task.done ? "#999" : "#333",
              }}
            >
              {task.text}
            </span>

            <button
              type="button"
              onClick={() => handleDeleteTask(task.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#d11",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Entfernen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
