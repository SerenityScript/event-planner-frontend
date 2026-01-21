import { useState } from "react";
import { Modal } from "@/shared/ui";
import { EventForm } from "@/entities/Event";
import { createEvent } from "@/shared/api";

export const AddNewEvent = ({ onCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false)
  };

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const result = await createEvent(data);

      onCreated?.(result?.event);

      setIsOpen(false);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        + Neues Event
      </button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <EventForm
          initialValues={{ name: "", date: "", time: "", location: "" }}
          submitLabel="Create Event"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onBack={handleClose}
        />
      </Modal>
    </>
  );
};