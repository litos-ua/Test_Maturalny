// SubjectCard с кликабельными областями и модальным окном. Все работает, только модальное окно не закрывается при смене карточек
import { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, type SxProps } from "@mui/material";

interface SubjectCardProps {
  title: string;
  images: string[];
  description: string;
  detailedDescription?: string;
  imageRotationInterval?: number;
  transitionDuration?: number;
  titleColor?: string;
  bgColor?: string;
  isModalOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
  sx?: SxProps;
}

const DEFAULT_IMAGE_ROTATION = 15000;
const DEFAULT_FADE = 5000;

export function SubjectCard({
  title,
  images,
  description,
  detailedDescription = "",
  imageRotationInterval = DEFAULT_IMAGE_ROTATION,
  transitionDuration = DEFAULT_FADE,
  titleColor,
  bgColor,
  isModalOpen = false,
  onOpenModal,
  onCloseModal,
  sx,
}: SubjectCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [localModalOpen, setLocalModalOpen] = useState(false);

  // Определяем, используем ли управление извне или локальное состояние
  const isControlled = typeof isModalOpen !== 'undefined' && 
                       typeof onOpenModal !== 'undefined' && 
                       typeof onCloseModal !== 'undefined';
  
  const openModal = isControlled ? isModalOpen : localModalOpen;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(1);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % images.length);
        setNextIdx(prev => (prev + 1) % images.length);
        setActiveImage(0);
      }, transitionDuration);
    }, imageRotationInterval);

    return () => clearInterval(timer);
  }, [images.length, imageRotationInterval, transitionDuration]);

  const handleOpen = () => {
    if (isControlled && onOpenModal) {
      onOpenModal();
    } else {
      setLocalModalOpen(true);
    }
  };

  const handleClose = () => {
    if (isControlled && onCloseModal) {
      onCloseModal();
    } else {
      setLocalModalOpen(false);
    }
  };

  return (
    <>
      <Box sx={{ 
        p: 1, 
        m: 0,
        borderRadius: 3,
        bgcolor: bgColor,
        height: "85%",
        width: "95%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        ...sx
      }}>
        <Box 
          onClick={handleOpen}
          sx={{
            width: "100%",
            height: "85%",
            position: "relative",
            mx: "auto",
            boxSizing: "border-box",
            "&:hover": {
              opacity: 0.9
            }
          }}
        >
          <Box
            component="img"
            src={images[currentIdx]}
            alt={title}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "top center",
              borderRadius: 2,
              opacity: activeImage === 0 ? 1 : 0,
              transition: `opacity ${transitionDuration}ms ease`,
              zIndex: 2,
              pointerEvents: "none"
            }}
          />
          <Box
            component="img"
            src={images[nextIdx]}
            alt={title}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "top center",
              borderRadius: 2,
              opacity: activeImage === 1 ? 1 : 0,
              transition: `opacity ${transitionDuration}ms ease`,
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        </Box>

        <Typography
          onClick={handleOpen}
          variant="h5"
          sx={{
            mt: 2,
            fontWeight: 700,
            color: "#FF6347",
            fontSize: "1.5rem",
            textAlign: "center",
            width: "100%",
            display: "block",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline"
            }
          }}
        >
          {title}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mt: 1, color: titleColor }}>
          {description}
        </Typography>
      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "60%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "80vh",
          overflowY: "auto"
        }}>
          <Typography id="modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }} variant="h6">
            {detailedDescription || "Детальна інформація про предмет."}
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button 
              onClick={handleClose}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Закрыть
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}