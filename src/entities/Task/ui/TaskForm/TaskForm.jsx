import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";

export const TaskForm = ({
  initialValues = { text: "" },
  onSubmit,
  submitLabel = "Speichern",
}) => {
  const [text, setText] = useState(initialValues.text || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSubmit?.({ text: trimmed });

    // для AddTask – очищаем, для EditTask можно тоже, модалка всё равно закроется
    setText(initialValues.text || "");
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: "8px 10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      <div>
        <SubmitButton disabled={!text.trim()}>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};