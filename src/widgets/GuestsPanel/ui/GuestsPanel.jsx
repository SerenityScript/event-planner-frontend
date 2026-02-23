import { useCallback, useEffect, useState } from "react";
import { statusOptions } from "../lib/statusOptions";
import { getGuests, updateGuest } from "@/shared/api/guests";
import { AddGuest } from "@/features/AddGuest";
import { EditGuest } from "@/features/EditGuest";
import { DeleteGuest } from "@/features/DeleteGuest";
import { AddedGuest } from "@/entities/Guest";
import styles from "./GuestsPanel.module.scss";

export const GuestsPanel = ({ eventId, onChanged }) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadGuests = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const data = await getGuests(eventId);
      setGuests(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to load guests");
      setGuests([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadGuests();
  }, [loadGuests]);

  const handleUpdateStatus = async (guestId, newStatus) => {
    try {
      setGuests((prev) =>
        prev.map((g) => (g._id === guestId ? { ...g, status: newStatus } : g))
      );

      const result = await updateGuest(eventId, guestId, { status: newStatus });
      const updated = result?.guest ?? result;

      setGuests((prev) =>
        prev.map((g) => (g._id === guestId ? updated : g))
      );

      onChanged?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update guest status");
      loadGuests();
    }
  };

  return (
    <div className={styles.panelCont}>
      <AddGuest
        eventId={eventId}
        onCreated={async () => {
          await loadGuests();
          onChanged?.();
        }}
      />

      {loading && (
        <p>Lade Gäste…</p>
      )}

      <div className={styles.rows}>
        {!loading && guests.length === 0 && (
          <p>Noch keine Gäste hinzugefügt ✨</p>
        )}

        {guests.map((guest) => (
          <AddedGuest
            key={guest._id}
            guest={guest}
            statusOptions={statusOptions}
            onChangeStatus={(newStatus) => handleUpdateStatus(guest._id, newStatus)}
            actions={
              <>
                <EditGuest
                  eventId={eventId}
                  guest={guest}
                  onUpdated={async () => {
                    await loadGuests();
                    onChanged?.();
                  }}
                />
                <DeleteGuest
                  eventId={eventId}
                  guestId={guest._id}
                  onDeleted={async () => {
                    await loadGuests();
                    onChanged?.();
                  }}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};