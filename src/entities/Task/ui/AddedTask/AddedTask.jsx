export const AddedTask = ({ task, onToggle, extraActions }) => {
  if (!task) return null;

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
        checked={task.done}
        onChange={onToggle}
      />

      <span
        style={{
          flex: 1,
          fontSize: "14px",
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#999" : "#333",
        }}
      >
        {task.text}
      </span>

      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {extraActions}
      </div>
    </div>
  );
};