import { toISODate, isValidTime } from "@/shared/utils";

export const validateEventForm = (form) => {
  const isoDate = toISODate(form.date);
  const okTime = isValidTime(form.time);

  return {
    date: isoDate ? "" : "Use format DD.MM.YYYY (e.g. 02.04.2026)",
    time: okTime ? "" : "Use format HH:mm (e.g. 15:00)",
  };
};