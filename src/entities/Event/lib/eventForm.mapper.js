import { fromISODate, toISODate } from "@/shared/utils";

export const mapInitialToForm = (initialValues) => ({
  name: initialValues?.name ?? "",
  date: fromISODate(initialValues?.date ?? ""),
  time: initialValues?.time ?? "",
  location: initialValues?.location ?? "",
});

export const mapFormToPayload = (form) => ({
  name: form.name.trim(),
  date: toISODate(form.date),
  time: form.time.trim(),
  location: form.location.trim(),
});