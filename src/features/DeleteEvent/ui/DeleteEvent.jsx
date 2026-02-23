import { useState } from "react";
import { deleteEvent } from "@/shared/api/events";
import { DeleteButton } from "@/shared/ui";

export const DeleteEvent = ({ eventId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!eventId || isDeleting) return;

    const confirmed = window.confirm("Event wirklich löschen?");
    if (!confirmed) return;

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