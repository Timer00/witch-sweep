import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";

/**
 * Close a fullscreen overlay: prefer one step back in history when the entry
 * was pushed in-app; otherwise replace to the game shell (e.g. direct /info URL).
 */
export function useOverlayClose() {
  const navigate = useNavigate();

  return useCallback(() => {
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === "number" && idx > 0) {
      void navigate(-1);
    } else {
      void navigate(ROUTES.root, { replace: true });
    }
  }, [navigate]);
}
