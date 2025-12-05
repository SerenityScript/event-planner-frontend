import { Link } from "react-router-dom";

export const EventCard = ({ event }) => {
  if (!event) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "8px" }}>
      <h2>{event.title}</h2>
      <p>Datum: {event.date}</p>

      <Link to={`/events/${event.id}`}>Öffnen</Link>
      <button>Delete Event</button>
    </div>
  );
};