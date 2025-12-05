import { useState } from "react";

export const EventForm = ({
  initialValues = {
    name: "",
    date: "",
    time: "",
    location: "",
  },
  onSubmit,
  submitLabel = "Save Changes",
  isSubmitting = false,
}) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <div className="event-form">
      {/* Верхняя панель */}
      <header className="event-form__header">
        <button
          type="button"
          className="event-form__back-button"
          aria-label="Back"
        >
          ←
        </button>
        <h1 className="event-form__title">Event Details</h1>
      </header>

      <form className="event-form__body" onSubmit={handleSubmit}>
        {/* Event Name */}
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

        {/* Date + Time в одной строке */}
        <div className="event-form__row">
          <div className="event-form__field event-form__field--half">
            <label className="event-form__label" htmlFor="event-date">
              Date
            </label>
            <input
              id="event-date"
              type="text"
              className="event-form__input"
              placeholder="Dec 25, 2024"
              value={form.date}
              onChange={handleChange("date")}
              // позже можно заменить на type="date"
            />
          </div>

          <div className="event-form__field event-form__field--half">
            <label className="event-form__label" htmlFor="event-time">
              Time
            </label>
            <input
              id="event-time"
              type="text"
              className="event-form__input"
              placeholder="8:00 PM"
              value={form.time}
              onChange={handleChange("time")}
              // позже можно заменить на type="time"
            />
          </div>
        </div>

        {/* Location */}
        <div className="event-form__field">
          <label className="event-form__label" htmlFor="event-location">
            Location
          </label>
          <div className="event-form__input-wrapper">
            <input
              id="event-location"
              type="text"
              className="event-form__input event-form__input--with-icon"
              placeholder="123 Main Street, Anytown"
              value={form.location}
              onChange={handleChange("location")}
            />
            <span className="event-form__icon" aria-hidden="true">
              📍
            </span>
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="event-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </form>
    </div>
  );
};