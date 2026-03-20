import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "@/App";
import { ROUTES } from "@/config/routes";

/**
 * Game shell + overlay routes all render `<App />`; App uses the pathname to
 * decide which overlay (if any) to show.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.root} element={<App />} />
        <Route path={ROUTES.info} element={<App />} />
        <Route path={ROUTES.legal} element={<App />} />
        <Route path={ROUTES.spend} element={<App />} />
        <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
