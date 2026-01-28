import { useState } from "react";
import { Modal } from "@/shared/ui";
import { TaskForm } from "@/entities/Task";
import { EditButton } from "@/shared/ui";
import { updateTask } from "@/shared/api/tasks";

export const EditTask = ({ eventId, task, onUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!task) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false);
  };

  const handleSubmit = async ({ title }) => {
    try {
      setIsSubmitting(true);

      const result = await updateTask(eventId, task._id, { title });
      const updated = result?.task ?? result;

      onUpdated?.(updated);

      setIsOpen(false);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update task");
    } finally {
      setIsSubmitting(false);
    }
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
          initialValues={{ title: task.title }}
          submitLabel={isSubmitting ? "Saving..." : "Speichern"}
          onSubmit={handleSubmit}
          />
          </div>
      </Modal>
    </>
  );
};