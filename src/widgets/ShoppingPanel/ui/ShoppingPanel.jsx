import { useCallback, useEffect, useState } from "react";
import { categoryOptions } from "../lib/categoryOptions";

import { getShoppingItems, updateShoppingItem } from "@/shared/api/shopping-items";

import { AddShoppingItem } from "@/features/AddShoppingItem";
import { EditShoppingItem } from "@/features/EditShoppingItem";
import { DeleteShoppingItem } from "@/features/DeleteShoppingItem";
import { AddedShoppingItem } from "@/entities/Shopping";

export const ShoppingPanel = ({ eventId, onCountChange }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadItems = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    setError("");

    try {
      const data = await getShoppingItems(eventId);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load shopping items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // счётчик для таба: показываем сколько НЕ куплено
  useEffect(() => {
    const notBought = items.filter((it) => it.bought !== true).length;
    onCountChange?.(notBought);
  }, [items, onCountChange]);

  const handleToggleBought = async (item) => {
    try {
      const nextBought = !item.bought;

      const result = await updateShoppingItem(eventId, item._id, { bought: nextBought });
      const updatedFromApi = result?.shoppingItem ?? result;

      // оптимистично обновим локально (на всякий)
      setItems((prev) =>
        prev.map((it) => (it._id === item._id ? { ...it, ...updatedFromApi, bought: nextBought } : it))
      );
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update item");
    }
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
        eventId={eventId}
        categoryOptions={categoryOptions}
        onCreated={loadItems}
      />

      {loading && <p style={{ margin: 0 }}>Loading…</p>}
      {error && <p style={{ margin: 0 }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.length === 0 && (
            <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
              Noch keine Einkaufsliste 🛒
            </p>
          )}

          {items.map((item) => (
            <AddedShoppingItem
              key={item._id}
              item={item}
              onToggleBought={() => handleToggleBought(item)}
              extraActions={
                <>
                  <EditShoppingItem
                    eventId={eventId}
                    item={item}
                    categoryOptions={categoryOptions}
                    onUpdated={loadItems}
                  />
                  <DeleteShoppingItem
                    eventId={eventId}
                    itemId={item._id}
                    onDeleted={loadItems}
                  />
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};