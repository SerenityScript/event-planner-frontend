import { DeleteButton } from "@/shared/ui";

export const DeleteDish = ({ dishId, dishes = [], onChangeDishes }) => {
  const handleDelete = () => {
    const updated = dishes.filter((dish) => dish.id !== dishId);
    onChangeDishes?.(updated);
  };

  return <DeleteButton onClick={handleDelete} />;
};