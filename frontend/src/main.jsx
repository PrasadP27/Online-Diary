import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/*" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>
);
