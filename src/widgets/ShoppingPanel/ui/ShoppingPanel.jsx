import { categoryOptions } from "../lib/categoryOptions";
import { AddShoppingItem } from "@/features/AddShoppingItem/ui/AddShoppingItem";
import { EditShoppingItem } from "@/features/EditShoppingItem/ui/EditShoppingItem";
import { DeleteShoppingItem } from "@/features/DeleteShoppingItem/ui/DeleteShoppingItem";
import { AddedShoppingItem } from "@/entities/Shopping/ui/AddedShoppingItem/AddedShoppingItem";

export const ShoppingPanel = ({ items = [], onChangeItems }) => {
  const handleToggleBought = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, bought: !item.bought } : item
    );
    onChangeItems?.(updated);
  };

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        border: "1px solid #eee",
      }}
    >
      <AddShoppingItem
        items={items}
        onChangeItems={onChangeItems}
        categoryOptions={categoryOptions}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Einkaufsliste 🛒
          </p>
        )}

        {items.map((item) => (
          <AddedShoppingItem
            key={item.id}
            item={item}
            onToggleBought={() => handleToggleBought(item.id)}
            extraActions={
              <>
                <EditShoppingItem
                  item={item}
                  items={items}
                  onChangeItems={onChangeItems}
                  categoryOptions={categoryOptions}
                />
                <DeleteShoppingItem
                  itemId={item.id}
                  items={items}
                  onChangeItems={onChangeItems}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};