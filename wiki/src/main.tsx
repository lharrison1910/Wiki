import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { DarkModeProvider, useDarkMode } from "./context/darkModeContext.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { darkMode } = useDarkMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#bb86fc",
            dark: "#1976d2",
            contrastText: "#ffffff",
          },
        },
      }),
    [darkMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

createRoot(document.getElementById("root")!).render(
  <DarkModeProvider>
    <BrowserRouter>
      <StrictMode>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </StrictMode>
    </BrowserRouter>
  </DarkModeProvider>
);
