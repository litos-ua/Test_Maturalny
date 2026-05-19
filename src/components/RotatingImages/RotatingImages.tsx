// import { Box, useTheme, useMediaQuery, type Breakpoint } from "@mui/material";
// import { useEffect, useState } from "react";
// import { containerStyle, imageStyle } from "./RotatingImageStyle";

// interface RotatingImageProps {
//   images: string[];
//   switchInterval?: number;
//   transitionDuration?: number;
//   objectFit?: "cover" | "contain" | "fill";
//   height?: string | number | Partial<Record<Breakpoint, string | number>>;
//   width?: string | number | Partial<Record<Breakpoint, string | number>>;
//   borderRadius?: number | string;
// }

// export function RotatingImages({
//   images,
//   switchInterval = 8000,
//   transitionDuration = 1500,
//   objectFit = "cover",
//   height = { xs: 250, sm: 300, md: 350, lg: 400 },
//   width = "100%",
//   borderRadius = 2,
// }: RotatingImageProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [nextIndex, setNextIndex] = useState(1);
//   const [fade, setFade] = useState(true);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (images.length <= 1) return;

//     const interval = setInterval(() => {
//       setFade(false);

//       setTimeout(() => {
//         setCurrentIndex(nextIndex);
//         setNextIndex((nextIndex + 1) % images.length);
//         setFade(true);
//       }, transitionDuration);
//     }, switchInterval);

//     const handleClose = () => {
//       setOpen(false);
//     };

//     return () => clearInterval(interval);
//   }, [nextIndex, images.length, switchInterval, transitionDuration]);

//     return (
//     <Box sx={{ 
//       ...containerStyle, 
//       borderRadius,
//       height,
//       width, 
//       ...(isMobile && {
//         margin: "0 auto 16px auto",
//       }),
//     }}>
//       <Box
//         component="img"
//         src={images[currentIndex]}
//         alt="Образовательный слайд"
//         sx={{
//           ...imageStyle, 
//           opacity: fade ? 1 : 0,
//           objectFit,
//           borderRadius,
//           ...(isMobile && {
//             objectFit: "cover",
//           }),
//         }}
//       />
//     </Box>
//   );
// }



// RotatingImages.tsx
import { Box, useTheme, useMediaQuery, type Breakpoint } from "@mui/material";
import { useEffect, useState } from "react";
import { containerStyle, imageStyle } from "./RotatingImageStyle";

interface RotatingImageProps {
  images: string[];
  switchInterval?: number;
  transitionDuration?: number;
  objectFit?: "cover" | "contain" | "fill";
  height?: string | number | Partial<Record<Breakpoint, string | number>>;
  width?: string | number | Partial<Record<Breakpoint, string | number>>;
  borderRadius?: number | string;
}

export function RotatingImages({
  images,
  switchInterval = 8000,
  transitionDuration = 1500,
  objectFit = "cover",
  height = { xs: 250, sm: 300, md: 350, lg: 400 },
  width = "100%",
  borderRadius = 2,
}: RotatingImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // Простіше - true/false
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      // 1. Скрываем текущее изображение
      setIsVisible(false);
      
      // 2. Через половин времени анимации меняем индекс
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsVisible(true);
      }, transitionDuration / 2);
      
    }, switchInterval);

    return () => clearInterval(interval);
  }, [images.length, switchInterval, transitionDuration]);

  return (
    <Box sx={{ 
      ...containerStyle, 
      borderRadius,
      height,
      width, 
      ...(isMobile && {
        margin: "0 auto 16px auto",
      }),
    }}>
      <Box
        component="img"
        src={images[currentIndex]}
        alt="Освітній слайд"
        sx={{
          ...imageStyle, 
          opacity: isVisible ? 1 : 0,
          objectFit,
          borderRadius,
          ...(isMobile && {
            objectFit: "cover",
          }),
        }}
      />
    </Box>
  );
}