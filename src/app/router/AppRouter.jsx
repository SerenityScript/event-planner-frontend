import { Navigate, Route, Routes } from "react-router-dom";
import EventListPage from "@/pages/EventsListPage/EventListPage";
import EventDetailsPage from "@/pages/EventDetailsPage/EventDetailsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/events" replace />} />
      <Route path="/events" element={<EventListPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
    </Routes>
  )
}