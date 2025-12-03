// src/shared/ui/Modal/Modal.jsx
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "12px",
          minWidth: "320px",
          maxWidth: "90vw",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{ float: "right", border: "none", background: "transparent" }}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};
