import { request } from "./base";

export const getDishes = (eventId) => request(`/api/events/${eventId}/dishes`);

export const createDish = (eventId, payload) =>
  request(`/api/events/${eventId}/dishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateDish = (eventId, id, payload) =>
  request(`/api/events/${eventId}/dishes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const deleteDish = (eventId, id) =>
  request(`/api/events/${eventId}/dishes/${id}`, { method: "DELETE" });