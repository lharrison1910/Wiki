import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { DataProvider } from "./context/dataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </DataProvider>
);
