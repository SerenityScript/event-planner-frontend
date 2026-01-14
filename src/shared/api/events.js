const request = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }
  return data;
};

export const getEvents = () => request("/api/events");

export const createEvent = (payload) =>
  request("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateEvent = (id, payload) =>
  request(`/api/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const deleteEvent = (id) =>
  request(`/api/events/${id}`, { method: "DELETE" });