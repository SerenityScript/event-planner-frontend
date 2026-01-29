import { useEffect, useState } from "react";
import { SubmitButton } from "@/shared/ui";

export const ShoppingForm = ({
  initialValues = { name: "", qty: "", category: "food" },
  categoryOptions = [],
  onSubmit,
  submitLabel = "Speichern",
}) => {
  const [name, setName] = useState(initialValues.name || "");
  const [qty, setQty] = useState(initialValues.qty || "");
  const [category, setCategory] = useState(initialValues.category || "food");

  useEffect(() => {
    setName(initialValues.name || "");
    setQty(initialValues.qty || "");
    setCategory(initialValues.category || "food");
  }, [initialValues?.name, initialValues?.qty, initialValues?.category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSubmit?.({
      name: trimmedName,
      qty: qty.trim(),
      category,
    });

    setName(initialValues.name || "");
    setQty(initialValues.qty || "");
    setCategory(initialValues.category || "food");
  };

  return (
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
          {categoryOptions.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Menge (z.B. 3 L)"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        style={{
          padding: "8px 10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      <div>
        <SubmitButton disabled={!name.trim()}>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};