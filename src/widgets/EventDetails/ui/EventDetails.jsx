import { useState } from "react";
import { EventTabs } from "@/widgets/EventTabs/ui/EventTabs";
import { EventLayout } from "@/widgets/EventLayout/ui/EventLayout";
import { EditEvent } from "@/features/EditEvent/ui/EditEvent";
import { TasksPanel } from "@/widgets/TasksPanel/ui/TasksPanel";
import { GuestsPanel } from "@/widgets/GuestsPanel/ui/GuestsPanel";
import { DishesPanel } from "@/widgets/DishesPanel/ui/DishesPanel";
import { ShoppingPanel } from "@/widgets/ShoppingPanel/ui/ShoppingPanel";
import { mockEvents } from "../lib/mockEvents";


export const EventDetails = ({ eventId }) => {
  const initialEvent = mockEvents.find((e) => e.id === eventId) || null;
  const [event, setEvent] = useState(initialEvent);
  const [activeTab, setActiveTab] = useState("tasks");

  if (!event) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Event nicht gefunden.</p>
      </div>
    );
  }

  // счётчики для табов
  const guestsCount =
    event.guests?.filter((guest) => guest.status !== "declined").length || 0;

  const tasksCount =
    event.tasks?.filter((task) => task.done !== true).length || 0;

  const dishesCount = event.dishes?.length || 0;

  const shoppingCount =
    event.shopping?.filter((item) => item.bought !== true).length || 0;

  // хендлеры обновлений
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

  return (
    <div style={{ padding: "20px" }}>
      <EventLayout
        event={event}
        rightActions={<EditEvent event={event} onUpdate={handleUpdateEvent} />}
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
            <TasksPanel
              tasks={event.tasks || []}
              onChangeTasks={handleChangeTasks}
            />
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