import { responsibleOptions } from "../lib/responsibleOptions";
import { AddDish } from "@/features/AddDish/ui/AddDish";
import { EditDish } from "@/features/EditDish/ui/EditDish";
import { DeleteDish } from "@/features/DeleteDish/ui/DeleteDish";
import { AddedDish } from "@/entities/Dish/ui/AddedDish/AddedDish";

export const DishesPanel = ({ dishes = [], onChangeDishes }) => {
  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        border: "1px solid #eee",
      }}
    >
      {/* Feature: AddDish */}
      <AddDish
        dishes={dishes}
        onChangeDishes={onChangeDishes}
        responsibleOptions={responsibleOptions}
      />

      {/* Liste der Gerichte */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {dishes.length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Gerichte hinzugefügt 🍝
          </p>
        )}

        {dishes.map((dish) => (
          <AddedDish
            key={dish.id}
            dish={dish}
            extraActions={
              <>
                <EditDish
                  dish={dish}
                  dishes={dishes}
                  onChangeDishes={onChangeDishes}
                  responsibleOptions={responsibleOptions}
                />
                <DeleteDish
                  dishId={dish.id}
                  dishes={dishes}
                  onChangeDishes={onChangeDishes}
                />
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};