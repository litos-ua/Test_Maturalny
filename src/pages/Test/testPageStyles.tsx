import type { SxProps, Theme } from "@mui/material";

export const testButtonStyle: SxProps<Theme> = {
  position: "absolute",
  top: 16,
  textTransform: "none",
  fontSize: "1.1rem",
  px: 4,
  py: 1.5,
  borderRadius: 2,
};

export const testDisciplineImagetyle: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  maxWidth: "180vh",
  aspectRatio: "16/9",
  margin: "2rem auto",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: 3,
};

export const pageWrapper: SxProps<Theme> = {
  p: 4,
  textAlign: "center",
};

export const title: SxProps<Theme> = (theme) => ({
  fontWeight: "bold",
  mb: 2,
  color: theme.palette.text.secondary,
});

export const topicsList: SxProps<Theme> = {
  mt: 4,
};

export const listItem: SxProps<Theme> = {
  transition: "color 0.3s",
  "&:hover": {
    color: "secondary.main",
    cursor: "pointer",
  },
};
