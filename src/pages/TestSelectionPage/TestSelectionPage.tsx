import { useEffect, useState } from "react";
import { Button, CircularProgress, Typography, Box, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchDisciplines } from "../../api";
import { bannerExam, type Banner } from "../../constants";

// Функция для создания slug (как у тебя в TestMenu)
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/і/g, "i")
    .replace(/ї/g, "i")
    .replace(/є/g, "e")
    .replace(/ґ/g, "g")
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}



export function TestSelectionPage() {
  const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    fetchDisciplines()
      .then((data) => {
        if (Array.isArray(data)) {
          setDisciplines(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (name: string, id: number) => {
    const slug = slugify(name);
    navigate(`/test/${slug}/${id}`);
  };

  // Кастомные цвета из theme.palette.custom
  const customColors = [
    theme.palette.custom.videoLabel, theme.palette.custom.podcastLabel,
    theme.palette.custom.quizLabel, theme.palette.custom.outcard,
    theme.palette.custom.outcard, theme.palette.custom.quizLabel,
    theme.palette.custom.podcastLabel, theme.palette.custom.videoLabel,
  ];

  return (
    <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
      {/* Заголовок */}
      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold" 
        color={theme.palette.primary.dark}
        sx={{
            fontSize: {
            xs: '1.5rem',    // Мобильные - 24px
            sm: '1.75rem',   // Планшеты - 28px
            md: '2rem',      // Малые десктопы - 32px
            lg: '2.125rem',  // Десктопы - 34px (стандартный h4)
            xl: '2.25rem'    // Большие экраны - 36px
            },
            textAlign: {
            xs: 'center',
            sm: 'center', 
            md: 'center'
            },
            px: { xs: 2, sm: 0 } // Отступы по бокам на мобильных
        }}
        >
        Виберіть дисципліну для тестування ЗНО / НМТ
        </Typography>

        {/* Картинка */}
        <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        mt: { xs: 3, sm: 4, md: 4 },
        mb: { xs: 3, sm: 4, md: 4 },
        px: { xs: 2, sm: 3, md: 0 } // Адаптивные отступы
        }}>
        <Box
            component="img"
            src={bannerExam.src}
            alt={bannerExam.alt}
            sx={{
            maxWidth: { 
                xs: "100%",     // Мобильные - на всю ширину
                sm: "500px",    // Планшеты - 500px
                md: "600px",    // Десктопы - 600px  
                lg: "700px"     // Большие экраны - 700px
            },
            width: "100%",
            borderRadius: { 
                xs: 8,         // Меньше скругление на мобильных
                sm: 10,        // Планшеты
                md: 12         // Десктопы
            },
            height: "auto",
            boxShadow: {
                xs: 1,         // Легкая тень на мобильных
                sm: 2,         // Средняя на планшетах
                md: 3          // Сильная на десктопах
            }
            }}
        />
        </Box>

      {/* Список дисциплин */}
      {loading ? (
        <CircularProgress />
      ) : disciplines.length === 0 ? (
        <Typography variant="body2">Немає доступних дисциплін</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {disciplines.map((discipline, index) => {
            const bgColor = customColors[index % customColors.length];
            return (
              <Grid key={discipline.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    backgroundColor: bgColor,
                    color: theme.palette.secondary.dark,
                    "&:hover": {
                      backgroundColor: bgColor,
                      opacity: 0.85,
                    },
                  }}
                  onClick={() => handleSelect(discipline.name, discipline.id)}
                >
                  {discipline.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}