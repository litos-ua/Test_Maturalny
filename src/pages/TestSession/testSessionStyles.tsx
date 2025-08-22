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
  backgroundColor: "secondary.main", // как кнопка color="secondary"
  color: "primary.contrastText", // белый текст поверх primary
  p: 2, // паддинг
  borderRadius: 1, // скругление углов
  mb: 2, // отступ снизу
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
