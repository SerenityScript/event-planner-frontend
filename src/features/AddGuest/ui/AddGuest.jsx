import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";

export const AddGuest = ({ guests = [], onChangeGuests }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("invited");

  const handleAddGuest = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newGuest = {
      id: Date.now().toString() + Math.random().toString(16),
      name: trimmedName,
      status,
    };

    onChangeGuests([...guests, newGuest]);

    setName("");
    setStatus("invited");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddGuest();
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
          placeholder="Name des Gastes"
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
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            width: "180px",
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        >
          <option value="invited">Eingeladen</option>
          <option value="confirmed">Bestätigt</option>
          <option value="declined">Sagt ab</option>
        </select>
      </div>

      <div>
        <SubmitButton disabled={!name.trim()}>Gast hinzufügen</SubmitButton>
      </div>
    </form>
  );
};
