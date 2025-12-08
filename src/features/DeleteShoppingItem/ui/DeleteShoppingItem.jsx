import { DeleteButton } from "@/shared/ui";

export const DeleteShoppingItem = ({ itemId, items = [], onChangeItems }) => {
  const handleDelete = () => {
    const updated = items.filter((item) => item.id !== itemId);
    onChangeItems?.(updated);
  };

  return <DeleteButton onClick={handleDelete} />;
};
