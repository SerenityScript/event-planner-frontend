import { JSON_HEADERS, request } from "./base";

export const getGuests = (eventId) => request(`/events/${eventId}/guests`);

export const createGuest = (eventId, payload) =>
  request(`/events/${eventId}/guests`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const updateGuest = (eventId, id, payload) =>
  request(`/events/${eventId}/guests/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const deleteGuest = (eventId, id) =>
  request(`/events/${eventId}/guests/${id}`, { method: "DELETE" });