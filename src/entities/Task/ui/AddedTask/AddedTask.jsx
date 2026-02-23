import styles from "./AddedTask.module.scss";

export const AddedTask = ({ task, onToggle, actions }) => {
  if (!task) return null;

  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={onToggle}
        className={styles.checkbox}
        aria-label="Aufgabe erledigt"
      />

      <span className={`${styles.title} ${task.done ? styles.done : ""}`}>
        {task.title}
      </span>

      <div className={styles.actions}>{actions}</div>
    </div>
  );
};