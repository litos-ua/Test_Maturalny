// // Стили немасштабируемие
// import { type SxProps } from "@mui/material";

// export interface CardStylesProps {
//   bgColor?: string;
// }

// export const getCardStyles = (bgColor?: string): SxProps => ({
//   p: 1,
//   m: 0,
//   borderRadius: 3,
//   height: "85%",
//   width: "95%",
//   display: "flex",
//   flexDirection: "column",
//   overflow: "hidden",
//   cursor: "pointer",
//   bgcolor: bgColor, // переносим bgcolor сюда
// });

// export const imageContainerStyles: SxProps = {
//   width: "100%",
//   height: "85%",
//   position: "relative",
//   mx: "auto",
//   boxSizing: "border-box",
//   "&:hover": {
//     opacity: 0.9
//   }
// };

// export const imageStyles: SxProps = {
//   position: "absolute",
//   width: "100%",
//   height: "100%",
//   objectFit: "contain",
//   objectPosition: "top center",
//   borderRadius: 2,
//   zIndex: 2,
//   pointerEvents: "none"
// };

// export const titleStyles: SxProps = {
//   mt: 2,
//   fontWeight: 700,
//   color: "#FF6347",
//   fontSize: "1.5rem",
//   textAlign: "center",
//   width: "100%",
//   display: "block",
//   cursor: "pointer",
//   "&:hover": {
//     textDecoration: "underline"
//   }
// };

// export const modalStyles: SxProps = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", md: "60%" },
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   maxHeight: "80vh",
//   overflowY: "auto"
// };

// export const modalButtonContainerStyles: SxProps = {
//   mt: 3,
//   display: "flex",
//   justifyContent: "center"
// };

// Стили масштабируемие
import { type SxProps } from "@mui/material";

export const getCardStyles = (bgColor?: string): SxProps => ({
  p: { xs: 0.5, sm: 1 },
  m: 0,
  borderRadius: 3,
  height: { xs: "90%", sm: "85%" },
  width: { xs: "100%", sm: "95%" },
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  cursor: "pointer",
  bgcolor: bgColor,
});

export const imageContainerStyles: SxProps = {
  width: "100%",
  height: { xs: "80%", sm: "85%" },
  position: "relative",
  mx: "auto",
  boxSizing: "border-box",
  "&:hover": {
    opacity: 0.9
  }
};

export const imageStyles: SxProps = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "top center",
  borderRadius: 2,
  zIndex: 2,
  pointerEvents: "none"
};

export const titleStyles: SxProps = {
  mt: { xs: 1, sm: 2 },
  fontWeight: 700,
  color: "#FF6347",
  fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
  textAlign: "center",
  width: "100%",
  display: "block",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline"
  }
};

export const modalStyles: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "85%", md: "60%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  borderRadius: 2,
  maxHeight: { xs: "90vh", sm: "80vh" },
  overflowY: "auto"
};

export const modalButtonContainerStyles: SxProps = {
  mt: 3,
  display: "flex",
  justifyContent: "center"
};