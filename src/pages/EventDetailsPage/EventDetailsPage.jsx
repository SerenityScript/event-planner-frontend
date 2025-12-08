import { useParams } from "react-router-dom";
import { EventDetails } from "@/widgets/EventDetails/ui/EventDetails";

const EventDetailsPage = () => {
  const { id } = useParams();

  return <EventDetails eventId={id} />;
};

export default EventDetailsPage;