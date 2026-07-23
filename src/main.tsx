import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CoinsProvider } from "@/context/CoinsProvider.tsx";
import { AppRouter } from "@/router/AppRouter.tsx";
import { Analytics } from "@vercel/analytics/react";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <CoinsProvider>
      <AppRouter />
      <Analytics />
    </CoinsProvider>
  </StrictMode>
);
