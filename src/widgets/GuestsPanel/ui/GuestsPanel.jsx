// src/widgets/GuestsPanel/ui/GuestsPanel.jsx
import { statusOptions } from "../lib/statusOptions";
import { DeleteGuest } from "@/features/DeleteGuest";
import { AddGuest } from "@/features/AddGuest";
import { EditGuest } from "@/features/EditGuest";
import { AddedGuest } from "@/entities/Guest";

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

      <AddGuest guests={guests} onChangeGuests={onChangeGuests} />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {guests.length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Gäste hinzugefügt ✨
          </p>
        )}

        {guests.map((guest) => (
          <AddedGuest
            key={guest.id}
            guest={guest}
            statusOptions={statusOptions}
            onChangeStatus={(newStatus) =>
              handleChangeStatus(guest.id, newStatus)
            }
            actions={
              <>
                <EditGuest
                  guest={guest}
                  guests={guests}
                  onChangeGuests={onChangeGuests}
                />
                <DeleteGuest
                  guestId={guest.id}
                  guests={guests}
                  onChangeGuests={onChangeGuests}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
}