import { useState } from "react";
import { TaskForm } from "@/entities/Task";
import { createTask } from "@/shared/api/tasks";

export const AddTask = ({ eventId, onCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({ title }) => {
    try {
      setIsSubmitting(true);

      const result = await createTask(eventId, { title });
      const created = result?.task ?? result;

      onCreated?.(created);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <TaskForm
      initialValues={{ title: "" }}
      submitLabel={isSubmitting ? "Adding..." : "Aufgabe hinzufügen"}
      onSubmit={handleSubmit}
    />
  );
};