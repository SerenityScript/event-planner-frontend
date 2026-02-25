import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteTask } from "@/shared/api/tasks";
import { useConfirm } from "@/shared/ui/Confirm";

export const DeleteTask = ({ eventId, taskId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirm = useConfirm();

  const handleDelete = async () => {
    if (!taskId || isDeleting) return;

    const ok = await confirm("Aufgabe wirklich löschen?");
    if (!ok) return;

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