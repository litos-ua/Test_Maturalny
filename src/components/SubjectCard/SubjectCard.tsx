import { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, type SxProps } from "@mui/material";
import {
  getCardStyles,
  imageContainerStyles,
  imageStyles,
  titleStyles,
  modalStyles,
  modalButtonContainerStyles
} from "./SubjectCardStyles";

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
      <Box sx={[
        getCardStyles(bgColor),
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])
      ]}>
        <Box 
          onClick={handleOpen}
          sx={imageContainerStyles}
        >
          <Box
            component="img"
            src={images[currentIdx]}
            alt={title}
            sx={{
              ...imageStyles,
              opacity: activeImage === 0 ? 1 : 0,
              transition: `opacity ${transitionDuration}ms ease`,
            }}
          />
          <Box
            component="img"
            src={images[nextIdx]}
            alt={title}
            sx={{
              ...imageStyles,
              opacity: activeImage === 1 ? 1 : 0,
              transition: `opacity ${transitionDuration}ms ease`,
              zIndex: 1,
            }}
          />
        </Box>

        <Typography
          onClick={handleOpen}
          variant="h5"
          sx={titleStyles}
        >
          {title}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ 
          mt: { xs: 0.5, sm: 1 }, 
          color: titleColor,
          fontSize: { xs: "0.9rem", sm: "1rem" }
        }}>
          {description}
        </Typography>
      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="modal-title" variant="h4" component="h2" sx={{ 
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" }
          }}>
            {title}
          </Typography>
          <Typography id="modal-description" sx={{ 
            mt: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }
          }}>
            {detailedDescription || "Детальна інформація про предмет."}
          </Typography>
          <Box sx={modalButtonContainerStyles}>
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
