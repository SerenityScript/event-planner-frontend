import { useEffect, useState } from "react";
import { AddNewEvent } from "@/features/AddNewEvent/ui/AddNewEvent";
import { EventCard } from "@/entities/Event/ui/EventCard/EventCard";
import { getEvents } from "@/shared/api/events";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div>
      <h1>Meine Events</h1>

      <AddNewEvent />

      {loading && <p>Lade Events…</p>}

      {!loading && events.length === 0 && (
        <p>Noch keine Events</p>
      )}

      {!loading &&
        events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
    </div>
  );
};

export default EventListPage;
