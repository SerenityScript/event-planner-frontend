import { TaskForm } from "@/entities/Task/ui/TaskForm/TaskForm";

export const AddTask = ({ tasks = [], onChangeTasks }) => {
  const handleSubmit = ({ text }) => {
    const newTask = {
      id: Date.now().toString() + Math.random().toString(16),
      text,
      done: false,
    };

    onChangeTasks?.([...tasks, newTask]);
  };

  return (
    <TaskForm
      initialValues={{ text: "" }}
      submitLabel="Aufgabe hinzufügen"
      onSubmit={handleSubmit}
    />
  );
};