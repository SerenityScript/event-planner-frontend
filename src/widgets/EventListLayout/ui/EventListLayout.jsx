import { useCallback, useEffect, useState } from "react";
import { getEvents } from "@/shared/api";
import { EventCard } from "@/entities/Event";
import { AddNewEvent } from "@/features/AddNewEvent";
import styles from "./EventListLayout.module.scss";

export function EventListLayout() {
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
    <div className={styles.main}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Meine Events</h1>
    
        <AddNewEvent onCreated={loadEvents} />
      </div>
    
      {loading && <p>Lade Events…</p>}

      {!loading && events.length === 0 && <p>Noch keine Events</p>}

      <div className={styles.list}>
        {!loading &&
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDeleted={loadEvents}
            />
          ))
        }
      </div>
    </div>
  )
}