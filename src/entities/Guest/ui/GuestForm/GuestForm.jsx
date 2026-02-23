import { useState } from "react";
import { SubmitButton } from "@/shared/ui";
import styles from "./GuestForm.module.scss";

export const GuestForm = ({
  initialValues = { name: "", status: "invited" },
  onSubmit,
  submitLabel = "Speichern",
}) => {
  const [name, setName] = useState(initialValues.name || "");
  const [status, setStatus] = useState(initialValues.status || "invited");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSubmit?.({
      name: trimmedName,
      status,
    });

    setName(initialValues.name || "");
    setStatus(initialValues.status || "invited");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Name des Gastes"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="invited">Eingeladen</option>
          <option value="confirmed">Bestätigt</option>
          <option value="declined">Sagt ab</option>
        </select>
      </div>

      <div className={styles.actions}>
        <SubmitButton disabled={!name.trim()}>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};