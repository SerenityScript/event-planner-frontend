import { DishForm } from "@/entities/Dish";

export const AddDish = ({ dishes = [], onChangeDishes, responsibleOptions }) => {
  const handleSubmit = (formValues) => {
    const newDish = {
      id: Date.now().toString() + Math.random().toString(16),
      ...formValues,
    };

    onChangeDishes?.([...dishes, newDish]);
  };

  return (
    <DishForm
      initialValues={{ name: "", responsible: "me", note: "" }}
      responsibleOptions={responsibleOptions}
      submitLabel="Gericht hinzufügen"
      onSubmit={handleSubmit}
    />
  );
};
