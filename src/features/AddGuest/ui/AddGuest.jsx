import { GuestForm } from "@/entities/Guest/ui/GuestForm/GuestForm";

export const AddGuest = ({ guests = [], onChangeGuests }) => {
  const handleSubmit = (formValues) => {
    const newGuest = {
      id: Date.now().toString() + Math.random().toString(16),
      ...formValues,
    };

    onChangeGuests?.([...guests, newGuest]);
  };

  return (
    <GuestForm
      initialValues={{ name: "", status: "invited" }}
      submitLabel="Gast hinzufügen"
      onSubmit={handleSubmit}
    />
  );
};
