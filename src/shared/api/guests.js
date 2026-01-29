import { request } from "./base";

export const getGuests = (eventId) => request(`/api/events/${eventId}/guests`);

export const createGuest = (eventId, payload) =>
  request(`/api/events/${eventId}/guests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateGuest = (eventId, id, payload) =>
  request(`/api/events/${eventId}/guests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const deleteGuest = (eventId, id) =>
  request(`/api/events/${eventId}/guests/${id}`, { method: "DELETE" });