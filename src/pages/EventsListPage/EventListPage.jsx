import { AddNewEvent } from "@/features/AddNewEvent/ui/AddNewEvent";
import { EventCard } from "@/entities/Event/ui/EventCard/EventCard";

const mockEvents = [
  { id: "1", title: "День рождения мамы", date: "2025-12-10" },
  { id: "2", title: "Silvester Party", date: "2025-12-31" },
];

const EventListPage = () => {
    return (
        <div>
          <h1>Meine Events</h1>
        
          <AddNewEvent />
        
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
           
        </div>
    )
}

export default EventListPage;