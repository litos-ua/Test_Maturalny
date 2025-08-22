// src/components/Footer.tsx
import { Box, Container, Grid, Typography, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === "light" ? "#0A2F5C" : "#1A1A1A",
        color: theme.palette.mode === "light" ? "#fff" : "#ccc",
        py: 4,
        mt: "auto",
        paddingLeft: "2vw"
      }}
    >
      {/* <Container maxWidth="lg"> */}
      <Container maxWidth={false} disableGutters sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Про платформу
            </Typography>
            <Typography variant="body2">
              Платформа для тестування знань з різних дисциплін.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Навігація
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" underline="hover">
              Головна
            </Link>
            <Link component={RouterLink} to="/topics" color="inherit" display="block" underline="hover">
              Теми
            </Link>
            <Link component={RouterLink} to="/quiz" color="inherit" display="block" underline="hover">
              Пройти тест
            </Link>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Контакти
            </Typography>
            <Typography variant="body2">
              Email: info@yourplatform.com
            </Typography>
            <Typography variant="body2">
              Телефон: +38 (000) 000-00-00
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Тестовая платформа. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
