import { lazy } from "react";

export const EventListPageLazy = lazy(() =>
  import("./ui/EventListPage")
);