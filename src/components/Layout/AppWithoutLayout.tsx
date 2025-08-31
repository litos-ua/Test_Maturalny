import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "../../theme";
import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";

export function AppWithoutLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}