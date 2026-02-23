import { formatDateDE } from "@/shared/utils";
import { useNavigate } from "react-router-dom";
import { DeleteEvent } from "@/features/DeleteEvent";
import styles from "./EventCard.module.scss";

export const EventCard = ({ event, onDeleted }) => {
  const navigate = useNavigate();
  if (!event) return null;

  return (
    <div
      onClick={() => navigate(`/events/${event._id}`)}
      className={styles.card}
    >
      <div className={styles.cardDetails}>
        <h2>{event.name}</h2>
        <p>
          Datum: {formatDateDE(event.date)} {event.time && `• ${event.time}`}
        </p>
        <p>Ort: {event.location}</p>
      </div>

      {/* ⬇️ блокируем всплытие */}
      <div onClick={(e) => e.stopPropagation()}>
        <DeleteEvent
          eventId={event._id}
          onDeleted={() => onDeleted?.()}
        />
      </div>
    </div>
  );
};