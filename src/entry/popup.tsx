import React from "react";
import { createRoot } from "react-dom/client";
import { OptionsPage } from "../pages/OptionsPage";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <OptionsPage mode="popup" />
  </React.StrictMode>
);
