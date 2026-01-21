import { request, JSON_HEADERS } from "./base";

export const getEvents = () => request("/api/events");

export const getEventById = (id) => request(`/api/events/${id}`);

export const createEvent = (payload) =>
  request("/api/events", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const updateEvent = (id, payload) =>
  request(`/api/events/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const deleteEvent = (id) =>
  request(`/api/events/${id}`, { method: "DELETE" });