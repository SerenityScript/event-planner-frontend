import { useState } from "react";
import { Modal } from "@/shared/ui";
import { ShoppingForm } from "@/entities/Shopping";
import { EditButton } from "@/shared/ui";

export const EditShoppingItem = ({
  item,
  items = [],
  onChangeItems,
  categoryOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (formValues) => {
    const updated = items.map((it) =>
      it.id === item.id ? { ...it, ...formValues } : it
    );
    onChangeItems?.(updated);
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
            Einkauf bearbeiten
          </h3>

          <ShoppingForm
            initialValues={{
              name: item.name,
              qty: item.qty || "",
              category: item.category || "food",
            }}
            categoryOptions={categoryOptions}
            submitLabel="Speichern"
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};