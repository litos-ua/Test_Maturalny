
import { Box, Typography, Container, TextField, Button, Stack } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url('/hero-bg.avif')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: { xs: 200, md: 300 },
        display: "flex",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        '&::before': {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Платформа знань
        </Typography>
        <Typography variant="h6" component="p" mb={4}>
          Знайди тести, теми та ресурси для студентів та випускників
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            placeholder="Пошук за темами чи дисциплінами..."
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              width: { xs: "100%", sm: 400 },
            }}
          />
          <Button variant="contained" size="large" color="primary">
            Знайти
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}


