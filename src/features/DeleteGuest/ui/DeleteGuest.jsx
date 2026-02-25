import { useState } from "react";
import { DeleteButton } from "@/shared/ui";
import { deleteGuest } from "@/shared/api/guests";
import { useConfirm } from "@/shared/ui/Confirm";

export const DeleteGuest = ({ eventId, guestId, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirm = useConfirm();

  const handleDeleteGuest = async () => {
    if (!guestId || isDeleting) return;

    const ok = await confirm("Gast wirklich löschen?");
    if (!ok) return;

    try {
      setIsDeleting(true);

      await deleteGuest(eventId, guestId);

      onDeleted?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to delete guest");
    } finally {
      setIsDeleting(false);
    }
  };

  return <DeleteButton onClick={handleDeleteGuest} disabled={isDeleting} />;
};