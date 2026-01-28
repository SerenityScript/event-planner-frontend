import { request } from "./base";

export const getTasks = (eventId) => request(`/api/events/${eventId}/tasks`);

export const createTask = (eventId, payload) =>
  request(`/api/events/${eventId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateTask = (eventId, id, payload) =>
  request(`/api/events/${eventId}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const deleteTask = (eventId, id) =>
  request(`/api/events/${eventId}/tasks/${id}`, { method: "DELETE" });