import { useCallback, useEffect, useState } from "react";
import { statusOptions } from "../lib/statusOptions";

import { getGuests, updateGuest } from "@/shared/api/guests";

import { AddGuest } from "@/features/AddGuest";
import { EditGuest } from "@/features/EditGuest";
import { DeleteGuest } from "@/features/DeleteGuest";
import { AddedGuest } from "@/entities/Guest";

export const GuestsPanel = ({ eventId, onCountChange }) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadGuests = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    setError("");

    try {
      const data = await getGuests(eventId);
      setGuests(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load guests");
      setGuests([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadGuests();
  }, [loadGuests]);

  // счётчик: invited+confirmed (declined не считаем)
  useEffect(() => {
    const count = guests.filter((g) => g.status !== "declined").length;
    onCountChange?.(count);
  }, [guests, onCountChange]);

  const handleChangeStatus = async (guestId, newStatus) => {
    try {
      const result = await updateGuest(eventId, guestId, { status: newStatus });
      const updatedGuest = result?.guest ?? result;

      setGuests((prev) =>
        prev.map((g) => (g._id === guestId ? { ...g, ...updatedGuest } : g))
      );
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update guest status");
    }
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
      <AddGuest eventId={eventId} onCreated={loadGuests} />

      {loading && <p style={{ margin: 0 }}>Loading…</p>}
      {error && <p style={{ margin: 0 }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {guests.length === 0 && (
            <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
              Noch keine Gäste hinzugefügt ✨
            </p>
          )}

          {guests.map((guest) => (
            <AddedGuest
              key={guest._id}
              guest={guest}
              statusOptions={statusOptions}
              onChangeStatus={(newStatus) =>
                handleChangeStatus(guest._id, newStatus)
              }
              actions={
                <>
                  <EditGuest
                    eventId={eventId}
                    guest={guest}
                    onUpdated={loadGuests}
                  />
                  <DeleteGuest
                    eventId={eventId}
                    guestId={guest._id}
                    onDeleted={loadGuests}
                  />
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};