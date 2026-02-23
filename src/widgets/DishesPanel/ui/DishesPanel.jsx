import { useCallback, useEffect, useState } from "react";
import { responsibleOptions } from "../lib/responsibleOptions";
import { getDishes } from "@/shared/api/dishes";
import { AddDish } from "@/features/AddDish";
import { EditDish } from "@/features/EditDish";
import { DeleteDish } from "@/features/DeleteDish";
import { AddedDish } from "@/entities/Dish";
import styles from "./DishesPanel.module.scss";

export const DishesPanel = ({ eventId, onChanged }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDishes = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const data = await getDishes(eventId);
      setDishes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert(e?.message || "Failed to load dishes");
      setDishes([]);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  return (
    <div className={styles.panelCont}>
      <AddDish
        eventId={eventId}
        responsibleOptions={responsibleOptions}
        onCreated={async () => {
          await loadDishes();
          onChanged?.();
        }}
      />

      {loading && (
        <p>Lade Gerichte…</p>
      )}

      <div className={styles.rows}>
        {!loading && dishes.length === 0 && (
          <p>Noch keine Gerichte hinzugefügt 🍝</p>
        )}

        {dishes.map((dish) => (
          <AddedDish
            key={dish._id}
            dish={dish}
            actions={
              <>
                <EditDish
                  eventId={eventId}
                  dish={dish}
                  responsibleOptions={responsibleOptions}
                  onUpdated={async () => {
                    await loadDishes();
                    onChanged?.();
                  }}
                />
                <DeleteDish
                  eventId={eventId}
                  dishId={dish._id}
                  onDeleted={async () => {
                    await loadDishes();
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