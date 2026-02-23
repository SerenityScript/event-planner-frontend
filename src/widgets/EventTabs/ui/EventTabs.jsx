import { tabs } from "../lib/tabs";
import styles from "./EventTabs.module.scss";

export const EventTabs = ({
  activeTab,
  onTabChange,
  guestsCount,
  tasksCount,
  dishesCount,
  shoppingCount,
}) => {
  return (
    <div className={styles.tabsRow}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        // 👇 Логика отображения лейбла
        let label = tab.label;

        // Gäste
        if (tab.id === "guests" && typeof guestsCount === "number") {
          label = `${tab.label} (${guestsCount})`;
        }

        // Aufgaben
        if (tab.id === "tasks" && typeof tasksCount === "number") {
          label = `${tab.label} (${tasksCount})`;
        }

        // Gerichte (Dishes)
        if (tab.id === "dishes" && typeof dishesCount === "number") {
          label = `${tab.label} (${dishesCount})`;
        }

        // Einkäufe (Shopping)
        if (tab.id === "shopping" && typeof shoppingCount === "number") {
          label = `${tab.label} (${shoppingCount})`;
        }


        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};