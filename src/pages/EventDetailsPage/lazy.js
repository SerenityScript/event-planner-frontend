import { lazy } from "react";

export const EventDetailsPageLazy = lazy(() =>
  import("./ui/EventDetailsPage")
);