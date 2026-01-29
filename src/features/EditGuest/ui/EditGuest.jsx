import { useState } from "react";
import { Modal } from "@/shared/ui";
import { GuestForm } from "@/entities/Guest";
import { EditButton } from "@/shared/ui";
import { updateGuest } from "@/shared/api/guests";

export const EditGuest = ({ eventId, guest, onUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!guest) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);

      await updateGuest(eventId, guest._id, payload);

      onUpdated?.();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update guest");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div style={{ minWidth: "320px" }}>
          <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "18px" }}>
            Gast bearbeiten
          </h3>

          <GuestForm
            initialValues={{
              name: guest.name,
              status: guest.status || "invited",
            }}
            submitLabel={isSubmitting ? "Saving..." : "Speichern"}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};