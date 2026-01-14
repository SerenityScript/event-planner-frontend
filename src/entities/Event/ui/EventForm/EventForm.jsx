import { useEffect, useState } from "react";
import { fromISODate, toISODate, isValidTime } from "@/shared/utils";

export const EventForm = ({
  initialValues = {
    name: "",
    date: "", // в UI: DD.MM.YYYY
    time: "", // HH:mm
    location: "",
  },
  onSubmit,
  submitLabel = "Save Changes",
  isSubmitting = false,
}) => {
  const [form, setForm] = useState(() => ({
    name: initialValues?.name ?? "",
    date: fromISODate(initialValues?.date ?? ""), // если пришло ISO — покажем DE
    time: initialValues?.time ?? "",
    location: initialValues?.location ?? "",
  }));

  const [errors, setErrors] = useState({ date: "", time: "" });

  // если initialValues меняются (например, при загрузке события) — синхронизируем форму
  useEffect(() => {
    setForm({
      name: initialValues?.name ?? "",
      date: fromISODate(initialValues?.date ?? ""),
      time: initialValues?.time ?? "",
      location: initialValues?.location ?? "",
    });
    setErrors({ date: "", time: "" });
  }, [initialValues]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    // лёгкая live-валидация
    if (field === "date") {
      const iso = toISODate(value);
      setErrors((prev) => ({
        ...prev,
        date: value.trim() === "" ? "" : iso ? "" : "Use format DD.MM.YYYY (e.g. 02.04.2026)",
      }));
    }

    if (field === "time") {
      setErrors((prev) => ({
        ...prev,
        time: value.trim() === "" ? "" : isValidTime(value) ? "" : "Use format HH:mm (e.g. 15:00)",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isoDate = toISODate(form.date);
    const okTime = isValidTime(form.time);

    const nextErrors = {
      date: isoDate ? "" : "Use format DD.MM.YYYY (e.g. 02.04.2026)",
      time: okTime ? "" : "Use format HH:mm (e.g. 15:00)",
    };
    setErrors(nextErrors);

    const hasErrors = Boolean(nextErrors.date || nextErrors.time);
    if (hasErrors) return;

    // отправляем на backend в согласованном формате
    const payload = {
      name: form.name.trim(),
      date: isoDate, // "YYYY-MM-DD"
      time: form.time.trim(), // "HH:mm"
      location: form.location.trim(),
    };

    onSubmit?.(payload);
  };

  return (
    <div className="event-form">
      <header className="event-form__header">
        <button type="button" className="event-form__back-button" aria-label="Back">
          ←
        </button>
        <h1 className="event-form__title">Event Details</h1>
      </header>

      <form className="event-form__body" onSubmit={handleSubmit}>
        <div className="event-form__field">
          <label className="event-form__label" htmlFor="event-name">
            Event Name
          </label>
          <input
            id="event-name"
            type="text"
            className="event-form__input"
            placeholder="John's Birthday Party"
            value={form.name}
            onChange={handleChange("name")}
          />
        </div>

        <div className="event-form__row">
          <div className="event-form__field event-form__field--half">
            <label className="event-form__label" htmlFor="event-date">
              Date
            </label>
            <input
              id="event-date"
              type="text"
              className="event-form__input"
              placeholder="02.04.2026"
              value={form.date}
              onChange={handleChange("date")}
              inputMode="numeric"
              aria-invalid={Boolean(errors.date)}
            />
            {errors.date && <div className="event-form__error">{errors.date}</div>}
          </div>

          <div className="event-form__field event-form__field--half">
            <label className="event-form__label" htmlFor="event-time">
              Time
            </label>
            <input
              id="event-time"
              type="text"
              className="event-form__input"
              placeholder="15:00"
              value={form.time}
              onChange={handleChange("time")}
              inputMode="numeric"
              aria-invalid={Boolean(errors.time)}
            />
            {errors.time && <div className="event-form__error">{errors.time}</div>}
          </div>
        </div>

        <div className="event-form__field">
          <label className="event-form__label" htmlFor="event-location">
            Location
          </label>
          <div className="event-form__input-wrapper">
            <input
              id="event-location"
              type="text"
              className="event-form__input event-form__input--with-icon"
              placeholder="Restaurant / Park / Address"
              value={form.location}
              onChange={handleChange("location")}
            />
            <span className="event-form__icon" aria-hidden="true">
              📍
            </span>
          </div>
        </div>

        <button type="submit" className="event-form__submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </form>
    </div>
  );
};