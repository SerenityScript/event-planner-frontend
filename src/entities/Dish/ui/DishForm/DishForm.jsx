import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";

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

    // для AddDish — можно сбросить, для EditDish модалка всё равно закроется
    setName(initialValues.name || "");
    setResponsible(initialValues.responsible || "me");
    setNote(initialValues.note || "");
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
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Gericht (z.B. Caesar Salat)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <select
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
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
        style={{
          padding: "8px 10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          resize: "vertical",
        }}
      />

      <div>
        <SubmitButton /* disabled={!name.trim()} */>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};