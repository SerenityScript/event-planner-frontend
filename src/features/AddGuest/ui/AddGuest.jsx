import { useState } from "react";
import { GuestForm } from "@/entities/Guest";
import { createGuest } from "@/shared/api/guests";

export const AddGuest = ({ eventId, onCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);

      // payload: { name, status }
      await createGuest(eventId, payload);

      onCreated?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to create guest");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestForm
      initialValues={{ name: "", status: "invited" }}
      submitLabel={isSubmitting ? "Adding..." : "Gast hinzufügen"}
      onSubmit={handleSubmit}
    />
  );
};