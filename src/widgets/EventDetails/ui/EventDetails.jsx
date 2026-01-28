import { useCallback, useEffect, useState } from "react";
import { getEventById } from "@/shared/api";

import { EventTabs } from "@/widgets/EventTabs/ui/EventTabs";
import { EventLayout } from "@/widgets/EventLayout/ui/EventLayout";
import { EditEvent } from "@/features/EditEvent";

import { TasksPanel } from "@/widgets/TasksPanel/ui/TasksPanel";
import { GuestsPanel } from "@/widgets/GuestsPanel/ui/GuestsPanel";
import { DishesPanel } from "@/widgets/DishesPanel/ui/DishesPanel";
import { ShoppingPanel } from "@/widgets/ShoppingPanel/ui/ShoppingPanel";

export const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ counts от панелей
  const [tasksCount, setTasksCount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(0);
  const [dishesCount, setDishesCount] = useState(0);
  const [shoppingCount, setShoppingCount] = useState(0);

  const loadEvent = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    setError("");

    try {
      const data = await getEventById(eventId);
      setEvent(data);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load event");
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <p>{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Event nicht gefunden.</p>
      </div>
    );
  }

  const handleUpdateEvent = (updatedEvent) => {
    setEvent(updatedEvent);
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
            <GuestsPanel eventId={event._id} onCountChange={setGuestsCount} />
          )}

          {activeTab === "tasks" && (
            <TasksPanel eventId={event._id} onCountChange={setTasksCount} />
          )}

          {activeTab === "dishes" && (
            <DishesPanel eventId={event._id} onCountChange={setDishesCount} />
          )}

          {activeTab === "shopping" && (
            <ShoppingPanel eventId={event._id} onCountChange={setShoppingCount} />
          )}
        </div>
      </EventLayout>
    </div>
  );
};