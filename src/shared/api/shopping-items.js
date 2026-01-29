import { request } from "./base";

export const getShoppingItems = (eventId) => request(`/api/events/${eventId}/shopping-items`);

export const createShoppingItem = (eventId, payload) =>
  request(`/api/events/${eventId}/shopping-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateShoppingItem = (eventId, id, payload) =>
  request(`/api/events/${eventId}/shopping-items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const deleteShoppingItem = (eventId, id) =>
  request(`/api/events/${eventId}/shopping-items/${id}`, { method: "DELETE" });