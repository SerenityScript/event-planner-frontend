import { useCallback, useEffect, useState } from "react";
import { getEvents } from "@/shared/api";
import { EventCard } from "@/entities/Event";
import { AddNewEvent } from "@/features/AddNewEvent/ui/AddNewEvent";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <div>
      <h1>Meine Events</h1>

      <AddNewEvent onCreated={loadEvents} />

      {loading && <p>Lade Events…</p>}

      {!loading && events.length === 0 && <p>Noch keine Events</p>}

      {!loading &&
        events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
    </div>
  );
};

export default EventListPage;