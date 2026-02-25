import { JSON_HEADERS, request } from "./base";

export const getDishes = (eventId) => request(`/events/${eventId}/dishes`);

export const createDish = (eventId, payload) =>
  request(`/events/${eventId}/dishes`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const updateDish = (eventId, id, payload) =>
  request(`/events/${eventId}/dishes/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const deleteDish = (eventId, id) =>
  request(`/events/${eventId}/dishes/${id}`, { method: "DELETE" });