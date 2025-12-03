// src/widgets/GuestsPanel/ui/GuestsPanel.jsx
import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "invited", label: "Eingeladen" },
  { value: "confirmed", label: "Bestätigt" },
  { value: "declined", label: "Sagt ab" },
];

export const GuestsPanel = ({ guests, onChangeGuests }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("invited");

  const handleAddGuest = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newGuest = {
      id: Date.now().toString() + Math.random().toString(16),
      name: trimmedName,
      contact: contact.trim(),
      status,
    };

    onChangeGuests?.([...(guests || []), newGuest]);

    setName("");
    setContact("");
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
          <input
            type="text"
            placeholder="Kontakt (Telefon / E-Mail)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
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
            {STATUS_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ff8a00",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Gast hinzufügen
          </button>
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
                {STATUS_OPTIONS.map((opt) => (
                  <option value={opt.value} key={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteGuest(guest.id)}
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
