import { JSON_HEADERS, request } from "./base";

export const getTasks = (eventId) => request(`/events/${eventId}/tasks`);

export const createTask = (eventId, payload) =>
  request(`/events/${eventId}/tasks`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const updateTask = (eventId, id, payload) =>
  request(`/events/${eventId}/tasks/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const deleteTask = (eventId, id) =>
  request(`/events/${eventId}/tasks/${id}`, { method: "DELETE" });