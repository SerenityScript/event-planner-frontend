import { useState } from "react";
import { Modal } from "@/shared/ui";
import { EventForm } from "@/entities/Event";
import { EditButton } from "@/shared/ui";
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

      // backend у тебя возвращает { message, event } — если так:
      const updated = result?.event ?? result;

      onUpdate?.(updated);
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EditButton onClick={handleOpen} />
      
      <Modal isOpen={isOpen} onClose={handleClose}>
        <EventForm
          initialValues={event}
          submitLabel="Save Changes"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onBack={handleClose}
        />
      </Modal>
    </>
  );
};
