// src/widgets/GuestsPanel/ui/GuestsPanel.jsx
import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";
import { statusOptions } from "../lib/statusOptions";
import { DeleteButton } from "@/shared/ui/DeleteButton/DeleteButton";


export const GuestsPanel = ({ guests, onChangeGuests }) => {
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

    onChangeGuests?.([...(guests || []), newGuest]);

    setName("");
    setStatus("invited");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddGuest();
  };

  const handleDeleteGuest = (id) => {
    const updated = (guests || []).filter((guest) => guest.id !== id);
    onChangeGuests?.(updated);
  };

  const handleChangeStatus = (id, newStatus) => {
    const updated = (guests || []).map((guest) =>
      guest.id === id ? { ...guest, status: newStatus } : guest
    );
    onChangeGuests?.(updated);
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
      {/* Formular zum Hinzufügen */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "12px",
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
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            {statusOptions.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <SubmitButton>Gast hinzufügen</SubmitButton>
        </div>
      </form>

      {/* Liste der Gäste */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(guests || []).length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Gäste hinzugefügt ✨
          </p>
        )}

        {(guests || []).map((guest) => (
          <div
            key={guest.id}
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
            <div style={{ flex: 2 }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "2px",
                }}
              >
                {guest.name}
              </div>
              {guest.contact && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#777",
                  }}
                >
                  {guest.contact}
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <select
                value={guest.status || "invited"}
                onChange={(e) =>
                  handleChangeStatus(guest.id, e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "13px",
                }}
              >
                {statusOptions.map((opt) => (
                  <option value={opt.value} key={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <DeleteButton onClick={() => handleDeleteGuest(guest.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};
