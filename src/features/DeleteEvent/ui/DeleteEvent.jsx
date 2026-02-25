import { useState } from "react";
import { deleteEvent } from "@/shared/api/events";
import { DeleteButton } from "@/shared/ui";
import { useConfirm } from "@/shared/ui/Confirm";

export const DeleteEvent = ({ eventId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirm = useConfirm();

  const handleDelete = async () => {
    if (!eventId || isDeleting) return;

    const ok = await confirm("Event wirklich löschen?");
    if (!ok) return;

    try {
      setIsDeleting(true);
      await deleteEvent(eventId);
      onDeleted?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  return <DeleteButton onClick={handleDelete} disabled={isDeleting} />;
};