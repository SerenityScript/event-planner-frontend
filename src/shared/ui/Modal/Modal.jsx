import styles from "./Modal.module.scss";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalMainCont} onClick={onClose}>
      <div
        className={styles.modalCont}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};