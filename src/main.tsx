import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoinsProvider } from "@/context/CoinsProvider.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <CoinsProvider>
      <App />
    </CoinsProvider>
  </StrictMode>
);
