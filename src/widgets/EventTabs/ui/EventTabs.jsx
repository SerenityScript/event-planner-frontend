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

        let label = tab.label;

        if (tab.id === "guests" && typeof guestsCount === "number") {
          label = `${tab.label} (${guestsCount})`;
        }

        if (tab.id === "tasks" && typeof tasksCount === "number") {
          label = `${tab.label} (${tasksCount})`;
        }

        if (tab.id === "dishes" && typeof dishesCount === "number") {
          label = `${tab.label} (${dishesCount})`;
        }

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