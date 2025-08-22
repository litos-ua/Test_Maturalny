import type { SxProps, Theme } from "@mui/material";

export const containerStyle: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  maxWidth: 600,
  height: 500,
  mx: "auto",
};

export const imageStyle = (fade: boolean): SxProps<Theme> => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 2,
  opacity: fade ? 1 : 0,
  transition: "opacity 1s ease-in-out",
});
