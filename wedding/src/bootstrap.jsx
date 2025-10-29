import React from "react";
import { createRoot } from "react-dom/client";
import WeddingPage from "./wedding";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <WeddingPage />
  </React.StrictMode>
);
