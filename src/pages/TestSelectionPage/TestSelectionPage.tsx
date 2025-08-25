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
            xs: '1.5rem',    
            sm: '1.75rem',   
            md: '2rem',      
            lg: '2.125rem',  
            xl: '2.25rem'    
            },
            textAlign: {
            xs: 'center',
            sm: 'center', 
            md: 'center'
            },
            px: { xs: 2, sm: 0 } 
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
        px: { xs: 2, sm: 3, md: 0 } 
        }}>
        <Box
            component="img"
            src={bannerExam.src}
            alt={bannerExam.alt}
            sx={{
            maxWidth: { 
                xs: "100%",     // Смартфоны - на всю ширину
                sm: "500px",    
                md: "600px",      
                lg: "700px"     
            },
            width: "100%",
            borderRadius: { 
                xs: 8,         
                sm: 10,        
                md: 12         
            },
            height: "auto",
            boxShadow: {
                xs: 1,         
                sm: 2,         
                md: 3          
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