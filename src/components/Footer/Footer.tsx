// Адаптация для всех типов устройств
import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE } from "../../router";
import { text } from "../../constants";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#0A2F5C" : "#1A1A1A",
        color: theme.palette.mode === "light" ? "#fff" : "#ccc",
        py: { xs: 3, sm: 4, md: 4 },
        mt: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 0 }
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
                info@yourplatform.com
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

        {/* Копирайт */}
        <Box 
          textAlign="center" 
          mt={{ xs: 3, md: 4 }}
          sx={{ 
            borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(255,255,255,0.2)" : "rgba(204,204,204,0.2)"}`,
            pt: { xs: 3, md: 4 }
          }}
        >
          <Typography 
            variant="body2" 
            color="inherit"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
            }}
          >
            © {new Date().getFullYear()} Тестовая платформа. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}