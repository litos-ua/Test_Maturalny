import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Grid,
  Modal,
  IconButton,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from "react";
import { aboutPageStyles } from './AboutPageStyles';
import { RotatingImages } from '../../components';
import { AboutImages, text } from '../../constants';
import { subjects } from "../../constants"
import { fetchDisciplines } from "../../api"; 
import { Close as CloseIcon } from "@mui/icons-material";
import { modalStyles } from './AboutPageStyles';


export function AboutPage() {

  const theme = useTheme();
  const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

    // Функция для открытия модального окна
  const handleDisciplineClick = (disciplineName: string) => {
    const subject = subjects.find(subj => subj.title === disciplineName);
    if (subject) {
      setSelectedDiscipline(subject);
      setModalOpen(true);
    }
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDiscipline(null);
  };

  return (
    <Box sx={{...aboutPageStyles.content, backgroundColor: theme.palette.background.paper}}>
      <Typography variant="h1" sx={aboutPageStyles.title}>
        Про освітній проєкт ZNOReady
      </Typography>

      <Typography sx={{...aboutPageStyles.paragraph, mb:"5vh"}}>
        {text.aboutPage?.about}
      </Typography>

      {/* Обертка с контролируемыми отступами */}
      <Box sx={{ 
        mb: 3, 
        mt: 2, 
        width: "100%",
      }}>
        <RotatingImages 
          images={AboutImages}
          switchInterval={8000}
          height={{ xs: 200, sm: 250, md: 300, lg: 350 }}
          objectFit="contain"
          borderRadius={2}
        />
      </Box>

        <Typography variant="h2" sx={aboutPageStyles.subtitle}>
          Наша місія
        </Typography>

        <Typography sx={aboutPageStyles.paragraph}>
          {text.aboutPage?.mission}
        </Typography>

        <Typography variant="h2" sx={aboutPageStyles.subtitle}>
          Основні дисципліни
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {disciplines.map((discipline) => (
            <Grid key={discipline.id}>
              <Chip 
                label={discipline.name} 
                color="primary" 
                variant="outlined"
                onClick={() => handleDisciplineClick(discipline.name)}
                sx={{ m: 0.5 }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h2" sx={aboutPageStyles.subtitle}>
          Наші переваги
        </Typography>

        <List sx={aboutPageStyles.list}>
          <ListItem sx={aboutPageStyles.listItem}>
            <ListItemText 
              primary="Інтерактивні тести та завдання" 
              secondary="Система автоматичної перевірки та миттєвого зворотного зв'язку"
            />
          </ListItem>
          <ListItem sx={aboutPageStyles.listItem}>
            <ListItemText 
              primary="Адаптивна програма навчання" 
              secondary="Індивідуальний підхід до кожного учня з урахуванням рівня підготовки"
            />
          </ListItem>
          <ListItem sx={aboutPageStyles.listItem}>
            <ListItemText 
              primary="Досвідчені викладачі" 
              secondary="Педагоги з багаторічним досвідом підготовки до ЗНО"
            />
          </ListItem>
          <ListItem sx={aboutPageStyles.listItem}>
            <ListItemText 
              primary="Сучасні методики навчання" 
              secondary="Відеоуроки, вебінари, інфографіка та інтерактивні матеріали"
            />
          </ListItem>
          <ListItem sx={aboutPageStyles.listItem}>
            <ListItemText 
              primary="Пробні ЗНО" 
              secondary="Регулярне тестування в умовах, максимально наближених до реальних іспитів"
            />
          </ListItem>
        </List>

        <Typography variant="h2" sx={aboutPageStyles.subtitle}>
          Чому обирають нас?
        </Typography>

        <Typography sx={aboutPageStyles.paragraph}>
          {text.aboutPage?.advantages}
        </Typography>

        <Typography sx={{ ...aboutPageStyles.paragraph, fontStyle: 'italic', mt: 4 }}>
          {text.aboutPage?.sucsess}
        </Typography>

        {/* Модальное окно */}
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="discipline-modal-title"
      aria-describedby="discipline-modal-description"
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
        maxWidth: "800px",
        maxHeight: "80vh",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        overflowY: "auto"
      }}>
        {/* Кнопка закрытия */}
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            ...modalStyles.closeButton
          }}
        >
          <CloseIcon />
        </IconButton>

        {selectedDiscipline && (
          <>
            <Typography id="discipline-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
              {selectedDiscipline.title}
            </Typography>

            <Typography id="discipline-modal-description" sx={{ mt: 2 }}>
              {selectedDiscipline.detailedDescription}
            </Typography>

            {/* Дополнительная информация */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Короткий опис:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedDiscipline.description}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>

    </Box>
  );
}