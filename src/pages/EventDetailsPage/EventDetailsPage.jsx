// src/pages/EventDetailsPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { EventTabs } from "@/widgets/EventTabs/ui/EventTabs";
import { EventLayout } from "@/widgets/EventLayout/ui/EventLayout";
import { EditEvent } from "@/features/EditEvent/ui/EditEvent";
import { TasksPanel } from "@/widgets/TasksPanel/ui/TasksPanel";
import { GuestsPanel } from "@/widgets/GuestsPanel/ui/GuestsPanel";
import { DishesPanel } from "@/widgets/DishesPanel/ui/DishesPanel";
import { ShoppingPanel } from "@/widgets/ShoppingPanel/ui/ShoppingPanel";

// временный мок, пока нет backend
const mockEvents = [
  {
    id: "1",
    title: "Geburtstag von Mama",
    date: "2025-12-10",
    time: "18:00",
    location: "Hamburg",
    guests: [
      { id: "g1", name: "Anna", contact: "anna@example.com", status: "invited" },
      { id: "g2", name: "Ben", contact: "ben@example.com", status: "confirmed" },
      { id: "g3", name: "Cara", contact: "cara@example.com", status: "declined" },
    ],
    tasks: [/* ... */],
    dishes: [/* ... */],
    shopping: [
      {
        id: "s1",
        name: "Orangensaft",
        qty: "3 L",
        category: "drinks",
        bought: false,
      },
      {
        id: "s2",
        name: "Kerzen für den Kuchen",
        qty: "1 Packung",
        category: "decor",
        bought: true,
      },
    ],
  },
  {
    id: "2",
    title: "Silvester Party",
    date: "2025-12-31",
    time: "22:00",
    location: "Berlin",
    guests: [],
    tasks: [/* ... */],
    dishes: [],
    shopping: [],
  },
];

const EventDetailsPage = () => {
  const { id } = useParams();
  const initialEvent = mockEvents.find((e) => e.id === id) || null;

  const [event, setEvent] = useState(initialEvent);

  const guestsCount =
    event?.guests?.filter((guest) => guest.status !== "declined").length || 0;
  
  const tasksCount =
    event?.tasks?.filter((task) => task.done !== true).length || 0;
  
  const dishesCount = event?.dishes?.length || 0;

  const shoppingCount =
  event?.shopping?.filter((item) => item.bought !== true).length || 0;
  
  const [activeTab, setActiveTab] = useState("tasks");

  const handleUpdateEvent = (updatedEvent) => {
    setEvent(updatedEvent);
  };

  const handleChangeGuests = (newGuests) => {
    setEvent((prev) =>
      prev
        ? {
            ...prev,
            guests: newGuests,
          }
        : prev
    );
  };

  const handleChangeTasks = (newTasks) => {
    setEvent((prev) =>
      prev
        ? {
            ...prev,
            tasks: newTasks,
          }
        : prev
    );
  };

  const handleChangeDishes = (newDishes) => {
  setEvent((prev) =>
    prev
      ? {
          ...prev,
          dishes: newDishes,
        }
      : prev
  );
  };
  
  const handleChangeShopping = (newItems) => {
  setEvent((prev) =>
    prev
      ? {
          ...prev,
          shopping: newItems,
        }
      : prev
  );
};


  if (!event) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Event nicht gefunden.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <EventLayout
        event={event}
        rightActions={
          <EditEvent event={event} onUpdate={handleUpdateEvent} />
        }
      >
        <EventTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          guestsCount={guestsCount}
          tasksCount={tasksCount}
          dishesCount={dishesCount}
          shoppingCount={shoppingCount}
        />

        <div style={{ marginTop: "20px" }}>
          {activeTab === "guests" && (
            <GuestsPanel
              guests={event.guests || []}
              onChangeGuests={handleChangeGuests}
            />
          )}
          {activeTab === "tasks" && (
            <TasksPanel tasks={event.tasks || []} onChangeTasks={handleChangeTasks} />
          )}
          {activeTab === "dishes" && (
            <DishesPanel
              dishes={event.dishes || []}
              onChangeDishes={handleChangeDishes}
            />
          )}
          {activeTab === "shopping" && (
    <ShoppingPanel
      items={event.shopping || []}
      onChangeItems={handleChangeShopping}
    />
  )}
        </div>
      </EventLayout>
    </div>
  );
};

export default EventDetailsPage;
