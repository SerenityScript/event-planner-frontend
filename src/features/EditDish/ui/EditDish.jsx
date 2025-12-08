import { useState } from "react";
import { Modal } from "@/shared/ui";
import { DishForm } from "@/entities/Dish";
import { EditButton } from "@/shared/ui";

export const EditDish = ({ dish, dishes = [], onChangeDishes, responsibleOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!dish) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (formValues) => {
    const updated = dishes.map((d) =>
      d.id === dish.id ? { ...d, ...formValues } : d
    );
    onChangeDishes?.(updated);
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
            Gericht bearbeiten
          </h3>

          <DishForm
            initialValues={{
              name: dish.name,
              responsible: dish.responsible || "me",
              note: dish.note || "",
            }}
            responsibleOptions={responsibleOptions}
            submitLabel="Speichern"
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};