export const request = async (url, options) => {
  const res = await fetch(url, options);

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }

  return data;
};

export const JSON_HEADERS = { "Content-Type": "application/json" };