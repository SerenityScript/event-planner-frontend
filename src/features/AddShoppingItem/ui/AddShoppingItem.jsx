import { useState } from "react";
import { ShoppingForm } from "@/entities/Shopping";
import { createShoppingItem } from "@/shared/api/shopping-items";

export const AddShoppingItem = ({ eventId, categoryOptions, onCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formValues) => {
    try {
      setIsSubmitting(true);

      // formValues: { name, qty, category }
      await createShoppingItem(eventId, formValues);

      onCreated?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to create shopping item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ShoppingForm
      initialValues={{ name: "", qty: "", category: "food" }}
      categoryOptions={categoryOptions}
      submitLabel={isSubmitting ? "Adding..." : "Hinzufügen"}
      onSubmit={handleSubmit}
    />
  );
};