import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CoinsProvider } from "@/context/CoinsProvider.tsx";
import { AppRouter } from "@/router/AppRouter.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <CoinsProvider>
      <AppRouter />
    </CoinsProvider>
  </StrictMode>
);
