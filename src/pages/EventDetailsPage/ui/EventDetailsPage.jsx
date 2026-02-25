import { useNavigate, useParams } from "react-router-dom";
import { useEventDetails } from "../model/useEventDetails";
import { EventTabs } from "@/widgets/EventTabs";
import { EventLayout } from "@/widgets/EventLayout";
import { EditEvent } from "@/features/EditEvent";
import { TasksPanel } from "@/widgets/TasksPanel";
import { GuestsPanel } from "@/widgets/GuestsPanel";
import { DishesPanel } from "@/widgets/DishesPanel";
import { ShoppingPanel } from "@/widgets//ShoppingPanel";
import styles from "./EventDetailsPage.module.scss";

const EventDetailsPage = ({ eventId: eventIdProp }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventId = eventIdProp ?? id;

  const {
    event,
    counts,
    activeTab,
    setActiveTab,
    loading,
    error,
    refreshCounts,
    handleUpdateEvent,
  } = useEventDetails(eventId);

  if (loading) return <div style={{ padding: 20 }}><p>Loading…</p></div>;
  if (error) return <div style={{ padding: 20 }}><p>{error}</p></div>;
  if (!event) return <div style={{ padding: 20 }}><p>Event nicht gefunden.</p></div>;

  return (
    <div className={styles.mainCont}>
      <button
        className={styles.backButton}
        onClick={() => navigate("/events")}
      >
        ← Zurück
      </button>

      <EventLayout
        event={event}
        rightActions={<EditEvent event={event} onUpdate={handleUpdateEvent} />}
      >
        <EventTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          guestsCount={counts.guests}
          tasksCount={counts.tasks}
          dishesCount={counts.dishes}
          shoppingCount={counts.shopping}
        />

        <div className={styles.tabsCont}>
          {activeTab === "guests" && <GuestsPanel eventId={eventId} onChanged={refreshCounts} />}
          {activeTab === "tasks" && <TasksPanel eventId={eventId} onChanged={refreshCounts} />}
          {activeTab === "dishes" && <DishesPanel eventId={eventId} onChanged={refreshCounts} />}
          {activeTab === "shopping" && <ShoppingPanel eventId={eventId} onChanged={refreshCounts} />}
        </div>
      </EventLayout>
    </div>
  );
};

export default EventDetailsPage;