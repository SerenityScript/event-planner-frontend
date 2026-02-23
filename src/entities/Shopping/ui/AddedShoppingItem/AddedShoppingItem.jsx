import styles from "./AddedShoppingItem.module.scss";

export const AddedShoppingItem = ({ item, onToggleBought, actions }) => {
  if (!item) return null;

  const mapCategory = (value) => {
    if (value === "food") return "Lebensmittel";
    if (value === "drinks") return "Getränke";
    if (value === "decor") return "Deko";
    if (value === "other") return "Sonstiges";
    return value || "";
  };

  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        checked={item.bought}
        aria-label="Artikel gekauft"
        onChange={onToggleBought}
        className={styles.checkbox}
      />

      <div className={styles.info}>
        <div
          className={`${styles.name} ${
            item.bought ? styles.bought : ""
          }`}
        >
          {item.name}
        </div>
        {item.qty && (
          <div className={styles.qty}>
            {item.qty}
          </div>
        )}
      </div>

      <div className={styles.category}>
        {mapCategory(item.category)}
      </div>

      <div className={styles.actions}>{actions}</div>
    </div>
  );
};