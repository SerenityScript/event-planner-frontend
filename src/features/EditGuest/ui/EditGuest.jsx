import { useState } from "react";
import { GuestForm } from "@/entities/Guest/ui/GuestForm/GuestForm";
import { EditButton } from "../../../shared/ui/EditButton/EditButton";

export const EditGuest = ({ guest, guests = [], onChangeGuests }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!guest) return null;

  const handleOpen = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const handleSubmit = (formValues) => {
    const updatedGuests = guests.map((g) =>
      g.id === guest.id ? { ...g, ...formValues } : g
    );

    onChangeGuests?.(updatedGuests);
    handleClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {!isEditing && (
        <EditButton onClick={handleOpen} />
      )}

      {isEditing && (
        <div
          style={{
            marginTop: "4px",
            borderRadius: "8px",
            border: "1px solid #eee",
            backgroundColor: "#fafafa",
          }}
        >
          <GuestForm
            initialValues={{
              name: guest.name,
              status: guest.status || "invited",
            }}
            submitLabel="Speichern"
            onSubmit={handleSubmit}
          />

          <button
            type="button"
            onClick={handleClose}
            style={{
              border: "none",
              background: "transparent",
              color: "#777",
              cursor: "pointer",
              fontSize: "12px",
              marginLeft: "10px",
              marginBottom: "8px",
            }}
          >
            Abbrechen
          </button>
        </div>
      )}
    </div>
  );
};
