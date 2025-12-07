export const AddedGuest = ({
  guest,
  statusOptions,
  onChangeStatus,
  actions, // Edit/Delete buttons
}) => {
  if (!guest) return null;

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
      {/* Name */}
      <div style={{ flex: 2 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {guest.name}
        </div>
      </div>

      {/* Status Select */}
      <div style={{ flex: 1 }}>
        <select
          value={guest.status || "invited"}
          onChange={(e) => onChangeStatus?.(e.target.value)}
          style={{
            width: "100%",
            padding: "6px 8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "13px",
          }}
        >
          {statusOptions.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Edit + Delete */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {actions}
      </div>
    </div>
  );
};
