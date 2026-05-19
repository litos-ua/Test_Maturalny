// import { 
//   Box, 
//   Typography, 
//   List, 
//   ListItem, 
//   ListItemText,
//   Chip,
//   Grid,
//   Modal,
//   IconButton,
//   useTheme,
// } from '@mui/material';
// import { useEffect, useState } from "react";
// import { aboutPageStyles } from './AboutPageStyles';
// import { RotatingImages } from '../../components';
// import { AboutImages, text } from '../../constants';
// import { subjects } from "../../constants"
// import { fetchDisciplines } from "../../api"; 
// import { Close as CloseIcon } from "@mui/icons-material";
// import { modalStyles } from './AboutPageStyles';


// export function AboutPage() {

//   const theme = useTheme();
//   const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDiscipline, setSelectedDiscipline] = useState<any>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//       setLoading(true);
//       fetchDisciplines()
//         .then((data) => {
//           if (Array.isArray(data)) {
//             setDisciplines(data);
//           }
//         })
//         .finally(() => setLoading(false));
//     }, []);

//     // Функция для открытия модального окна
//   const handleDisciplineClick = (disciplineName: string) => {
//     const subject = subjects.find(subj => subj.title === disciplineName);
//     if (subject) {
//       setSelectedDiscipline(subject);
//       setModalOpen(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedDiscipline(null);
//   };

//   return (
//     <Box sx={{...aboutPageStyles.content, backgroundColor: theme.palette.background.paper}}>
//       <Typography variant="h1" sx={aboutPageStyles.title}>
//         Про освітній проєкт ZNOReady
//       </Typography>

//       <Typography sx={{...aboutPageStyles.paragraph, mb:"5vh"}}>
//         {text.aboutPage?.about}
//       </Typography>

//       {/* Обертка с контролируемыми отступами */}
//       <Box sx={{ 
//         mb: 3, 
//         mt: 2, 
//         width: "100%",
//       }}>
//         <RotatingImages 
//           images={AboutImages}
//           switchInterval={8000}
//           height={{ xs: 200, sm: 250, md: 300, lg: 350 }}
//           objectFit="contain"
//           borderRadius={2}
//         />
//       </Box>

//         <Typography variant="h2" sx={aboutPageStyles.subtitle}>
//           Наша місія
//         </Typography>

//         <Typography sx={aboutPageStyles.paragraph}>
//           {text.aboutPage?.mission}
//         </Typography>

//         <Typography variant="h2" sx={aboutPageStyles.subtitle}>
//           Основні дисципліни
//         </Typography>

//         <Grid container spacing={2} sx={{ mb: 4 }}>
//           {disciplines.map((discipline) => (
//             <Grid key={discipline.id}>
//               <Chip 
//                 label={discipline.name} 
//                 color="primary" 
//                 variant="outlined"
//                 onClick={() => handleDisciplineClick(discipline.name)}
//                 sx={{ m: 0.5 }}
//               />
//             </Grid>
//           ))}
//         </Grid>

//         <Typography variant="h2" sx={aboutPageStyles.subtitle}>
//           Наші переваги
//         </Typography>

//         <List sx={aboutPageStyles.list}>
//           <ListItem sx={aboutPageStyles.listItem}>
//             <ListItemText 
//               primary="Інтерактивні тести та завдання" 
//               secondary="Система автоматичної перевірки та миттєвого зворотного зв'язку. Можливість архівації результатів тестування користувачів для подальшого аналізу рівня підготовки."
//             />
//           </ListItem>
//           <ListItem sx={aboutPageStyles.listItem}>
//             <ListItemText 
//               primary="Адаптивна програма навчання" 
//               secondary="Індивідуальний підхід до кожного учня з урахуванням рівня підготовки.Нам цікаві як ті, хто хоче отримати більш-менш прийнятний бал, так і ті, хто хоче отримати результат, близький до максимального."
//             />
//           </ListItem>
//           <ListItem sx={aboutPageStyles.listItem}>
//             <ListItemText 
//               primary="Досвідчені викладачі" 
//               secondary="Педагоги з багаторічним досвідом підготовки до ЗНО (НМТ), які щиро люблять те, чим займаються, а не просто заробляють гроші."
//             />
//           </ListItem>
//           <ListItem sx={aboutPageStyles.listItem}>
//             <ListItemText 
//               primary="Сучасні методики навчання" 
//               secondary="Відеоуроки, вебінари та велика кількість додаткових корисних матеріалів. Широка база тестів для підготовки заснована як на питаннях, що раніше зустрічалися, так і на авторських варіантах."
//             />
//           </ListItem>
//           <ListItem sx={aboutPageStyles.listItem}>
//             <ListItemText 
//               primary="Пробні ЗНО" 
//               secondary="Тестування можливо проходити як у варіанті тренувально-навчальному, так і у варіанті максимально наближеному до умов реального іспиту."
//             />
//           </ListItem>
//         </List>

//         <Typography variant="h2" sx={aboutPageStyles.subtitle}>
//           Чому обирають нас?
//         </Typography>

//         <Typography sx={aboutPageStyles.paragraph}>
//           {text.aboutPage?.advantages}
//         </Typography>

//         <Typography sx={{ ...aboutPageStyles.paragraph, fontStyle: 'italic', mt: 4 }}>
//           {text.aboutPage?.sucsess}
//         </Typography>

//         {/* Модальное окно */}
//     <Modal
//       open={modalOpen}
//       onClose={handleCloseModal}
//       aria-labelledby="discipline-modal-title"
//       aria-describedby="discipline-modal-description"
//     >
//       <Box sx={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
//         maxWidth: "800px",
//         maxHeight: "80vh",
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 24,
//         p: 4,
//         overflowY: "auto"
//       }}>
//         {/* Кнопка закрытия */}
//         <IconButton
//           aria-label="close"
//           onClick={handleCloseModal}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//             ...modalStyles.closeButton
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         {selectedDiscipline && (
//           <>
//             <Typography id="discipline-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
//               {selectedDiscipline.title}
//             </Typography>

//             <Typography id="discipline-modal-description" sx={{ mt: 2 }}>
//               {selectedDiscipline.detailedDescription}
//             </Typography>

//             {/* Дополнительная информация */}
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 Короткий опис:
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 {selectedDiscipline.description}
//               </Typography>
//             </Box>
//           </>
//         )}
//       </Box>
//     </Modal>

//     </Box>
//   );
// }

// src/pages/AboutPage/AboutPage.tsx   Работает, но нет хороших цветов
import { Box, Typography, Grid, Chip, useTheme, Paper, Container } from '@mui/material';
import { useEffect, useState } from "react";
import { aboutPageStyles } from './AboutPageStyles';
import { RotatingImages } from '../../components';
import { AboutImages, text } from '../../constants';
import { fetchDisciplines } from "../../api";
import {formatText} from "../../utils";

// Імпортуйте іконки MUI (або використайте будь-які інші)
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export function AboutPage() {
  const theme = useTheme();
  const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchDisciplines()
      .then((data) => {
        if (Array.isArray(data)) {
          setDisciplines(data);
        }
      })
      .catch(console.error);
  }, []);

  // Приклад статичних даних для метрик
  const metrics = [
    { number: '8+', label: 'Дисциплін', icon: <SchoolIcon fontSize="large" color="primary" /> },
    { number: '1000+', label: 'Користувачів', icon: <PeopleIcon fontSize="large" color="primary" /> },
    { number: '24/7', label: 'Доступ до матеріалів', icon: <PublicIcon fontSize="large" color="primary" /> },
    { number: '100%', label: 'Підтримка', icon: <SupportAgentIcon fontSize="large" color="primary" /> },
  ];

  // Діяльність та цілі
  const missionVision = {
    mission: text.aboutPage?.mission || "Надавати кожному учню доступ до якісної підготовки до ЗНО/НМТ, незалежно від місця проживання чи фінансових можливостей, використовуючи сучасні технології.",
    vision: text.aboutPage?.vision ||"Створити найбільшу онлайн-екосистему в Україні для підготовки до іспитів, де навчання є ефективним, цікавим та доступним для всіх.",
  };

  // Цінності (список)
  // const values = [
  //   { title: "Адаптивна програма", description: "Індивідуальний підхід до кожного учня з урахуванням рівня підготовки. Нам цікаві як ті, хто хоче отримати більш-менш прийнятний бал, так і ті, хто хоче отримати результат, близький до максимального." },
  //   { title: "Якість", description: "Постійно оновлювані матеріали та актуальні тести. Система автоматичної перевірки та миттєвого зворотного зв'язку. Можливість архівації результатів тестування користувачів для подальшого аналізу рівня підготовки." },
  //   { title: "Інновації", description: "Використання найкращих технологій для навчання. Відеоуроки, вебінари та велика кількість додаткових корисних матеріалів." },
  //   { title: "Підтримка", description: "Ми поруч 24/7, щоб допомогти та відповісти на питання. Додаткові безкоштовні консультації." },
  //   { title: "Результат", description: "Звичайно наша головна мета — успіх кожного учня на іспитах. Але система підготовки спрямована на формуванні у учнів міцних знаннь для продовження подальшої освіти." },
  //   { title: "Команда", description: "Педагоги з багаторічним досвідом підготовки до ЗНО (НМТ), які щиро люблять те, чим займаються, а не просто заробляють гроші.." },
  // ];

  return (
    <Container maxWidth="lg" sx={{ ...aboutPageStyles.container, py: 4 }}>
      {/* Hero Section */}
      <Box sx={aboutPageStyles.heroSection}>
        <Typography variant="h1" sx={aboutPageStyles.heroTitle}>
          Про освітній проєкт <br /> ZNOReady
        </Typography>
        <Typography variant="body1" sx={aboutPageStyles.heroSubtitle}>
          {formatText(text.aboutPage?.about || "Ваш надійний партнер у підготовці до ЗНО/НМТ. Ми поєднуємо перевірені методики з інноваційними технологіями.")}
        </Typography>
      </Box>

      {/* Metrics Section */}
      <Box sx={aboutPageStyles.metricsSection}>
        {metrics.map((metric, idx) => (
          <Box key={idx} sx={aboutPageStyles.metricItem}>
            {metric.icon}
            <Typography variant="h3" sx={aboutPageStyles.metricNumber}>
              {metric.number}
            </Typography>
            <Typography variant="body2" sx={aboutPageStyles.metricLabel}>
              {metric.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Rotating Images */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <RotatingImages
          images={AboutImages}
          switchInterval={8000}
          height={{ xs: 200, sm: 300, md: 400 }}
          objectFit="cover"
          borderRadius={2}
        />
      </Box>
      

      {/* Mission & Vision */}
      <Box sx={aboutPageStyles.missionVisionGrid}>
        <Paper elevation={0} sx={aboutPageStyles.missionVisionCard}>
          <Typography variant="h5" component="h3" sx={aboutPageStyles.missionVisionTitle}>
            Наша діяльність
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
            {missionVision.mission}
          </Typography>
        </Paper>
        <Paper elevation={0} sx={aboutPageStyles.missionVisionCard}>
          <Typography variant="h5" component="h3" sx={aboutPageStyles.missionVisionTitle}>
            Наші цілі
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
            {missionVision.vision}
          </Typography>
        </Paper>
      </Box>

      {/* Disciplines Chips */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" sx={aboutPageStyles.sectionTitle}>
          Основні дисципліни
        </Typography>
        <Box sx={aboutPageStyles.chipGrid}>
          {disciplines.map((discipline) => (
            <Chip
              key={discipline.id}
              label={discipline.name}
              color="primary"
              variant="outlined"
              clickable
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Values Section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" sx={aboutPageStyles.sectionTitle}>
          Наші цінності
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {text.aboutPage?.values?.map((value, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Paper elevation={0} sx={aboutPageStyles.valueCard}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Original Advantages List (можна залишити або замінити) */}
      {/* <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" sx={aboutPageStyles.sectionTitle}>
          Наші переваги
        </Typography>
        <Typography variant="body1" sx={{ ...aboutPageStyles.paragraph, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
          {text.aboutPage?.advantages}
        </Typography>
      </Box> */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" sx={aboutPageStyles.sectionTitle}>
          Наші переваги
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            ...aboutPageStyles.paragraph, 
            textAlign: 'justify',           // ← вирівнювання з двох сторін
            maxWidth: '100%',               // ← розтягнути на всю ширину
            width: '100%',                  // ← повна ширина
            mx: 'auto',
          }}
        >
          {text.aboutPage?.advantages}
        </Typography>
      </Box>

      {/* Final Quote */}
      <Box sx={{ textAlign: 'center', my: 8, p: 3, bgcolor: 'background.default', borderRadius: 4 }}>
        <Typography variant="h6" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {text.aboutPage?.sucsess}
        </Typography>
      </Box>
    </Container>
  );
}


