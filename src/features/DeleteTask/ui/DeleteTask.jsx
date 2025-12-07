import { DeleteButton } from "@/shared/ui/DeleteButton/DeleteButton";

export const DeleteTask = ({ taskId, tasks = [], onChangeTasks }) => {
  const handleDelete = () => {
    const updated = tasks.filter((task) => task.id !== taskId);
    onChangeTasks?.(updated);
  };

  return <DeleteButton onClick={handleDelete} />;
};