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

