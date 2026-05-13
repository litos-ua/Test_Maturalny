import { useState } from "react";
import { Box, Modal } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface Props {
  src: string;
  alt?: string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  sx?: SxProps<Theme>;
}

export function ZoomableImage({
  src,
  alt = "",
  maxHeight = 150,
  maxWidth = "100%",
  sx,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы не выбирался radio/checkbox/select
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Маленькое изображение */}
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          maxHeight,
          maxWidth,
          borderRadius: 1,
          cursor: "zoom-in",
          objectFit: "contain",
          bgcolor: "#f5f5f5",
          display: "block",
          ...sx,
        }}
        onClick={handleOpen}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/no-image.webp";
        }}
      />

      {/* Модальное окно */}
      <Modal open={open} onClose={handleClose}>
        <Box
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: "95vw",
            maxHeight: "95vh",
            outline: "none",
            p: 1,
          }}
        >
          <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
              maxWidth: "100%",
              maxHeight: "95vh",
              objectFit: "contain",
              borderRadius: 2,
              cursor: "zoom-out",
            }}
          />
        </Box>
      </Modal>
    </>
  );
}
