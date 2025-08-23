// Текст сменяется каждые n секунд
// Цвета идут циклом, независимо от текста
// Используется Framer Motion для плавного выезда текста справа и исчезновения влево
// AnimatePresence + motion.div обеспечивает правильную анимацию входа/выхода

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
