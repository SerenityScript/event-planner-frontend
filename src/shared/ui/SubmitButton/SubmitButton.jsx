import styles from "./SubmitButton.module.scss";

export const SubmitButton = ({ children }) => {
  return (
    <button
      type="submit"
      className={styles.button}
    >
      {children}
    </button>
  )
}