// src/widgets/DishesPanel/ui/DishesPanel.jsx
import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";
import { responsibleOptions } from "../lib/responsibleOptions";
import { DeleteButton } from "@/shared/ui/DeleteButton/DeleteButton";


export const DishesPanel = ({ dishes, onChangeDishes }) => {
  const [name, setName] = useState("");
  const [responsible, setResponsible] = useState("me");
  const [note, setNote] = useState("");

  const handleAddDish = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newDish = {
      id: Date.now().toString() + Math.random().toString(16),
      name: trimmedName,
      responsible,
      note: note.trim(),
    };

    onChangeDishes?.([...(dishes || []), newDish]);

    setName("");
    setResponsible("me");
    setNote("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDish();
  };

  const handleDeleteDish = (id) => {
    const updated = (dishes || []).filter((dish) => dish.id !== id);
    onChangeDishes?.(updated);
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
      {/* Formular zum Hinzufügen */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Gericht (z.B. Caesar Salat)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />

          <select
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            {responsibleOptions.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          </div>

          <textarea
            placeholder="Notizen (z.B. glutenfrei, vegan...)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
              style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        
        <div><SubmitButton>Gericht hinzufügen</SubmitButton></div>
        
      </form>

      {/* Liste der Gerichte */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(dishes || []).length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Gerichte hinzugefügt 🍝
          </p>
        )}

        {(dishes || []).map((dish) => (
          <div
            key={dish.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "8px 10px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ flex: 2 }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  {dish.name}
                </div>
                {dish.note && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#777",
                    }}
                  >
                    {dish.note}
                  </div>
                )}
              </div>

              <div
                style={{
                  flex: 1,
                  fontSize: "12px",
                  color: "#555",
                  textAlign: "right",
                }}
              >
                {dish.responsible === "me" && "Ich"}
                {dish.responsible === "guest" && "Gast"}
                {dish.responsible === "delivery" && "Lieferung"}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <DeleteButton onClick={() => handleDeleteDish(dish.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
