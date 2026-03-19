import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "@/App";
import { ROUTES } from "@/config/routes";

/**
 * Top-level routing. Subtask 01: game shell only at root.
 * Overlay routes (/info, /legal, /spend, …) are wired in subtask 02+.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.root} element={<App />} />
        <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
