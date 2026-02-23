import { useState } from "react";
import { SubmitButton } from "@/shared/ui";
import styles from "./DishForm.module.scss";

export const DishForm = ({
  initialValues = { name: "", responsible: "me", note: "" },
  responsibleOptions = [],
  onSubmit,
  submitLabel = "Speichern",
}) => {
  const [name, setName] = useState(initialValues.name || "");
  const [responsible, setResponsible] = useState(initialValues.responsible || "me");
  const [note, setNote] = useState(initialValues.note || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSubmit?.({
      name: trimmedName,
      responsible,
      note: note.trim(),
    });

    setName(initialValues.name || "");
    setResponsible(initialValues.responsible || "me");
    setNote(initialValues.note || "");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Gericht (z.B. Caesar Salat)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <select
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          className={styles.select}
        >
          {responsibleOptions.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Notizen (z.B. glutenfrei, vegan...)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className={styles.textarea}
      />

      <div className={styles.actions}>
        <SubmitButton disabled={!name.trim()}>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};