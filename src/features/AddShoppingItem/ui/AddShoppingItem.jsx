import { ShoppingForm } from "@/entities/Shopping";

export const AddShoppingItem = ({
  items = [],
  onChangeItems,
  categoryOptions,
}) => {
  const handleSubmit = (formValues) => {
    const newItem = {
      id: Date.now().toString() + Math.random().toString(16),
      ...formValues,
      bought: false,
    };

    onChangeItems?.([...items, newItem]);
  };

  return (
    <ShoppingForm
      initialValues={{ name: "", qty: "", category: "food" }}
      categoryOptions={categoryOptions}
      submitLabel="Hinzufügen"
      onSubmit={handleSubmit}
    />
  );
};