import { FiEdit   } from "react-icons/fi";

export const EditButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Edit"
    >
      <FiEdit   size={18} color="#777" />
    </button>
  );
};