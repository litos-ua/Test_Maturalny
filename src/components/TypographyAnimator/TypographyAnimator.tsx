import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface TypographyAnimatorProps {
  texts: string[];
  colors: string[];
  interval?: number;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2";
  fontWeight?: number;
}

export const TypographyAnimator: React.FC<TypographyAnimatorProps> = ({
  texts,
  colors,
  interval = 5000,
  variant = "h4",
  fontWeight = 700,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const currentColor = colors[index % colors.length];

  return (
    <Typography
      variant={variant}
      fontWeight={fontWeight}
      sx={{
        transition: "color 0.8s ease-in-out",
        color: currentColor,
      }}
    >
      {texts[index]}
    </Typography>
  );
};
