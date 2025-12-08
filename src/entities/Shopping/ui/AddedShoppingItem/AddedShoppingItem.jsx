export const AddedShoppingItem = ({ item, onToggleBought, extraActions }) => {
  if (!item) return null;

  const mapCategory = (value) => {
    if (value === "food") return "Lebensmittel";
    if (value === "drinks") return "Getränke";
    if (value === "decor") return "Deko";
    if (value === "other") return "Sonstiges";
    return value || "";
  };

  return (
    <div
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
        aria-label="Artikel gekauft"
        onChange={onToggleBought}
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
        {mapCategory(item.category)}
      </div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {extraActions ?? null}
      </div>
    </div>
  );
};