// Механизм сдвига карт перенесли в карусель
import { Container, useTheme } from "@mui/material";
import { SubjectsCarousel } from "../../components";
import { subjects } from "../../constants";

const basePath = "images/teachers/";

export function SubjectsIntroPage() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        pt: "1vh",
        pr:"2vw",
        overflow: "hidden",
        height: "88vh",
        maxWidth: "100% !important",
        backgroundColor: theme.palette.custom.outcard
      }}
    >
      <SubjectsCarousel
        subjects={subjects}
        basePath={basePath}
      />
    </Container>
  );
}