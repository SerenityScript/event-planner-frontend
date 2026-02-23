import styles from "./AddedDish.module.scss";

export const AddedDish = ({ dish, actions }) => {
  if (!dish) return null;

  const mapResponsible = (value) => {
    if (value === "me") return "Ich";
    if (value === "guest") return "Gast";
    if (value === "delivery") return "Lieferung";
    return value || "";
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.title}>{dish.name}</div>

          {dish.note && (
            <div className={styles.note}>
              {dish.note}
            </div>
          )}
        </div>

        <div className={styles.responsible}>
          {mapResponsible(dish.responsible)}
        </div>
      </div>

      <div className={styles.actions}>{actions}</div>
    </div>
  );
};