import { useState } from "react";
import { Modal } from "@/shared/ui";
import { GuestForm } from "@/entities/Guest";
import { EditButton } from "@/shared/ui";

export const EditGuest = ({ guest, guests = [], onChangeGuests }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!guest) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (formValues) => {
    const updatedGuests = guests.map((g) =>
      g.id === guest.id ? { ...g, ...formValues } : g
    );

    onChangeGuests?.(updatedGuests);
    handleClose();
  };

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div style={{ minWidth: "320px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "12px",
              fontSize: "18px",
            }}
          >
            Gast bearbeiten
          </h3>

          <GuestForm
            initialValues={{
              name: guest.name,
              status: guest.status || "invited",
            }}
            submitLabel="Speichern"
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};