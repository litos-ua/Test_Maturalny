// // Адаптация для всех типов устройств
// import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import { ROUTE } from "../../router";
// import { text } from "../../constants";

// export default function Footer() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: theme.palette.mode === "light" ? "#0A2F5C" : "#1A1A1A",
//         color: theme.palette.mode === "light" ? "#fff" : "#ccc",
//         py: { xs: 3, sm: 4, md: 4 },
//         mt: "auto",
//         px: { xs: 2, sm: 3, md: 4, lg: 0 }
//       }}
//     >
//       <Container maxWidth="lg" disableGutters sx={{ 
//           flexGrow: 1, 
//           py: 4,
//           pl: { xs: 2, sm: 3, md: 4, lg: 8} 
//       }}>
//         <Grid container spacing={{ xs: 3, md: 4 }}>
//           {/* Блок "Про платформу" */}
//           <Grid size = {{ xs:12, md:4, lg:4}}>
//             <Typography 
//               variant={isMobile ? "h6" : "h6"} 
//               gutterBottom
//               sx={{ 
//                 fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
//                 mb: { xs: 1, md: 2 }
//               }}
//             >
//               Про платформу
//             </Typography>
//             <Typography 
//               variant="body2"
//               sx={{
//                 fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
//                 lineHeight: { xs: 1.5, md: 1.6 }
//               }}
//             >
//               {text.footer}
//             </Typography>
//           </Grid>

//           {/* Блок навигации */}
//           <Grid size = {{ xs:12, sm:6, md:4, lg:4}} >
//             <Typography 
//               variant={isMobile ? "h6" : "h6"} 
//               gutterBottom
//               sx={{ 
//                 fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
//                 mb: { xs: 1, md: 2 }
//               }}
//             >
//               Навігація
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
//               <Link 
//                 component={RouterLink} 
//                 to={ROUTE.HOME} 
//                 color="inherit" 
//                 display="block" 
//                 underline="hover"
//                 sx={{ 
//                   fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
//                   '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
//                 }}
//               >
//                 Головна
//               </Link>
//               <Link 
//                 component={RouterLink} 
//                 to={ROUTE.SUBJECTINTRO} 
//                 color="inherit" 
//                 display="block" 
//                 underline="hover"
//                 sx={{ 
//                   fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
//                   '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
//                 }}
//               >
//                 Предмети
//               </Link>
//               <Link 
//                 component={RouterLink} 
//                 to={ROUTE.TESTSELECTION} 
//                 color="inherit" 
//                 display="block" 
//                 underline="hover"
//                 sx={{ 
//                   fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
//                   '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
//                 }}
//               >
//                 Тест
//               </Link>
//               <Link 
//                 component={RouterLink} 
//                 to={ROUTE.ABOUT} 
//                 color="inherit" 
//                 display="block" 
//                 underline="hover"
//                 sx={{ 
//                   fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
//                   '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
//                 }}
//               >
//                 Про Платформу
//               </Link>
//             </Box>
//           </Grid>

//           {/* Блок контактов */}
//           <Grid size = {{ xs:12, sm:6, md:4, lg:4}}>
//             <Typography 
//               variant={isMobile ? "h6" : "h6"} 
//               gutterBottom
//               sx={{ 
//                 fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
//                 mb: { xs: 1, md: 2 }
//               }}
//             >
//               Контакти
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
//               <Link 
//                 component={RouterLink} 
//                 to={ROUTE.CONTACTS} 
//                 color="inherit" 
//                 display="block" 
//                 underline="hover"
//                 sx={{ 
//                   fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
//                   '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
//                 }}
//               >
//                 Контакти
//               </Link>
//               <Typography 
//                 variant="body2"
//                 sx={{
//                   fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1
//                 }}
//               >
//                 <span>📧</span>
//                 info@zno-nmt.com.ua
//               </Typography>
//               <Typography 
//                 variant="body2"
//                 sx={{
//                   fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1
//                 }}
//               >
//                 <span>📞</span>
//                 +38 (000) 000-00-00
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Копирайт */}
//         <Box 
//           textAlign="center" 
//           mt={{ xs: 3, md: 4 }}
//           sx={{ 
//             borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(255,255,255,0.2)" : "rgba(204,204,204,0.2)"}`,
//             pt: { xs: 3, md: 4 }
//           }}
//         >
//           <Typography 
//             variant="body2" 
//             color="inherit"
//             sx={{
//               fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
//             }}
//           >
//             © {new Date().getFullYear()} Тестовая платформа. Все права защищены.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// }


// Добавляем индикацию сервера API

import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery, Chip, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE } from "../../router";
import { text } from "../../constants";
import { useState, useEffect } from "react";
import { configObj } from "../../constants/config";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Состояние индикатора API
  const [apiStatus, setApiStatus] = useState<{
    isFallback: boolean;
    serverType: 'primary' | 'fallback';
    url: string;
  }>({
    isFallback: configObj.isUsingFallback,
    serverType: configObj.isUsingFallback ? 'fallback' : 'primary',
    url: configObj.axiosUrl,
  });

  // // Обновляем статус при изменении
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setApiStatus({
  //       isFallback: configObj.isUsingFallback,
  //       serverType: configObj.isUsingFallback ? 'fallback' : 'primary',
  //       url: configObj.axiosUrl,
  //     });
  //   }, 1000);
    
  //   return () => clearInterval(interval);
  // }, []);

    // Обновляем статус ТОЛЬКО при изменении configObj
  useEffect(() => {
    // Функция обновления статуса
    const updateStatus = () => {
      setApiStatus({
        isFallback: configObj.isUsingFallback,
        serverType: configObj.isUsingFallback ? 'fallback' : 'primary',
        url: configObj.axiosUrl,
      });
    };

    // Обновляем при монтировании
    updateStatus();

    // Создаём кастомное событие для отслеживания переключения API
    const handleApiSwitch = () => updateStatus();
    window.addEventListener('api-switch', handleApiSwitch);

    return () => window.removeEventListener('api-switch', handleApiSwitch);
  }, []);

  // Определяем цвет и текст в зависимости от сервера
  // const getApiIndicator = () => {
  //   if (apiStatus.isFallback) {
  //     // Резервный сервер (PHP/Laravel)
  //     return {
  //       label: 'PHP',
  //       color: 'warning' as const,
  //       tooltip: `Резервный сервер (PHP)\n${apiStatus.url}`,
  //       bgColor: '#f47e3e',
  //     };
  //   } else {
  //     // Проверяем, какой основной сервер (.NET или LOCAL)
  //     const isLocal = apiStatus.url.includes('192.168') || apiStatus.url.includes('localhost') || apiStatus.url.includes(':8080');
  //     if (isLocal) {
  //       return {
  //         label: 'LOCAL',
  //         color: 'info' as const,
  //         tooltip: `Локальный сервер (Dev)\n${apiStatus.url}`,
  //         bgColor: '#2196f3',
  //       };
  //     } else {
  //       return {
  //         label: '.NET',
  //         color: 'success' as const,
  //         tooltip: `Основной сервер (ASP.NET Core)\n${apiStatus.url}`,
  //         bgColor: '#4caf50',
  //       };
  //     }
  //   }
  // };

  const getApiIndicator = () => {
    const url = apiStatus.url.toLowerCase();
    
    // 1. ОПРЕДЕЛЯЕМ ТИП СЕРВЕРА ПО URL (независимо от того, основной он или резервный)
    let serverType = '';
    let bgColor = '';
    
    // Локальный сервер
    if (url.includes('192.168') || url.includes('localhost') || url.includes(':8080') || url.includes('127.0.0.1')) {
        serverType = 'LOCAL';
        bgColor = '#2196f3';
    } 
    // PHP сервер (по наличию 'php' в URL)
    else if (url.includes('php')) {
        serverType = 'PHP';
        bgColor = '#f47e3e';
    }
    // .NET сервер (по наличию 'api' в URL, но не 'php')
    else if (url.includes('api')) {
        serverType = '.NET';
        bgColor = '#4caf50';
    }
    // Неизвестный сервер
    else {
        serverType = 'API';
        bgColor = '#757575';
    }
    
    // 2. ДОБАВЛЯЕМ ИНДИКАТОР РЕЗЕРВНОСТИ (если нужно)
    const isFallbackMode = apiStatus.isFallback;
    
    return {
        label: isFallbackMode ? `${serverType} (резерв)` : serverType,
        tooltip: `${isFallbackMode ? 'Резервный' : 'Основной'} сервер (${serverType})\n${apiStatus.url}`,
        bgColor: bgColor,
        isFallback: isFallbackMode,
    };
};

  const indicator = getApiIndicator();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#0A2F5C" : "#1A1A1A",
        color: theme.palette.mode === "light" ? "#fff" : "#ccc",
        py: { xs: 3, sm: 4, md: 4 },
        mt: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 0 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ 
          flexGrow: 1, 
          py: 4,
          pl: { xs: 2, sm: 3, md: 4, lg: 8} 
      }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Блок "Про платформу" */}
          <Grid size = {{ xs:12, md:4, lg:4}}>
            <Typography 
              variant={isMobile ? "h6" : "h6"} 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                mb: { xs: 1, md: 2 }
              }}
            >
              Про платформу
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
                lineHeight: { xs: 1.5, md: 1.6 }
              }}
            >
              {text.footer}
            </Typography>
          </Grid>

          {/* Блок навигации */}
          <Grid size = {{ xs:12, sm:6, md:4, lg:4}} >
            <Typography 
              variant={isMobile ? "h6" : "h6"} 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                mb: { xs: 1, md: 2 }
              }}
            >
              Навігація
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
              <Link 
                component={RouterLink} 
                to={ROUTE.HOME} 
                color="inherit" 
                display="block" 
                underline="hover"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
                }}
              >
                Головна
              </Link>
              <Link 
                component={RouterLink} 
                to={ROUTE.SUBJECTINTRO} 
                color="inherit" 
                display="block" 
                underline="hover"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
                }}
              >
                Предмети
              </Link>
              <Link 
                component={RouterLink} 
                to={ROUTE.TESTSELECTION} 
                color="inherit" 
                display="block" 
                underline="hover"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
                }}
              >
                Тест
              </Link>
              <Link 
                component={RouterLink} 
                to={ROUTE.ABOUT} 
                color="inherit" 
                display="block" 
                underline="hover"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
                }}
              >
                Про Платформу
              </Link>
            </Box>
          </Grid>

          {/* Блок контактов */}
          <Grid size = {{ xs:12, sm:6, md:4, lg:4}}>
            <Typography 
              variant={isMobile ? "h6" : "h6"} 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                mb: { xs: 1, md: 2 }
              }}
            >
              Контакти
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
              <Link 
                component={RouterLink} 
                to={ROUTE.CONTACTS} 
                color="inherit" 
                display="block" 
                underline="hover"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  '&:hover': { color: theme.palette.mode === "light" ? "#4FC3F7" : "#90CAF9" }
                }}
              >
                Контакти
              </Link>
              <Typography 
                variant="body2"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <span>📧</span>
                info@zno-nmt.com.ua
              </Typography>
              <Typography 
                variant="body2"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '0.9rem', md: '0.95rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <span>📞</span>
                +38 (000) 000-00-00
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Копирайт и индикатор API - на одном уровне */}
        <Box 
          mt={{ xs: 3, md: 4 }}
          sx={{ 
            borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(255,255,255,0.2)" : "rgba(204,204,204,0.2)"}`,
            pt: { xs: 3, md: 4 }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 1, sm: 0 }
            }}
          >
            {/* Копирайт - слева */}
            <Typography 
              variant="body2" 
              color="inherit"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
              }}
            >
              © {new Date().getFullYear()} Тестовая платформа. Все права защищены.
            </Typography>
            
            {/* Индикатор статуса API - справа */}
            <Tooltip title={indicator.tooltip} arrow placement="top">
              <Chip
                label={indicator.label}
                size="small"
                sx={{
                  backgroundColor: indicator.bgColor,
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  height: { xs: 24, sm: 28 },
                  '&:hover': {
                    opacity: 0.9,
                  },
                  ...(apiStatus.isFallback && {
                    animation: 'pulse 2s infinite',
                  }),
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Container>
      
      {/* Анимация пульсации для резервного сервера */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
}