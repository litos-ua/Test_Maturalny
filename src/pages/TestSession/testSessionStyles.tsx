import type { SxProps, Theme } from "@mui/material";

export const questionCircleStyle: SxProps<Theme> = {
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "text.primary",
  fontWeight: "normal",
  borderRadius: "50%",
  transition: "all 0.3s",
};

export const questionHeaderStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "secondary.main", 
  color: "primary.contrastText", 
  p: 2, 
  borderRadius: 1, 
  mb: 2, 
};

export const testFinishButtonStyle: SxProps<Theme> = {
    display: "block",        
    mx: "auto",
    textTransform: "none",
    fontSize: "1.1rem",
    px: 4,
    py: 1.5,
    mt: 2,
    borderRadius: 2,
};
