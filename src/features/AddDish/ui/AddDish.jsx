import { useState } from "react";
import { DishForm } from "@/entities/Dish";
import { createDish } from "@/shared/api/dishes";

export const AddDish = ({ eventId, responsibleOptions, onCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);
      await createDish(eventId, payload); // { name, responsible, note }
      onCreated?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to create dish");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DishForm
      initialValues={{ name: "", responsible: "me", note: "" }}
      responsibleOptions={responsibleOptions}
      submitLabel={isSubmitting ? "Adding..." : "Gericht hinzufügen"}
      onSubmit={handleSubmit}
    />
  );
};