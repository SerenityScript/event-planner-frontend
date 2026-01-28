import { useState } from "react";
import { SubmitButton } from "@/shared/ui";

export const TaskForm = ({
  initialValues = { title: "" },
  onSubmit,
  submitLabel = "Speichern",
}) => {
  const [title, setTitle] = useState(initialValues.title  || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title .trim();
    if (!trimmed) return;

    onSubmit?.({ title : trimmed });

    setTitle(initialValues.title || "");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "16px",
        padding: "8px 10px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        border: "1px solid #eee",
      }}
    >
      <input
        type="text"
        placeholder="Neue Aufgabe hinzufügen..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: 1,
          padding: "8px 10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      <div>
        <SubmitButton disabled={!title.trim()}>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};