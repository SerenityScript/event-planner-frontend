// src/features/event/edit-event/ui/EditEvent.jsx
import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { EventForm } from "@/entities/Event/ui/EventForm/EventForm";
import { EditButton } from "../../../shared/ui/EditButton/EditButton";

export const EditEvent = ({ event, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!event) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (formValues) => {
    // EventForm работает с name, а твой event сейчас, скорее всего, с title
    const updatedEvent = {
      ...event,
      title: formValues.name,
      date: formValues.date,
      time: formValues.time,
      location: formValues.location,
    };

    if (onUpdate) {
      onUpdate(updatedEvent);
    }

    handleClose();
  };

  return (
    <>
      <EditButton onClick={handleOpen} />
      
      <Modal isOpen={isOpen} onClose={handleClose}>
        <EventForm
          initialValues={{
            name: event.title || "",
            date: event.date || "",
            time: event.time || "",
            location: event.location || "",
          }}
          submitLabel="Save Changes"
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};
