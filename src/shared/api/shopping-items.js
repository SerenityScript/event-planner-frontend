import { JSON_HEADERS, request } from "./base";

export const getShoppingItems = (eventId) => request(`/events/${eventId}/shopping-items`);

export const createShoppingItem = (eventId, payload) =>
  request(`/events/${eventId}/shopping-items`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const updateShoppingItem = (eventId, id, payload) =>
  request(`/events/${eventId}/shopping-items/${id}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

export const deleteShoppingItem = (eventId, id) =>
  request(`/events/${eventId}/shopping-items/${id}`, { method: "DELETE" });