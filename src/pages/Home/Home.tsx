// Можешь использовать любой из:
// https://unsplash.com/s/photos/university
// https://www.pexels.com/search/student/


import { Box, Typography, Grid, Paper, Stack, Button,Chip, useTheme, alpha } from "@mui/material"; //, useMediaQuery
import HeroSection from "../../components/HeroSection/HeroSection";
import {RotatingImage} from "../../components/RotatingImage";
import SchoolIcon from "@mui/icons-material/School";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import QuizIcon from "@mui/icons-material/Quiz";
import { TypographyDualAnimator} from "../../components/TypographyDualAnimator";
import {floatingLabelStyle} from "./floatingLabelHomeStyle";
import { useAuth } from "../../context";

export function HomePage() {
  const theme = useTheme();
  // const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { authUser, isAuthenticated } = useAuth();
  console.log("🔎 isAuthenticated (Home):", isAuthenticated, authUser?.role);
  //console.log("🔎 user(Home):", authUser);
  return (
    <>
      <HeroSection />
      <Box 
        mt={6} 
        px={{ xs: 2, md: 6 }}
        sx={{
          backgroundColor: theme.palette.primary.main, // синий из темы
          color: theme.palette.getContrastText(theme.palette.primary.main), // авто контрастный текст
          py: { xs: 1, md: 2 },
          px: { xs: 1, md: 2 },
          textAlign: "center",
      }}
      >

        <Box flex={1}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={700}>
              Ласкаво просимо на платформу знань
            </Typography>
            <Typography variant="body1" sx={{
              width: "100%",       
              textAlign: "center", 
            }}>
              Збирайте досвід через тести, прокачуйте
              компетенції та стежте за прогресом.
            </Typography>
            
          </Stack>
        </Box>

        <Grid container spacing={4} alignItems="center" mt={{ xs: 0.5, sm: 1, md: 2 }} mb={{ xs: 1, md: 4 }}>
           {/* Левая часть */}
           <Grid size = {{xs:12, md: 6}}>
             <TypographyDualAnimator
                texts={[
                  ["Все, що необхідно знати", "про випускні тести"],
                  ["Підготуйся до НМТ зараз", "з нашою платформою"],
                ]}
                colorPairs={[
                  ["#FFA07A", "#ADD8E6"], // светло-оранжевый + светло-синий
                  ["#9c27b0", "#F4A460"], // фиолетовый + светло-коричневый
                  ["#808000", "#FFD700"], // оливковый + темно-желтый (золотой)
                ]}
                interval={8000}
                variant="h3"
                fontWeight={700}
/>
             <Typography variant="body1" mb={3} marginTop={"1vh"}>
               Отримайте доступ до актуальних тестів, питань та навчальних матеріалів.
               <br />
               <strong>Зарегистрируйтесь, чтобы разблокировать все возможности!</strong>
             </Typography>
             <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ textTransform: "none" }}
                >
                  Зареєструватись
                </Button>
              </Box>
          </Grid>

          {/* Правая часть */}
          <Grid size = {{xs:12, md: 6}} sx={{ textAlign: "center", position: "relative" }}>
            <RotatingImage />  {/*  сменяющиеся картинки*/}
            {/* Ярлыки (плавающие) */}
            <Box sx={{ position: "absolute", top: 40, right: { xs: 4, sm: 8, md: 10, lg: 12, xl: 16 } }}>
              <Stack spacing={1}>
                <Chip
                  icon={<SchoolIcon />}
                  label="Відеоуроки"
                  sx={(theme) => ({...floatingLabelStyle(theme, theme.palette.custom.videoLabel) })} //bgcolor: "#CBB7FF"
                />
                <Chip
                  icon={<RecordVoiceOverIcon />} 
                  label="Подкасти"
                  sx={(theme) => ({...floatingLabelStyle(theme, theme.palette.custom.podcastLabel) })} //bgcolor: "#B0E0FF"
                />
                <Chip
                  icon={<QuizIcon />}
                  label="Запитання"      
                  sx={(theme) => ({...floatingLabelStyle(theme, theme.palette.custom.quizLabel) })} //bgcolor: "#FFD580"
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        
      </Box>

        <Typography variant="h4" fontWeight={700} gutterBottom>
          Переваги нашої платформи
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 800, mb: 4 }}>
          Підготуйтеся до іспитів та тестів з різних дисциплін за допомогою інтерактивних завдань, реальних питань та автоматичної перевірки відповідей. Ідеально підходить для школярів, студентів та викладачів.
        </Typography>

        <Grid container spacing={4}>
          <Grid  size = {{xs:12, md: 4}}>
            <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Актуальні дисципліни
              </Typography>
              <Typography variant="body2">
                Постоянно обновляемая база знаний по математике, истории, биологии и другим предметам.
              </Typography>
            </Paper>
          </Grid>

          <Grid  size = {{xs:12, md: 4}}>
            <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                База знань з математики, історії, біології та інших предметів, що постійно оновлюється.
              </Typography>
              <Typography variant="body2">
                Вибір однієї/кілька відповідей, зіставлення, робота із зображеннями та поясненнями.
              </Typography>
            </Paper>
          </Grid>

          <Grid  size = {{xs:12, md: 4}}>
            <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Статистика та прогрес
              </Typography>
              <Typography variant="body2">
                Відстежуйте свої результати, покращуйте слабкі сторони та досягайте більшого.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
    </>
  );
}


