export const SubmitButton = ({ children }) => {
  return (
    <button
      type="submit"
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#ff8a00",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  )
}