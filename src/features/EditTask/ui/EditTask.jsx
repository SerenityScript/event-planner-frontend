import { useState } from "react";
import { Modal } from "@/shared/ui";
import { TaskForm } from "@/entities/Task";
import { EditButton } from "@/shared/ui";

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
        <div style={{ minWidth: "320px" }}>
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
          </div>
      </Modal>
    </>
  );
};