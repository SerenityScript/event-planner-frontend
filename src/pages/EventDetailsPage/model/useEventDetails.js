import { useCallback, useEffect, useState } from "react";
import { getEventById } from "@/shared/api";
import { getEventCounts } from "@/shared/api/events";

const normalizeCounts = (c) => ({
  tasks: c?.tasks ?? 0,
  guests: c?.guests ?? 0,
  dishes: c?.dishes ?? 0,
  shopping: c?.shopping ?? 0,
});

export const useEventDetails = (eventId) => {
  const [event, setEvent] = useState(null);
  const [counts, setCounts] = useState(normalizeCounts(null));
  const [activeTab, setActiveTab] = useState("tasks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshCounts = useCallback(async () => {
    if (!eventId) return;
    try {
      const c = await getEventCounts(eventId);
      setCounts(normalizeCounts(c));
    } catch (e) {
      console.error(e);
    }
  }, [eventId]);

  const loadEvent = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    setError("");

    try {
      const [eventData, countsData] = await Promise.all([
        getEventById(eventId),
        getEventCounts(eventId),
      ]);

      setEvent(eventData);
      setCounts(normalizeCounts(countsData));
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load event");
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const handleUpdateEvent = useCallback((updatedEvent) => {
    setEvent(updatedEvent);
  }, []);

  return {
    event,
    counts,
    activeTab,
    setActiveTab,
    loading,
    error,
    refreshCounts,
    handleUpdateEvent,
  };
};