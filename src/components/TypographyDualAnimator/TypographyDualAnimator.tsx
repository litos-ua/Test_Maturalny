// Текст сменяется каждые n секунд
// Цвета идут циклом, независимо от текста
// Используется Framer Motion для плавного выезда текста справа и исчезновения влево
// AnimatePresence + motion.div обеспечивает правильную анимацию входа/выхода

// import React, { useEffect, useState } from "react";
// import { Typography, Box, useTheme } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";

// interface TextPair {
//   staticPart: string;
//   dynamicPart: string;
// }

// interface TypographyDualAnimatorProps {
//   textPairs: TextPair[];
//   colors: string[]; // массив цветов из темы или HEX
//   interval?: number;
//   variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
//   fontWeight?: number;
// }

// export const TypographyDualAnimator: React.FC<TypographyDualAnimatorProps> = ({
//   textPairs,
//   colors,
//   interval = 5000,
//   variant = "h4",
//   fontWeight = 700,
// }) => {
//   const theme = useTheme();
//   const [index, setIndex] = useState(0);
//   const [colorIndex, setColorIndex] = useState(0);

//   // Меняем текст и цвет по таймеру
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % textPairs.length);
//       setColorIndex((prev) => (prev + 1) % colors.length);
//     }, interval);

//     return () => clearInterval(timer);
//   }, [textPairs.length, colors.length, interval]);

//   const currentPair = textPairs[index];
//   const staticColor = colors[colorIndex];
//   const dynamicColor = colors[(colorIndex + 1) % colors.length];

//   return (
//     <Typography variant={variant} fontWeight={fontWeight} gutterBottom sx={{ overflow: "hidden" }}>
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={index + staticColor + dynamicColor} // key для анимации при смене текста/цвета
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: -100, opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           style={{ display: "inline-block" }}
//         >
//           <Box component="span" sx={{ color: staticColor }}>
//             {currentPair.staticPart}{" "}
//           </Box>
//           <Box component="span" sx={{ color: dynamicColor }}>
//             {currentPair.dynamicPart}
//           </Box>
//         </motion.div>
//       </AnimatePresence>
//     </Typography>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Typography, Box } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";

// interface TypographyDualAnimatorProps {
//   texts: [string, string][]; // массив пар фраз
//   colorPairs: [string, string][]; // массив пар цветов
//   interval?: number;
//   variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
//   fontWeight?: number;
// }

// export const TypographyDualAnimator: React.FC<TypographyDualAnimatorProps> = ({
//   texts,
//   colorPairs,
//   interval = 5000,
//   variant = "h5",
//   fontWeight = 700,
// }) => {
//   const [index, setIndex] = useState(0);
//   const [colorIndex, setColorIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % texts.length);
//       setColorIndex((prev) => (prev + 1) % colorPairs.length);
//     }, interval);
//     return () => clearInterval(timer);
//   }, [texts.length, colorPairs.length, interval]);

//   const [part1, part2] = texts[index];
//   const [color1, color2] = colorPairs[colorIndex];

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={index + "-" + colorIndex}
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -50 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Typography variant={variant} fontWeight={fontWeight}>
//           {part1}{" "}
//           <Box component="span" sx={{ color: color2 }}>
//             {part2}
//           </Box>
//         </Typography>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TypographyDualAnimatorProps {
  texts: [string, string][];
  colorPairs: [string, string][];
  interval?: number;
  variant?: any;
  fontWeight?: number | string;
}

export function TypographyDualAnimator({
  texts,
  colorPairs,
  interval = 5000,
  variant = "h5",
  fontWeight = 600,
}: TypographyDualAnimatorProps) {
  const [index, setIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
      setColorIndex((prev) => (prev + 1) % colorPairs.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, colorPairs.length, interval]);

  const [first, second] = texts[index];
  const [firstColor, secondColor] = colorPairs[colorIndex];

  return (
    <Box textAlign="center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index + "-" + colorIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant={variant} fontWeight={fontWeight} gutterBottom>
            <Box component="span" sx={{ color: firstColor }}>
              {first}{" "}
            </Box>
            <Box component="span" sx={{ color: secondColor }}>
              {second}
            </Box>
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
