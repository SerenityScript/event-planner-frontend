export const AddedDish = ({ dish, extraActions }) => {
  if (!dish) return null;

  const mapResponsible = (value) => {
    if (value === "me") return "Ich";
    if (value === "guest") return "Gast";
    if (value === "delivery") return "Lieferung";
    return value || "";
  };

  return (
    <div
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
          {mapResponsible(dish.responsible)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "4px",
        }}
      >
        {extraActions ?? null}
      </div>
    </div>
  );
};