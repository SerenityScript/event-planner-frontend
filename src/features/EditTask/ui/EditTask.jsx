import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { TaskForm } from "@/entities/Task/ui/TaskForm/TaskForm";
import { EditButton } from "@/shared/ui/EditButton/EditButton";

export const EditTask = ({ task, tasks = [], onChangeTasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!task) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = ({ text }) => {
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, text } : t
    );
    onChangeTasks?.(updated);
    handleClose();
  };

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <h3
          style={{
            marginTop: 0,
            marginBottom: "12px",
            fontSize: "18px",
          }}
        >
          Aufgabe bearbeiten
        </h3>

        <TaskForm
          initialValues={{ text: task.text }}
          submitLabel="Speichern"
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};