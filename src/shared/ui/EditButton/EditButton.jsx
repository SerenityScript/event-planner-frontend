import { FiEdit } from "react-icons/fi";
import styles from "./EditButton.module.scss";

export const EditButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.editButton}
      aria-label="Edit"
    >
      <FiEdit   size={18} color="#777" />
    </button>
  );
};