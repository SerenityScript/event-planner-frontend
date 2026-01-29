import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteDish } from "@/shared/api/dishes";

export const DeleteDish = ({ eventId, dishId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!dishId || isDeleting) return;

    const confirmed = window.confirm("Gericht wirklich löschen?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteDish(eventId, dishId);
      onDeleted?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to delete dish");
    } finally {
      setIsDeleting(false);
    }
  };

  return <DeleteButton onClick={handleDelete} disabled={isDeleting} />;
};