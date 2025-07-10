import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { DataProvider } from "./context/dataContext.tsx";
import { DarkModeProvider, useDarkMode } from "./context/darkModeContext.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const CustomThemeProvider = ({ children }) => {
  const { darkMode } = useDarkMode();

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

createRoot(document.getElementById("root")!).render(
  <DarkModeProvider>
    <DataProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </DataProvider>
  </DarkModeProvider>
);
