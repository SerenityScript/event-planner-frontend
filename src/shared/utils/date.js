/**
 * DE date -> ISO
 * "02.04.2026" -> "2026-04-02"
 */
export const toISODate = (deDate) => {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec((deDate || "").trim());
  if (!m) return null;

  const [, dd, mm, yyyy] = m;
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * ISO date -> DE
 * "2026-04-02" -> "02.04.2026"
 */
export const fromISODate = (isoDate) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((isoDate || "").trim());
  if (!m) return isoDate || "";

  const [, yyyy, mm, dd] = m;
  return `${dd}.${mm}.${yyyy}`;
};

/**
 * ISO date -> DD.MM.YYYY
 * "2026-04-02" -> "02.04.2026"
 */
export const formatDateDE = (isoDate) => {
  if (!isoDate) return "";

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate; // fallback, если формат неожиданный

  const [, year, month, day] = match;
  return `${day}.${month}.${year}`;
};

export const isValidTime = (value) =>
  /^([01]\d|2[0-3]):[0-5]\d$/.test((value || "").trim());