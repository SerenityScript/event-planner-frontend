import { FaTrashAlt } from "react-icons/fa";
import styles from "./DeleteButton.module.scss";

export const DeleteButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.deleteButton}
      aria-label="Delete"
    >
      <FaTrashAlt  size={18} color="#d11" />
    </button>
  );
};