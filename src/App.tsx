
import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "./theme";
import Layout from "./components/Layout/Layout";
import { SEO } from "./components/SEO"; // 🔥 Импорт

export function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => getAppTheme(darkMode), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO /> {/* 🔥 Для индексации */}
      <Layout onToggleTheme={() => setDarkMode((prev) => !prev)} />
    </ThemeProvider>
  );
}

export default App;

