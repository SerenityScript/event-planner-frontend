import { useEffect, useState } from "react";
import { toISODate, isValidTime } from "@/shared/utils";
import { mapFormToPayload, mapInitialToForm, validateEventForm } from "@/entities/Event/lib";
import styles from "./EventForm.module.scss";

export const EventForm = ({
  initialValues = { name: "", date: "", time: "", location: "" },
  onSubmit,
  submitLabel = "Save Changes",
  isSubmitting = false,
}) => {
  const [form, setForm] = useState(() => mapInitialToForm(initialValues));
  const [errors, setErrors] = useState({ date: "", time: "" });

  useEffect(() => {
    setForm(mapInitialToForm(initialValues));
    setErrors({ date: "", time: "" });
  }, [initialValues?.name, initialValues?.date, initialValues?.time, initialValues?.location]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === "date") {
      const iso = toISODate(value);
      setErrors((prev) => ({
        ...prev,
        date: value.trim() === "" ? "" : iso ? "" : "Datumsformat - TT.MM.JJJJ (Beispiel - 02.04.2026)",
      }));
    }

    if (field === "time") {
      setErrors((prev) => ({
        ...prev,
        time: value.trim() === "" ? "" : isValidTime(value) ? "" : "Format HH:mm (Beispiel - 15:00)",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validateEventForm(form);
    setErrors(nextErrors);

    const hasErrors = Boolean(nextErrors.date || nextErrors.time);
    if (hasErrors) return;

    const payload = mapFormToPayload(form);
    onSubmit?.(payload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.eventFormField}>
          <label className={styles.eventFormLabel} htmlFor="event-name">
            Event Name
          </label>
          <input
            id="event-name"
            type="text"
            className={styles.eventFormInput}
            placeholder="Geburtstagsfeier"
            value={form.name}
            onChange={handleChange("name")}
          />
        </div>
        
        <div className={styles.eventFormField}>
          <label className={styles.eventFormLabel} htmlFor="event-date">
            Datum
          </label>
          <input
            id="event-date"
            type="text"
            className={styles.eventFormInput}
            placeholder="02.04.2026"
            value={form.date}
            onChange={handleChange("date")}
            inputMode="numeric"
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date && <div>{errors.date}</div>}
        </div>

        <div className={styles.eventFormField}>
          <label className={styles.eventFormLabel} htmlFor="event-time">
            Uhrzeit
          </label>
          <input
            id="event-time"
            type="text"
            className={styles.eventFormInput}
            placeholder="15:00"
            value={form.time}
            onChange={handleChange("time")}
            inputMode="numeric"
            aria-invalid={Boolean(errors.time)}
          />
          {errors.time && <div>{errors.time}</div>}
        </div>
        
        <div className={styles.eventFormField}>
          <label className={styles.eventFormLabel} htmlFor="event-location">
            Standort
          </label>
          
          <input
            id="event-location"
            type="text"
            className={styles.eventFormInput}
            placeholder="Restaurant / Park / Adresse"
            value={form.location}
            onChange={handleChange("location")}
          />
        </div>
        
        <div className={styles.eventFormBtnContainer}>
          <button type="submit" className={styles.eventFormBtn} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};