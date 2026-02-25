import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteDish } from "@/shared/api/dishes";
import { useConfirm } from "@/shared/ui/Confirm";

export const DeleteDish = ({ eventId, dishId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirm = useConfirm();

  const handleDelete = async () => {
    if (!dishId || isDeleting) return;

    const ok = await confirm("Gericht wirklich löschen?");
    if (!ok) return;

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