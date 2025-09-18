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
  backgroundColor: theme.palette.primary.light, 
  color: theme.palette.getContrastText(theme.palette.primary.light), 
  p: 4,
  borderRadius: 4,
  boxShadow: 3, 
  border: `1px solid ${theme.palette.divider}`,
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
  width: "100%",
  display: "block",
  margin: "auto"
});

export const sectionTitleAdaptive: SxProps<Theme> = (theme) => ({
  fontWeight: 600,
  textAlign: "center",
  color: theme.palette.getContrastText(theme.palette.primary.main),
  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
  mb: { xs: 2, md: 3 }
});

export const avatar: SxProps<Theme> = (theme) => ({
  width: 56,
  height: 56,
  bgcolor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  fontSize: "1.2rem",
  mr: 2,
});

export const avatarAdaptive: SxProps<Theme> = (theme) => ({
  ...avatar(theme) as any,
  width: { xs: 80, sm: 90, md: 100, lg: 120 },
  height: { xs: 80, sm: 90, md: 100, lg: 120 },
  fontSize: { xs: '2rem', md: '2.5rem' },
  mr: { xs: 0, sm: 2 }
});

export const infoItemResponsive: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'flex-start', sm: 'center' }, // ← только одно свойство
  textAlign: { xs: 'center', sm: 'left' },
  p: { xs: 2, sm: 2.5 },
  gap: { xs: 1, sm: 2 },
  mb: 0
};
