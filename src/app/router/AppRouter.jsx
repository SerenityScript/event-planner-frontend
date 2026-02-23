import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EventListPage from "@/pages/EventsListPage/ui/EventListPage";
import { EventDetailsPage } from "@/pages/EventDetailsPage";

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
      </Routes>
    </Suspense>
  );
}