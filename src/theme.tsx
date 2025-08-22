
import { createTheme } from "@mui/material";
import type { ThemeOptions } from "@mui/material";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      videoLabel: string;
      podcastLabel: string;
      quizLabel: string;
      outcard: string
    },
  }

  interface PaletteOptions {
    custom?: {
      videoLabel?: string;
      podcastLabel?: string;
      quizLabel?: string;
      outcard?: string
    };
  }
}

export const getAppTheme = (darkMode: boolean) => {
  const lightPalette: ThemeOptions["palette"] = {
    mode: "light",
    primary: {
      main: "#81C3FF", // светло-синий
    },
    secondary: {
      main: "#FFAB76", // мягкий оранжевый
    },
    background: {
      default: "#f5f6f8", // светло-серый фон
      paper: "#ffffff",
    },
    text: {
      primary: "#1e1e1e",
      secondary: "#4f4f4f",
    },
      custom: {
      videoLabel: "#CBB7FF",
      podcastLabel: "#B0E0FF",
      quizLabel: "#FFD580",
      outcard:"#B0E0FF",
    },
  };

  const darkPalette: ThemeOptions["palette"] = {
    mode: "dark",
    primary: {
      main: "#00427A", // насыщенный синий
    },
    secondary: {
      main: "#F47E3E", // акцент (оранжевый)
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",

    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
      custom: {
      videoLabel: "#CBB7FF",
      podcastLabel: "#B0E0FF",
      quizLabel: "#FF8C00",
      outcard:"#4169E1",
    },
    
  };

  return createTheme({
    palette: darkMode ? darkPalette : lightPalette,
    typography: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      body1: { fontSize: "1rem" },
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              textTransform: "none",
              borderRadius: 8,
              fontWeight: 600,
              ...(ownerState.variant === "contained" && {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.getContrastText(theme.palette.secondary.main),
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgb(213, 93, 37)" // темно-оранжевый для тёмной темы #e6865a
                    : "#E36A2C" // светлее для светлой темы
                },
              }),
            }),
          },
        },
    },
  });
};

