// src/widgets/EventLayout/ui/EventLayout.jsx

export const EventLayout = ({ event, children, rightActions }) => {
  if (!event) return null;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      {/* Header: Titel + Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            margin: 0,
          }}
        >
          {event.title}
        </h1>

        {rightActions && (
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {rightActions}
          </div>
        )}
      </div>

      {/* Info Row */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          marginBottom: "16px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {event.date && (
          <div>
            <span style={{ fontWeight: "600", marginRight: "6px" }}>Datum:</span>
            {event.date}
          </div>
        )}

        {event.time && (
          <div>
            <span style={{ fontWeight: "600", marginRight: "6px" }}>Zeit:</span>
            {event.time}
          </div>
        )}

        {event.location && (
          <div>
            <span style={{ fontWeight: "600", marginRight: "6px" }}>Ort:</span>
            {event.location}
          </div>
        )}
      </div>

      {/* Tabs + Panels */}
      <div>{children}</div>
    </div>
  );
};
