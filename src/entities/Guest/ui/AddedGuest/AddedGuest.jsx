import styles from "./AddedGuest.module.scss";

export const AddedGuest = ({
  guest,
  statusOptions,
  onChangeStatus,
  actions,
}) => {
  if (!guest) return null;

  return (
    <div className={styles.card}>
      {/* Name */}
      <div className={styles.nameCol}>
        <div className={styles.name}>{guest.name}</div>
      </div>

      {/* Status Select */}
      <div className={styles.statusCol}>
        <select
          value={guest.status || "invited"}
          onChange={(e) => onChangeStatus?.(e.target.value)}
          className={styles.select}
        >
          {statusOptions.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>{actions}</div>
    </div>
  );
};