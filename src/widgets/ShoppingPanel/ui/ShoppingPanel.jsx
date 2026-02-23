import { useCallback, useEffect, useState } from "react";
import { categoryOptions } from "../lib/categoryOptions";
import { getShoppingItems, updateShoppingItem } from "@/shared/api/shopping-items";
import { AddShoppingItem } from "@/features/AddShoppingItem";
import { EditShoppingItem } from "@/features/EditShoppingItem";
import { DeleteShoppingItem } from "@/features/DeleteShoppingItem";
import { AddedShoppingItem } from "@/entities/Shopping";
import styles from "./ShoppingPanel.module.scss";


export const ShoppingPanel = ({ eventId, onChanged }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const data = await getShoppingItems(eventId);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to load shopping items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleToggleBought = async (item) => {
    try {
      const nextBought = !item.bought;

      setItems((prev) =>
        prev.map((it) => (it._id === item._id ? { ...it, bought: nextBought } : it))
      );

      const result = await updateShoppingItem(eventId, item._id, { bought: nextBought });
      const updated = result?.shoppingItem ?? result;

      setItems((prev) => prev.map((it) => (it._id === item._id ? updated : it)));

      onChanged?.();
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update item");
      loadItems();
    }
  };

  return (
    <div className={styles.panelCont}>
      <AddShoppingItem
        eventId={eventId}
        categoryOptions={categoryOptions}
        onCreated={async () => {
          await loadItems();
          onChanged?.();
        }}
      />

      {loading && (
        <p>Lade Einkaufsliste…</p>
      )}

      <div className={styles.rows}>
        {!loading && items.length === 0 && (
          <p>Noch keine Einkaufsliste 🛒</p>
        )}

        {items.map((item) => (
          <AddedShoppingItem
            key={item._id}
            item={item}
            onToggleBought={() => handleToggleBought(item)}
            actions={
              <>
                <EditShoppingItem
                  eventId={eventId}
                  item={item}
                  categoryOptions={categoryOptions}
                  onUpdated={async () => {
                    await loadItems();
                    onChanged?.();
                  }}
                />
                <DeleteShoppingItem
                  eventId={eventId}
                  itemId={item._id}
                  onDeleted={async () => {
                    await loadItems();
                    onChanged?.();
                  }}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};