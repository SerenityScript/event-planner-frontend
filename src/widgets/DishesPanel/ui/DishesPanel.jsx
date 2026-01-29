import { useCallback, useEffect, useState } from "react";
import { responsibleOptions } from "../lib/responsibleOptions";

import { getDishes, updateDish } from "@/shared/api/dishes";

import { AddDish } from "@/features/AddDish";
import { EditDish } from "@/features/EditDish";
import { DeleteDish } from "@/features/DeleteDish";
import { AddedDish } from "@/entities/Dish";

export const DishesPanel = ({ eventId, onCountChange }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDishes = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    setError("");

    try {
      const data = await getDishes(eventId);
      setDishes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load dishes");
      setDishes([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  useEffect(() => {
    onCountChange?.(dishes.length);
  }, [dishes, onCountChange]);

  // если захочешь менять responsible прямо в карточке — готово
  const handleQuickUpdate = async (dishId, payload) => {
    try {
      const result = await updateDish(eventId, dishId, payload);
      const updatedDish = result?.dish ?? result;

      setDishes((prev) =>
        prev.map((d) => (d._id === dishId ? { ...d, ...updatedDish } : d))
      );
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to update dish");
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
      <AddDish
        eventId={eventId}
        responsibleOptions={responsibleOptions}
        onCreated={loadDishes}
      />

      {loading && <p style={{ margin: 0 }}>Loading…</p>}
      {error && <p style={{ margin: 0 }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {dishes.length === 0 && (
            <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
              Noch keine Gerichte hinzugefügt 🍝
            </p>
          )}

          {dishes.map((dish) => (
            <AddedDish
              key={dish._id}
              dish={dish}
              extraActions={
                <>
                  <EditDish
                    eventId={eventId}
                    dish={dish}
                    responsibleOptions={responsibleOptions}
                    onUpdated={loadDishes}
                  />
                  <DeleteDish
                    eventId={eventId}
                    dishId={dish._id}
                    onDeleted={loadDishes}
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