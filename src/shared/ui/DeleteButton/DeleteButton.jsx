import { FaTrashAlt  } from "react-icons/fa";

export const DeleteButton = ({ onClick }) => {
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
      aria-label="Delete"
    >
      <FaTrashAlt  size={18} color="#d11" />
    </button>
  );
};