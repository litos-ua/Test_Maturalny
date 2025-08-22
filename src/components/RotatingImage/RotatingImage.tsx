// Меняет циклически имеджи

// import { Box } from "@mui/material";
// import { useEffect, useState } from "react";
// import {images} from "../../constants/images";

// export function RotatingImage() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [nextIndex, setNextIndex] = useState(1);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false); // начать исчезновение

//       setTimeout(() => {
//         setCurrentIndex(nextIndex);
//         setNextIndex((nextIndex + 1) % images.length);
//         setFade(true); // начать появление
//       }, 1200); // Время анимации смены
//     }, 10000); // Общее время между слайдами

//     return () => clearInterval(interval);
//   }, [nextIndex]);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         maxWidth: 600,
//         height: 500,
//         mx: "auto",
//       }}
//     >
//       <Box
//         component="img"
//         src={images[currentIndex]}
//         alt="Текущий"
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           borderRadius: 2,
//           opacity: fade ? 1 : 0,
//           transition: "opacity 1s ease-in-out",
//         }}
//       />
//     </Box>
//   );
// }

// Меняет циклически имеджи

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { containerStyle, imageStyle } from "./RotatingImageStyle";
import { defaultImages } from "../../constants/images";

interface RotatingImageProps {
  images?: string[];            
  switchInterval?: number;
  transitionDuration?: number;
}

export function RotatingImage({
  images = defaultImages,       
  switchInterval = 10000,
  transitionDuration = 1200,
}: RotatingImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setFade(true);
      }, transitionDuration);
    }, switchInterval);

    return () => clearInterval(interval);
  }, [nextIndex, images.length, switchInterval, transitionDuration]);

  return (
    <Box sx={containerStyle}>
      <Box
        component="img"
        src={images[currentIndex]}
        alt="Текущий слайд"
        sx={imageStyle(fade)}
      />
    </Box>
  );
}

