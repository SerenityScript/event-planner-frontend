import { toISODate, isValidTime } from "@/shared/utils";

export const validateEventForm = (form) => {
  const isoDate = toISODate(form.date);
  const okTime = isValidTime(form.time);

  return {
    date: isoDate ? "" : "Datumsformat - TT.MM.JJJJ (Beispiel - 02.04.2026)",
    time: okTime ? "" : "Format HH:mm (Beispiel - 15:00)",
  };
};