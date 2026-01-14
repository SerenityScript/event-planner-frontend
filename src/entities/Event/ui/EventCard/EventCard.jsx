import { Link } from "react-router-dom";
import { formatDateDE } from "@/shared/utils";

export const EventCard = ({ event, onDelete }) => {
  if (!event) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "8px" }}>
      <h2>{event.name}</h2>

      <p>
        Datum: {formatDateDE(event.date)} {event.time && `• ${event.time}`}
      </p>

      <div style={{ display: "flex", gap: "8px" }}>
        <Link to={`/events/${event._id}`}>Öffnen</Link>

        <button onClick={() => onDelete?.(event._id)}>
          Delete Event
        </button>
      </div>
    </div>
  );
};