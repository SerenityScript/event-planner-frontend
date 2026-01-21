import { formatDateDE } from "@/shared/utils";
import { useNavigate } from "react-router-dom";

export const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  if (!event) return null;

  return (
    <div
      onClick={() => navigate(`/events/${event._id}`)}
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
    >
      <h2>{event.name}</h2>

      <p>
        Datum: {formatDateDE(event.date)} {event.time && `• ${event.time}`}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm("Delete this event?")) {
            onDelete?.(event._id);
          }
        }}
      >
        Delete Event
      </button>
    </div>
  );
};