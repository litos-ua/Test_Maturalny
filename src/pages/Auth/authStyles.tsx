// import type { SxProps, Theme } from "@mui/material";

// export const formContainer: SxProps<Theme> = {
//   maxWidth: 400,
//   mx: "auto",
//   my: 6,
//   p: 4,
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: 3,
// };

// export const inputField: SxProps<Theme> = {
//   mb: 2,
// };

// export const checkbox: SxProps<Theme> = {
//   mb: 2,
// };

// export const submitButton: SxProps<Theme> = {
//   mt: 2,
//   py: 1.5,
//   fontSize: "1rem",
// };

// export const formTitle: SxProps<Theme> = {
//   mb: 3,
//   textAlign: "center",
//   fontWeight: 600,
// };


import type { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = (theme) => ({
  minHeight: "50vh",
  display: "flex",
  bgcolor: theme.palette.primary.main,
});

export const imageContainer: SxProps<Theme> = {
  flex: 1,
  display: { xs: "none", md: "flex" },
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(0,0,0,0.1)",
};

export const imageStyle: React.CSSProperties = {
  maxWidth: "80%",
  borderRadius: 16,
};

export const formWrapper: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  p: 4,
};

export const formContainer: SxProps<Theme> = (theme) => ({
  width: "100%",
  maxWidth: "30vw",
  bgcolor:
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.9)"
      : "rgba(30,30,30,0.9)",
  p: 4,
  borderRadius: 4,
  boxShadow: 3,
});

export const inputField: SxProps<Theme> = {
  mb: 2,
};

export const checkbox: SxProps<Theme> = {
  mb: 2,
};

export const submitButton: SxProps<Theme> = {
  mt: 2,
  py: 1.5,
  fontSize: "1rem",
  borderRadius: 3,
};

export const formTitle: SxProps<Theme> = {
  mb: 2,
  fontWeight: 600,
  textAlign: "center",
  fontSize: "1.2rem",
};

export const headline: SxProps<Theme> = {
  mb: 3,
  textAlign: "center",
  fontWeight: 600,
  fontSize: "1.8rem",
};

export const submitMessage: SxProps<Theme> = {
  mb: 2,
  textAlign: "center",
};
