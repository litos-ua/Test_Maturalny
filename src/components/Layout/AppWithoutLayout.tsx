import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "../../theme";
import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { SEO } from "./../SEO"; // 🔥 Импорт

export function AppWithoutLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO /> {/* 🔥 Для индексации */}
      <Outlet />
    </ThemeProvider>
  );
}