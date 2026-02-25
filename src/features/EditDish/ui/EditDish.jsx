import { useState } from "react";
import { Modal } from "@/shared/ui";
import { DishForm } from "@/entities/Dish";
import { EditButton } from "@/shared/ui";
import { updateDish } from "@/shared/api/dishes";
import styles from "./EditDish.module.scss";

export const EditDish = ({ eventId, dish, responsibleOptions, onUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!dish) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);
      await updateDish(eventId, dish._id, payload);
      onUpdated?.();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update dish");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div>
          <h3 className={styles.heading}>
            Gericht bearbeiten
          </h3>

          <DishForm
            initialValues={{
              name: dish.name,
              responsible: dish.responsible || "me",
              note: dish.note || "",
            }}
            responsibleOptions={responsibleOptions}
            submitLabel={isSubmitting ? "Saving..." : "Speichern"}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};