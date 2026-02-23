import styles from "./EventLayout.module.scss";

export const EventLayout = ({ event, children, rightActions }) => {
  if (!event) return null;

  return (
    <div className={styles.mainCont}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          {event.name}
        </h1>

        {rightActions && (
          <div>{rightActions}</div>
        )}
      </div>

      <div className={styles.meta}>
        {event.date && (
          <div>
            <span className={styles.metaLabel}>Datum:</span>
            {event.date}
          </div>
        )}

        {event.time && (
          <div>
            <span className={styles.metaLabel}>Zeit:</span>
            {event.time}
          </div>
        )}

        {event.location && (
          <div>
            <span className={styles.metaLabel}>Ort:</span>
            {event.location}
          </div>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};