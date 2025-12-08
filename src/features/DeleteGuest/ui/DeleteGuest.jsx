import { DeleteButton } from "@/shared/ui";

export const DeleteGuest = ({ guestId, guests, onChangeGuests }) => {
  const handleDeleteGuest = () => {
    const updated = (guests || []).filter((guest) => guest.id !== guestId);
    onChangeGuests?.(updated);
  };

  return <DeleteButton onClick={handleDeleteGuest} />;
};