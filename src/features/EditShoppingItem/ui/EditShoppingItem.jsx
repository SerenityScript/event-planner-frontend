import { useState } from "react";
import { Modal } from "@/shared/ui";
import { ShoppingForm } from "@/entities/Shopping";
import { EditButton } from "@/shared/ui";
import { updateShoppingItem } from "@/shared/api/shopping-items";

export const EditShoppingItem = ({ eventId, item, categoryOptions, onUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false);
  };

  const handleSubmit = async (formValues) => {
    try {
      setIsSubmitting(true);

      // formValues: { name, qty, category }
      await updateShoppingItem(eventId, item._id, formValues);

      onUpdated?.();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update shopping item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div style={{ minWidth: "320px" }}>
          <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "18px" }}>
            Einkauf bearbeiten
          </h3>

          <ShoppingForm
            initialValues={{
              name: item.name,
              qty: item.qty || "",
              category: item.category || "food",
            }}
            categoryOptions={categoryOptions}
            submitLabel={isSubmitting ? "Saving..." : "Speichern"}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};