import { alpha } from "@mui/material/styles"
import type { SxProps, Theme } from "@mui/material";

//export const floatingLabelStyle: SxProps<Theme> = {
export const floatingLabelStyle = (theme: Theme, baseColor: string): SxProps<Theme> => ({
  bgcolor: alpha(baseColor, 0.5),
  fontWeight: 600,
  fontSize: {
    xs: "0.7rem",
    sm: "0.8rem",
    md: "1rem",
  },
  height: {
    xs: 36,
    sm: 42,
    md: 48,
  },
  px: {
    xs: 1,
    sm: 1.5,
    md: 2,
  },
  "& .MuiChip-icon": {
    marginLeft: {
      xs: 1,
      sm: 2,
      md: 4,
    },
  },
});
