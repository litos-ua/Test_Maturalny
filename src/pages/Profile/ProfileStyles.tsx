import type { SxProps, Theme } from "@mui/material";

export const pageWrapper: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  py: 4,
};

export const container: SxProps<Theme> = (theme) => ({
  width: "100%",
  maxWidth: 800,
  backgroundColor: theme.palette.primary.main, // ✅ используем primary.main
  color: theme.palette.getContrastText(theme.palette.primary.main),
  p: 4,
  borderRadius: 4,
  boxShadow: 3,
  border: `1px solid ${theme.palette.divider}`,
});


export const avatar: SxProps<Theme> = (theme) => ({
  width: 56,
  height: 56,
  bgcolor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  fontSize: "1.2rem",
  mr: 2,
});

export const sectionTitle: SxProps<Theme> = {
  mb: 3,
  fontWeight: 600,
  textAlign: "center",
  fontSize: "1.5rem",
};

export const infoItem: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 1,
};

export const infoIcon: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary,
  mr: 2,
});

export const submitButton: SxProps<Theme> = (theme) => ({
  mt: 2,
  py: 1.5,
  fontSize: "1rem",
  borderRadius: 3,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
});
