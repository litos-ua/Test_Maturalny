
import { Box, Typography, Container, TextField, Button, Stack } from "@mui/material";
import {
  heroSectionSx,
  containerSx,
  titleSx,
  subtitleSx,
  textFieldSx,
} from "./HeroSectionStyles";

export default function HeroSection() {
  return (
    <Box sx={heroSectionSx}>
      <Container sx={containerSx}>
        <Typography variant="h3" component="h1" gutterBottom sx={titleSx}>
          Платформа знань
        </Typography>

        <Typography variant="h6" component="p" sx={subtitleSx}>
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
            sx={textFieldSx}
          />
          <Button variant="contained" size="large" color="primary">
            Знайти
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
