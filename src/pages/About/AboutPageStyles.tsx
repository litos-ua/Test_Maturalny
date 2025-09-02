import type { SxProps, Theme } from '@mui/material';



export const aboutPageStyles = {
  // Основной контейнер
  content: {
    bg: 'palette.primary.main',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  } as SxProps<Theme>,

  // Параграфы
  paragraph: {
    marginTop: '20px',
    fontSize: '22px',
    lineHeight: 1.6,
  } as SxProps<Theme>,

  // Заголовок h1
  title: {
    fontSize: '50px',
    textAlign: 'center',
    color: 'text.primary',
    fontWeight: 'bold',
    marginBottom: 3,
  } as SxProps<Theme>,

  // Заголовок h2
  subtitle: {
    color: 'text.primary',
    fontSize: '36px',
    marginTop: '40px',
    marginBottom: 2,
    fontWeight: '600',
  } as SxProps<Theme>,

  // Изображение
  image: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    margin: '40px auto',
    borderRadius: '8px',
    boxShadow: 3,
  } as SxProps<Theme>,

  // Список
  list: {
    listStyleType: 'square',
    marginLeft: '20px',
    fontSize: '22px',
    paddingLeft: 2,
  } as SxProps<Theme>,

  // Элементы списка
  listItem: {
    marginTop: '25px',
    '&::marker': {
      color: 'primary.main',
    },
  } as SxProps<Theme>,
};

export const modalStyles = {
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
    maxWidth: "800px",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    overflowY: "auto"
  } as SxProps<Theme>,
  
  closeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme: Theme) => theme.palette.grey[500],
  } as SxProps<Theme>
};