import { useState } from "react";
import { Modal, EditButton } from "@/shared/ui";
import { EventForm } from "@/entities/Event";
import { updateEvent } from "@/shared/api";

export const EditEvent = ({ event, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return null;

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);

      const result = await updateEvent(event._id, payload);
      const updated = result?.event ?? result;

      if (!updated) throw new Error("Failed to update event");

      onUpdate?.(updated);
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      // TODO: заменить на общий notify/toast
      alert(e?.message || "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <header>
          <h1>Event Bearbeiten</h1>
        </header>

        <EventForm
          initialValues={event}
          submitLabel="Speichern"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onBack={handleClose}
        />
      </Modal>
    </>
  );
};