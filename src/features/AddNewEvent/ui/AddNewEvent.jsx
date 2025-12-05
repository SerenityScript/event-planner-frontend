import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { EventForm } from "@/entities/Event/ui/EventForm/EventForm";

export const AddNewEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (data) => {
    // сюда потом придёт запрос на backend (POST /api/events)
    console.log("Create new event:", data);

    // после успешного сохранения можно:
    // 1) обновить список событий (через пропсы/контекст/запрос)
    // 2) закрыть модалку
    handleClose();
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        + Neues Event
      </button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <EventForm
          initialValues={{
            name: "",
            date: "",
            time: "",
            location: "",
          }}
          submitLabel="Create Event"
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};