import { useState } from "react";
import { Modal } from "@/shared/ui";
import { EventForm } from "@/entities/Event";
import { createEvent } from "@/shared/api";
import styles from "./AddNewEvent.module.scss";

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
      <button type="button" onClick={handleOpen} className={styles.button}>
        + Neues Event
      </button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <EventForm
          initialValues={{ name: "", date: "", time: "", location: "" }}
          submitLabel="Event erstellen"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onBack={handleClose}
        />
      </Modal>
    </>
  );
};