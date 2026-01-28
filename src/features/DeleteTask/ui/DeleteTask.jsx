import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteTask } from "@/shared/api/tasks";

export const DeleteTask = ({ eventId, taskId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!taskId || isDeleting) return;

    const confirmed = window.confirm("Aufgabe wirklich löschen?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await deleteTask(eventId, taskId);

      onDeleted?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteButton
      onClick={handleDelete}
      disabled={isDeleting}
    />
  );
};