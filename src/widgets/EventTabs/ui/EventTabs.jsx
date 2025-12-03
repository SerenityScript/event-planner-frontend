const TABS = [
  { id: "guests", label: "Gäste" },
  { id: "tasks", label: "Aufgaben" },
  { id: "dishes", label: "Gerichte" },
  { id: "shopping", label: "Einkäufe" },
];

export const EventTabs = ({
  activeTab,
  onTabChange,
  guestsCount,
  tasksCount,
  dishesCount,
  shoppingCount,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      {TABS.map((tab) => {
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
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: isActive ? "1px solid #ff8a00" : "1px solid #ccc",
              backgroundColor: isActive ? "#ff8a00" : "#f7f7f7",
              color: isActive ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: isActive ? "600" : "400",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};