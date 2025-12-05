// src/widgets/GuestsPanel/ui/GuestsPanel.jsx
import { statusOptions } from "../lib/statusOptions";
import { DeleteGuest } from "@/features/DeleteGuest/ui/DeleteGuest";
import { AddGuest } from "@/features/AddGuest/ui/AddGuest";

export const GuestsPanel = ({ guests, onChangeGuests }) => {
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
      {/* Feature: AddGuest */}
      <AddGuest guests={guests} onChangeGuests={onChangeGuests} />

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

            <DeleteGuest
              guestId={guest.id}
              guests={guests}
              onChangeGuests={onChangeGuests}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
