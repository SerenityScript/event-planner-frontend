// src/widgets/ShoppingPanel/ui/ShoppingPanel.jsx
import { useState } from "react";
import { SubmitButton } from "@/shared/ui/SubmitButton/SubmitButton";

const CATEGORY_OPTIONS = [
  { value: "food", label: "Lebensmittel" },
  { value: "drinks", label: "Getränke" },
  { value: "decor", label: "Deko" },
  { value: "other", label: "Sonstiges" },
];

export const ShoppingPanel = ({ items, onChangeItems }) => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState("food");

  const handleAddItem = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newItem = {
      id: Date.now().toString() + Math.random().toString(16),
      name: trimmedName,
      qty: qty.trim(),
      category,
      bought: false,
    };

    onChangeItems?.([...(items || []), newItem]);

    setName("");
    setQty("");
    setCategory("food");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem();
  };

  const handleToggleBought = (id) => {
    const updated = (items || []).map((item) =>
      item.id === id ? { ...item, bought: !item.bought } : item
    );
    onChangeItems?.(updated);
  };

  const handleDeleteItem = (id) => {
    const updated = (items || []).filter((item) => item.id !== id);
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
            placeholder="Artikel (z.B. Orangensaft)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 2,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <input
            type="text"
            placeholder="Menge (z.B. 3 L)"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <SubmitButton>Hinzufügen</SubmitButton>
        </div>
      </form>

      {/* Liste der Einkäufe */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(items || []).length === 0 && (
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>
            Noch keine Einkaufsliste 🛒
          </p>
        )}

        {(items || []).map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => handleToggleBought(item.id)}
            />

            <div style={{ flex: 2 }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: item.bought ? "line-through" : "none",
                  color: item.bought ? "#999" : "#333",
                }}
              >
                {item.name}
              </div>
              {item.qty && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#777",
                  }}
                >
                  {item.qty}
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
              {item.category === "food" && "Lebensmittel"}
              {item.category === "drinks" && "Getränke"}
              {item.category === "decor" && "Deko"}
              {item.category === "other" && "Sonstiges"}
            </div>

            <button
              type="button"
              onClick={() => handleDeleteItem(item.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#d11",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Entfernen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};