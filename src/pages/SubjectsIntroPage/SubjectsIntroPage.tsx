// Подгружаем при помощи хука список дисциплин и передаем его в карусель.
import { Container, useTheme, CircularProgress, Box, Typography } from "@mui/material";
import { SubjectsCarousel } from "../../components";
import { subjects as staticSubjects } from "../../constants";
import { useDisciplines } from "../../hooks/useDisciplines";

const basePath = "images/teachers/";

export function SubjectsIntroPage() {
  const theme = useTheme();
  const { disciplines, loading, error } = useDisciplines();

  // Загружаем данные 
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '88vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '88vh' 
      }}>
        <Typography color="error">Ошибка загрузки дисциплин: {error}</Typography>
      </Box>
    );
  }

  // Создаем карту соответствия названия → ID
  const disciplineMap = disciplines.reduce((map, d) => {
    map[d.name] = d.id;
    return map;
  }, {} as Record<string, number>);

  // Обогащаем статические subjects реальными disciplineId
  const subjectsWithIds = staticSubjects.map(subject => ({
    ...subject,
    disciplineId: disciplineMap[subject.title]
  }));

  return (
    <Container
      sx={{
        pt: "1vh",
        pr: "2vw",
        overflow: "hidden",
        height: "88vh",
        maxWidth: "100% !important",
        backgroundColor: theme.palette.custom.outcard
      }}
    >
      <SubjectsCarousel
        subjects={subjectsWithIds}
        basePath={basePath}
      />
    </Container>
  );
}