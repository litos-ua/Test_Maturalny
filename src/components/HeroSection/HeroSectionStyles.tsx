import type { SxProps, Theme } from "@mui/material";

export const heroSectionSx: SxProps<Theme> = {
  position: "relative",
  backgroundImage: `url('/hero-bg.avif')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: { xs: 220, sm: 260, md: 320, lg: 380 },
  display: "flex",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    bgcolor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
};

export const containerSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 2,
};

export const titleSx: SxProps<Theme> = {
  fontWeight: "bold",
  fontSize: {
    xs: "1.8rem",   // смартфоны
    sm: "2.2rem",   // планшеты
    md: "3rem",     // десктоп
    lg: "3.5rem",   // большие мониторы
  },
};

export const subtitleSx: SxProps<Theme> = {
  mb: { xs: 2, sm: 3, md: 4 },
  fontSize: {
    xs: "1rem",
    sm: "1.2rem",
    md: "1.4rem",
  },
};

export const textFieldSx: SxProps<Theme> = {
  backgroundColor: "#fff",
  borderRadius: 1,
  width: { xs: "100%", sm: 350, md: 400 },
};
