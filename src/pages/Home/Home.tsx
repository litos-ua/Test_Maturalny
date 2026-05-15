// Вносим адаптивные изменения

// Можешь использовать любой из:
// https://unsplash.com/s/photos/university
// https://www.pexels.com/search/student/


import { Box, Typography, Grid, Paper, Stack, Button,Chip, useTheme, alpha } from "@mui/material"; //, useMediaQuery
import HeroSection from "../../components/HeroSection/HeroSection";
import {RotatingImages} from "../../components/RotatingImages";
import SchoolIcon from "@mui/icons-material/School";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import QuizIcon from "@mui/icons-material/Quiz";
import { TypographyDualAnimator} from "../../components/TypographyDualAnimator";
import {floatingLabelStyle} from "./floatingLabelHomeStyle";
import { useAuth } from "../../context";
import { defaultImages } from "../../constants/images";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../router";


export function HomePage() {
  const theme = useTheme();
  const { authUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("🔎 isAuthenticated (Home):", isAuthenticated, authUser?.role);
 
  return (
    <>
      <HeroSection />
      <Box 
        mt={6} 
        px={{ xs: 2, md: 6 }}
        sx={{
          backgroundColor: theme.palette.primary.main, 
          color: theme.palette.getContrastText(theme.palette.primary.main), 
          py: { xs: 1, md: 2 },
          px: { xs: 1, md: 2 },
          textAlign: "center",
      }}
      >

        <Box flex={1}>
          <Stack spacing={2}>
            <Typography 
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: '1.5rem',   
                  sm: '1.75rem',  
                  md: '2rem',     
                  lg: '2.125rem', 
                  xl: '2.125rem'  
                }
              }}
            >
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

        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" 
              mt={{ xs: 0.5, sm: 1, md: 2 }} mb={{ xs: 1, md: 4 }}>
          
          {/* Левая часть */}
          <Grid size = {{ xs:12, md:6}}>
            <TypographyDualAnimator
              texts={[
                ["Все, що необхідно знати", "про випускні тести"],
                ["Підготуйся до НМТ зараз", "з нашою платформою"],
              ]}
              colorPairs={[
                ["#FFA07A", "#ADD8E6"],
                ["#9c27b0", "#F4A460"],
                ["#808000", "#FFD700"],
              ]}
              interval={8000}
              variant="h3"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '1.75rem', 
                  md: '2rem',
                  lg: '2.125rem',
                  xl: '3rem'
                },
                fontWeight: 700,
                textAlign: { xs: 'center', md: 'left' },
                mb: { xs: 3, md: 4, lg: 8, xl: 10 }, 
                ml: { xs: 1, md: 2, lg: 6, xl: 8 } 

              }}
            />
            
            <Typography variant="body1" 
              sx={{
                mb: { xs: 2, md: 3, lg: 6, xl: 8 },
                mt: { xs: '2vh', md: '1vh' },
                ml: { xs: 1, md: 2, lg: 6, xl: 8 },
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { 
                  xs: '0.9rem', 
                  sm: '1rem' },
                  md: '1.2rem',
                  lg: '1.5rem',
                  xl: '1.8rem'
              }}
            >
              Отримайте доступ до актуальних тестів, питань та навчальних матеріалів.
              <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} />
              Пройдіть тести у форматах пробного та реального іспиту.
              <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} />
              <strong>Зареєструйтесь, щоб розблокувати усі можливості!</strong>
            </Typography>
            
            {/* <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} 
                  mt={2} 
                  sx={{ width: '100%', ml: { xs: 1, md: 2, lg: 6, xl: 8 } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate(ROUTE.REGISTRATION)}
                  sx={{ 
                    textTransform: "none",
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.5 }
                  }}
                >
                  Зареєструватись
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(ROUTE.TESTSELECTION)}
                  sx={{ 
                    textTransform: "none",
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.5 }
                  }}
                >
                  Тестування
                </Button>

              </Box> */}
              
              <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} 
                    mt={2} 
                    sx={{ width: '100%', ml: { xs: 1, md: 2, lg: 6, xl: 8 } }}>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={{ xs: 2, sm: 3, md: 4, lg: 6, xl: 18 }}
                  sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'center'}}
                >
                  <Button
                    variant="contained"
                    // color="secondary"
                    size="large"
                    onClick={() => navigate(ROUTE.REGISTRATION)}
                    sx={{ 
                      textTransform: "none",
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1.1rem' },
                      px: { xs: 2, sm: 3, md: 4 },
                      py: { xs: 1, sm: 1.5, md: 1.5 },
                      minWidth: { xs: '100%', sm: '180px', md: '200px' },
                      bgcolor: theme.palette.info.main,  
                      '&:hover': {
                        bgcolor: theme.palette.info.dark,  
                      }
                    }}
                  >
                    Зареєструватись
                  </Button>
                  
                  <Button
                    variant="contained"
                    // color="success"  
                    size="large"
                    onClick={() => navigate(ROUTE.TESTSELECTION)}
                    sx={{ 
                      textTransform: "none",
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1.1rem' },
                      px: { xs: 2, sm: 3, md: 4 },
                      py: { xs: 1, sm: 1.5, md: 1.5 },
                      minWidth: { xs: '100%', sm: '180px', md: '200px' },
                      bgcolor: theme.palette.secondary.main,  
                      '&:hover': {
                        bgcolor: theme.palette.secondary.dark,  
                      }
                    }}
                  >
                    Тестування
                  </Button>
                </Stack>
              </Box>

          </Grid>

          {/* Правая часть */}
          <Grid size = {{xs:12, md: 6}} sx={{ textAlign: "center", position: "relative" }}>
            {/*  сменяющиеся картинки*/}
            {/* <RotatingImage />   */}
            <RotatingImages           
              images={defaultImages}
              switchInterval={8000}
              height={{ xs: 200, sm: 300, md: 400, lg: 450 }}
              objectFit="contain"
              borderRadius={2}
            />
            {/* Ярлыки (плавающие) */}
            <Box sx={{ position: "absolute", top: 40, right: { xs: 4, sm: 8, md: 10, lg: 12, xl: 16 } }}>
              <Stack spacing={1}>
                <Chip
                  icon={<SchoolIcon />}
                  label="Відеоуроки"
                  sx={(theme) => ({...floatingLabelStyle(theme, theme.palette.custom.videoLabel) })} 
                />
                <Chip
                  icon={<RecordVoiceOverIcon />} 
                  label="Подкасти"
                  sx={(theme) => ({...floatingLabelStyle(theme, theme.palette.custom.podcastLabel) })} 
                />
                <Chip
                  icon={<QuizIcon />}
                  label="Запитання"      
                  sx={(theme) => ({...floatingLabelStyle(theme, theme.palette.custom.quizLabel) })} 
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        
      </Box>

        {/* <Typography variant="h4" fontWeight={700} gutterBottom>
          Переваги нашої платформи
        </Typography> */}
        <Typography 
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: '1.5rem',   
              sm: '1.75rem',  
              md: '2rem',     
              lg: '2.125rem', 
              xl: '2.125rem'  
            },
          }}
        >
          Переваги нашої платформи
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 800, mb: 4 }}>
          Підготуйтеся до іспитів та тестів з різних дисциплін за допомогою інтерактивних завдань, реальних питань та автоматичної перевірки відповідей. Ідеально підходить для школярів, студентів та викладачів.
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid size = {{xs:12, sm:6, md:4, lg:4, xl:4}}>
            <Paper
              sx={{ 
                p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                height: "100%", 
                borderRadius: { xs: 2, md: 3 },
                transition: "all 0.3s ease",
                boxShadow: { xs: 1, sm: 2, md: 3 }, // ← замена elevation
                '&:hover': {
                  transform: { xs: 'none', md: 'translateY(-4px)' },
                  boxShadow: { xs: 2, md: 6 }
                }
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.2rem',
                  lg: '1.25rem'
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Актуальні дисципліни
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.85rem', 
                  md: '0.9rem',
                  lg: '0.95rem'
                },
                lineHeight: {
                  xs: 1.4,
                  sm: 1.5
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Постійно оновлювана база знань з математики, історії, біології та інших предметів.
              </Typography>
            </Paper>
          </Grid>

          <Grid size = {{xs:12, sm:6, md:4, lg:4, xl:4}}>
            <Paper
              sx={{
                p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                height: "100%",
                borderRadius: { xs: 2, md: 3 },
                transition: "all 0.3s ease",
                boxShadow: { xs: 1, sm: 2, md: 3 }, // заменяем elevation
                '&:hover': {
                  transform: { xs: 'none', md: 'translateY(-4px)' },
                  boxShadow: { xs: 2, md: 6 }
                }
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.2rem',
                  lg: '1.25rem'
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                База знань з математики, історії, біології та інших предметів
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.85rem',
                  md: '0.9rem',
                  lg: '0.95rem'
                },
                lineHeight: {
                  xs: 1.4,
                  sm: 1.5
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Вибір однієї/кілька відповідей, зіставлення, робота із зображеннями та поясненнями.
              </Typography>
            </Paper>
          </Grid>

          <Grid size = {{xs:12, sm:6, md:4, lg:4, xl:4}}>
            <Paper
              sx={{
                p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                height: "100%",
                borderRadius: { xs: 2, md: 3 },
                transition: "all 0.3s ease",
                boxShadow: {
                  xs: 1,   
                  sm: 2,   
                  md: 3    
                },
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-4px)" },
                  boxShadow: { xs: 2, md: 6 } // при hover разные уровни тени
                }
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.2rem',
                  lg: '1.25rem'
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Статистика та прогрес
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.85rem',
                  md: '0.9rem',
                  lg: '0.95rem'
                },
                lineHeight: {
                  xs: 1.4,
                  sm: 1.5
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Відстежуйте свої результати, покращуйте слабкі сторони та досягайте більшого.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
    </>
  );
}

