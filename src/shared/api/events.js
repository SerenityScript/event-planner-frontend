import { request, JSON_HEADERS } from "./base";

export const getEvents = () => request("/events");

export const getEventById = (id) => request(`/events/${id}`);

export const getEventCounts = (id) => request(`/events/${id}/counts`);

export const createEvent = (payload) =>
  request("/events", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const updateEvent = (id, payload) =>
  request(`/events/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const deleteEvent = (id) =>
  request(`/events/${id}`, { method: "DELETE" });