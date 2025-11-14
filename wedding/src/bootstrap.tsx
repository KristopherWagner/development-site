import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeddingPage from "./wedding";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <WeddingPage />
  </StrictMode>
);
