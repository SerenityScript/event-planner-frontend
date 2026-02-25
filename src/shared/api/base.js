const API_URL = import.meta.env.VITE_API_URL;

export const request = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, options);

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }

  return data;
};

export const JSON_HEADERS = {
  "Content-Type": "application/json",
};