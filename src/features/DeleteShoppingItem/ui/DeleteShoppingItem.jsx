import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteShoppingItem } from "@/shared/api/shopping-items";

export const DeleteShoppingItem = ({ eventId, itemId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!itemId || isDeleting) return;

    const confirmed = window.confirm("Eintrag wirklich löschen?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteShoppingItem(eventId, itemId);
      onDeleted?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to delete shopping item");
    } finally {
      setIsDeleting(false);
    }
  };

  return <DeleteButton onClick={handleDelete} disabled={isDeleting} />;
};