import styles from "./ConfirmModal.module.scss";

export const ConfirmModal = ({
  open,
  message = "Wirklich löschen?",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={onCancel}>
      <div
        className={styles.modal}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.body}>
          {message}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={onCancel}
          >
            Abbrechen
          </button>

          <button
            type="button"
            className={styles.btnDanger}
            onClick={onConfirm}
            autoFocus
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
};