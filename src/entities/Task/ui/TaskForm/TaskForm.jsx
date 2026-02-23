import { useState } from "react";
import { SubmitButton } from "@/shared/ui";
import styles from "./TaskForm.module.scss";

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Neue Aufgabe hinzufügen..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />

      <div  className={styles.actions}>
        <SubmitButton disabled={!title.trim()}>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};