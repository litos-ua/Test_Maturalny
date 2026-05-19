import { createTheme } from "@mui/material";
import type { ThemeOptions } from "@mui/material";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      videoLabel: string;
      podcastLabel: string;
      quizLabel: string;
      outcard: string;
      lightBlue?: string;
      lightGreen?: string;
      lightRed?: string;
      lightOrange?: string;
      darkCard?: string;
      lightCard?: string;
    };
    gradients?: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      videoLabel?: string;
      podcastLabel?: string;
      quizLabel?: string;
      outcard?: string;
      lightBlue?: string;
      lightGreen?: string;
      lightRed?: string;
      lightOrange?: string;
      darkCard?: string;
      lightCard?: string;
    };
    gradients?: {
      primary?: string;
      secondary?: string;
      success?: string;
      error?: string;
    };
  }
}

export const getAppTheme = (darkMode: boolean) => {
  const lightPalette: ThemeOptions["palette"] = {
    mode: "light",
    primary: {
      main: "#81C3FF", // светло-синий
      light: "#a8d5ff",
      dark: "#5a9ad9",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FFAB76", // мягкий оранжевый
      light: "#ffc5a1",
      dark: "#d98c54",
      contrastText: "#000000",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#000000",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#000000",
    },
    background: {
      //default: "#f5f6f8", // светло-серый фон
      //default: "#C5EAFF", // еще светлее светло-серый фон
      //default: "#E2F4FF", // еще немного светлее светло-серый фон
      default: "#FFF5E0", // слоновая кость
      //paper: "#ffffff",
      paper: "#e8f5e9",
    },
    text: {
      primary: "#1e1e1e",
      secondary: "#4f4f4f",
      disabled: "#bdbdbd",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    custom: {
      videoLabel: "#CBB7FF",
      podcastLabel: "#B0E0FF",
      quizLabel: "#FFD580",
      outcard: "#B0E0FF",
      lightBlue: "#e3f2fd",
      lightGreen: "#e8f5e9",
      lightRed: "#ffebee",
      lightOrange: "#fff3e0",
      darkCard: "#1e1e1e",
      lightCard: "#f5f5f5",
    },
    gradients: {
      primary: "linear-gradient(45deg, #81C3FF 30%, #a8d5ff 90%)",
      secondary: "linear-gradient(45deg, #FFAB76 30%, #ffc5a1 90%)",
      success: "linear-gradient(45deg, #4caf50 30%, #81c784 90%)",
      error: "linear-gradient(45deg, #f44336 30%, #e57373 90%)",
    },
  };

  const darkPalette: ThemeOptions["palette"] = {
    mode: "dark",
    primary: {
      main: "#00427A", // насыщенный синий
      light: "#336b94",
      dark: "#002e54",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F47E3E", // акцент (оранжевый)
      light: "#f69865",
      dark: "#aa582b",
      contrastText: "#000000",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#000000",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
      disabled: "#666666",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    action: {
      active: "#ffffff",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
    custom: {
      videoLabel: "#CBB7FF",
      podcastLabel: "#B0E0FF",
      quizLabel: "#FF8C00",
      outcard: "#4169E1",
      lightBlue: "#0d47a1",
      lightGreen: "#1b5e20",
      lightRed: "#b71c1c",
      lightOrange: "#e65100",
      darkCard: "#2d2d2d",
      lightCard: "#424242",
    },
    gradients: {
      primary: "linear-gradient(45deg, #00427A 30%, #336b94 90%)",
      secondary: "linear-gradient(45deg, #F47E3E 30%, #f69865 90%)",
      success: "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)",
      error: "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
    },
  };

  return createTheme({
    palette: darkMode ? darkPalette : lightPalette,
    typography: {
      fontFamily: "'Clash Display', 'Inter', 'Segoe UI', sans-serif",
      h1: { fontWeight: 700, fontFamily: "'Gambetta', 'Inter', sans-serif", },
      h2: { fontWeight: 600, fontFamily: "'Clash Display', 'Inter', sans-serif", },
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
                  ? "rgb(213, 93, 37)"
                  : "#E36A2C"
              },
            }),
          }),
        },
      },
    },
  });
};