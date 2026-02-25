import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteShoppingItem } from "@/shared/api/shopping-items";
import { useConfirm } from "@/shared/ui/Confirm";

export const DeleteShoppingItem = ({ eventId, itemId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirm = useConfirm();

  const handleDelete = async () => {
    if (!itemId || isDeleting) return;

    const ok = await confirm("Eintrag wirklich löschen?");
    if (!ok) return;

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