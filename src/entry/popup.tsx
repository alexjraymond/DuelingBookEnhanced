import React from "react";
import { createRoot } from "react-dom/client";
import { OptionsPage } from "../pages/OptionsPage";
import { ErrorBoundary } from "../components";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <OptionsPage mode="popup" />
    </ErrorBoundary>
  </React.StrictMode>
);
