// Адаптация к разным єкранам
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { getDisciplineById } from "../../api/disciplineClient";
import { getTopicsByDisciplineId } from "../../api/topicClient";
import { bannerMap, disciplinesGenitive } from "../../constants";
import { TypographyDualAnimator } from "../../components/TypographyDualAnimator";
import * as styles from "./testPageStyles";

interface Discipline {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string | null;
}

export function TestPage() {
  const { id } = useParams();
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [showTopics, setShowTopics] = useState(false);
  const [showTestOptions, setShowTestOptions] = useState(false);
  const topicsRef = useRef<HTMLUListElement | null>(null);
  const testOptionsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleShowTopics = async () => {
    if (!showTopics && discipline) {
      const data = await getTopicsByDisciplineId(discipline.id);
      setTopics(data);
    }
    setShowTopics(!showTopics);
  };

  const handleShowTestOptions = () => {
    setShowTestOptions(true);
  };

  useEffect(() => {
    if (showTopics && topicsRef.current) {
      topicsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showTopics]);

  useEffect(() => {
    if (showTestOptions && testOptionsRef.current) {
      testOptionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showTestOptions]);

  useEffect(() => {
    if (id) {
      getDisciplineById(Number(id)).then(setDiscipline);
    }
  }, [id]);

  if (!discipline) return <p>Загрузка...</p>;

  const banner = bannerMap[discipline.id];
  const nameGenitive = disciplinesGenitive[discipline.name] || discipline.name;

  return (
    <Box sx={styles.pageWrapper}>
      <Typography variant="h3" sx={{
        ...styles.title,
        fontSize: {
          xs: '1.5rem',
          sm: '1.75rem',
          md: '2rem',
          lg: '2.125rem'
        },
        textAlign: { xs: 'center', md: 'left' },
        px: { xs: 2, md: 0 }
      }}>
        Пробний онлайн-тест НМТ / ЗНО з {nameGenitive}
      </Typography>

      <TypographyDualAnimator
        texts={[
          ["Пробний онлайн-тест НМТ / ЗНО з", discipline.name],
          ["Перевір вже зараз", "свій рівень підготовки"],
        ]}
        colorPairs={[
          ["#FFA07A", "#ADD8E6"],
          ["#9c27b0", "#F4A460"],
          ["#808000", "#FFD700"],
        ]}
        interval={8000}
        variant="h5"
        fontWeight={700}
        sx={{
          fontSize: {
            xs: '1.1rem',
            sm: '1.3rem',
            md: '1.5rem'
          },
          textAlign: { xs: 'center', md: 'left' },
          px: { xs: 2, md: 0 }
        }}
      />

      {banner && (
        <Box sx={{
          ...styles.testDisciplineImagetyle,
          position: 'relative',
          height: { xs: '250px', sm: '300px', md: '400px' }
        }}>
          <Box
            component="img"
            src={banner.src}
            alt={banner.alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Адаптивные кнопки */}
          <Box sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 24 },
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 4 }
          }}>
            <Button
              variant="contained"
              color="secondary"
              size={isMobile ? "medium" : "large"}
              onClick={handleShowTestOptions}
              sx={{
                minWidth: { xs: '140px', sm: '160px', md: '180px' },
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Пройти тест
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size={isMobile ? "medium" : "large"}
              onClick={handleShowTopics}
              sx={{
                minWidth: { xs: '140px', sm: '160px', md: '180px' },
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Перелік тем
            </Button>
          </Box>
        </Box>
      )}

      {showTopics && topics.length > 0 && (
        <List ref={topicsRef} sx={{
          ...styles.topicsList,
          mt: { xs: 3, md: 4 },
          px: { xs: 2, md: 0 }
        }}>
          {topics.map((topic, index) => (
            <Tooltip
              key={topic.id}
              title={
                <span
                  style={{
                    maxWidth: "clamp(15rem, 30vw, 25rem)",
                    display: "block",
                    whiteSpace: "normal",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  }}
                >
                  {topic.description}
                </span>
              }
              arrow
              placement="top-end"
            >
              <ListItem sx={styles.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem',
                      lg: '1.2rem'
                    },
                    fontWeight: 500,
                  }}
                  primary={`${index + 1}. ${topic.title}`}
                />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      )}

      {showTestOptions && (
        <Box
          ref={testOptionsRef}
          sx={{
            mt: { xs: 4, md: 6 },
            px: { xs: 2, md: 0 }
          }}
        >
          <Typography variant="h5" sx={{
            textAlign: 'center',
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
          }}>
            Оберіть тип тестування
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid size = {{xs:12, sm:6, md:5, lg:4}}>
              <Box
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  p: { xs: 2, md: 3 },
                  border: `2px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: "all 0.3s",
                  "&:hover": { 
                    transform: "scale(1.02)",
                    borderColor: theme.palette.primary.main
                  },
                }}
                onClick={() =>
                  navigate(`/test/session/${encodeURIComponent(discipline.id)}/${encodeURIComponent(discipline.name)}?type=learn`)
                }
              >
                <Box
                  component="img"
                  src="/images/test-type/learn.jpg"
                  alt="Учбовий тест"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "120px", sm: "150px", md: "180px" },
                    height: "auto",
                    mb: { xs: 1, md: 2 },
                    borderRadius: 2
                  }}
                />
                <Typography variant="h6" sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
                }}>
                  Учбовий тест
                </Typography>
                <Typography variant="body2" sx={{
                  mt: 1,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  color: theme.palette.text.secondary
                }}>
                  Навчання з підказками
                </Typography>
              </Box>
            </Grid>

            <Grid size = {{xs:12, sm:6, md:5, lg:4}}>
              <Box
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  p: { xs: 2, md: 3 },
                  border: `2px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: "all 0.3s",
                  "&:hover": { 
                    transform: "scale(1.02)",
                    borderColor: theme.palette.primary.main
                  },
                }}
                onClick={() =>
                  navigate(`/test/session/${encodeURIComponent(discipline.id)}/${encodeURIComponent(discipline.name)}?type=real`)
                }
              >
                <Box
                  component="img"
                  src="/images/test-type/real.jpg"
                  alt="Реальний тест"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "120px", sm: "150px", md: "180px" },
                    height: "auto",
                    mb: { xs: 1, md: 2 },
                    borderRadius: 2
                  }}
                />
                <Typography variant="h6" sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
                }}>
                  Реальний тест
                </Typography>
                <Typography variant="body2" sx={{
                  mt: 1,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  color: theme.palette.text.secondary
                }}>
                  Екзаменаційний режим
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}