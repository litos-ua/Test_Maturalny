// src/pages/AboutPage/AboutPageStyles.ts
import type { SxProps, Theme } from '@mui/material';

export const aboutPageStyles = {
  // 🔥 ДОДАТИ ЦЕЙ ОБ'ЄКТ - фон всієї сторінки
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { xs: 2, md: 4 },
    minHeight: '100vh',
    backgroundColor: (theme: Theme) => theme.palette.background.default, 
  } as SxProps<Theme>,

  // Герой-секція (заголовок + короткий опис)
  heroSection: {
    textAlign: 'center',
    mb: { xs: 4, md: 8 },
      backgroundColor: (theme: Theme) => 
    theme.palette.mode === 'dark' 
      ? 'rgba(0,0,0,0.2)' 
      : 'rgba(255,255,255,0.3)', // ← напівпрозорий білий шар для контрасту
  borderRadius: 3,
  p: 2,
  } as SxProps<Theme>,
  
  heroTitle: {
    fontWeight: 800,
    mb: 2,
    background: (theme: Theme) => theme.palette.gradients?.primary,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
  } as SxProps<Theme>,
  
  heroSubtitle: {
    fontSize: { xs: '1rem', md: '1.25rem' },
    color: 'text.secondary',
    maxWidth: '800px',
    margin: '0 auto',
  } as SxProps<Theme>,

  // Секція з ключовими цифрами (метрики)
  metricsSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 4,
    my: { xs: 4, md: 8 },
    py: 4,
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,
  
  metricItem: {
    textAlign: 'center',
    flex: '1 1 200px',
  } as SxProps<Theme>,
  
  metricNumber: {
    fontWeight: 800,
    fontSize: { xs: '2rem', md: '3rem' },
    color: 'primary.main',
  } as SxProps<Theme>,
  
  metricLabel: {
    fontSize: '0.9rem',
    color: 'text.secondary',
  } as SxProps<Theme>,

  // Секція місії та візії
  missionVisionGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    gap: 4,
    my: { xs: 4, md: 8 },
  } as SxProps<Theme>,
  
  missionVisionCard: {
    p: 3,
    borderRadius: 4,
    //bgcolor: 'background.paper',  
    backgroundColor: (theme: Theme) => 
      theme.palette.mode === 'dark' 
        ? theme.palette.custom.darkCard  // #2d2d2d для темної теми
        : theme.palette.custom.lightBlue, // #e3f2fd для світлої теми
    boxShadow: 1,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 3,
    },
  } as SxProps<Theme>,
  
  missionVisionTitle: {
    fontWeight: 700,
    mb: 2,
    pb: 1,
    borderBottom: '2px solid',
    borderColor: 'primary.main',
    display: 'inline-block',
  } as SxProps<Theme>,

  // Секція цінностей
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
    gap: 3,
    my: { xs: 4, md: 8 },
  } as SxProps<Theme>,
  
  valueCard: {
    p: 3,
    borderRadius: 3,
    //bgcolor: 'background.paper',
    backgroundColor: (theme: Theme) => 
      theme.palette.mode === 'dark' 
        ? theme.palette.custom.darkCard  // #2d2d2d
        : theme.palette.custom.lightGreen, // #e8f5e9  
    boxShadow: 1,
    height: '100%',
  } as SxProps<Theme>,

  // Заголовки секцій
  sectionTitle: {
    fontWeight: 800,
    fontFamily: "'Gambetta', 'Clash Display', serif",
    mb: 2,
    textAlign: 'center',
    position: 'relative',
    color: (theme: Theme) => theme.palette.text.primary,
    '&:after': {
      content: '""',
      display: 'block',
      width: '60px',
      height: '4px',
      bgcolor: 'primary.main',
      margin: '16px auto 0',
      borderRadius: '2px',
    },
  } as SxProps<Theme>,

  // Інші елементи
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: 'text.primary',
  } as SxProps<Theme>,
  
  chipGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 1,
    my: 4,
    '& .MuiChip-root': {
      backgroundColor: (theme: Theme) => 
        theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.15)'  // ← темна тема: світлий напівпрозорий фон
          : '#ffffff',                    // ← світла тема: білий фон
      borderColor: (theme: Theme) => theme.palette.primary.main,
      color: (theme: Theme) => 
        theme.palette.mode === 'dark' 
          ? '#ffffff'                     // ← темна тема: білий текст
          : theme.palette.text.primary,   // ← світла тема: темний текст
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: (theme: Theme) => theme.palette.primary.main,
        color: (theme: Theme) => 
          theme.palette.mode === 'dark' 
            ? '#000000'                   // ← при наведенні: чорний текст
            : '#ffffff',                  // ← при наведенні: білий текст
      },
    },
  } as SxProps<Theme>,
};