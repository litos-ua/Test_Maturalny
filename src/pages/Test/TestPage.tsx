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

  // прокрутка к списку тем
  useEffect(() => {
    if (showTopics && topicsRef.current) {
      topicsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showTopics]);

  // прокрутка к кнопкам выбора теста
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
      <Typography variant="h3" sx={styles.title}>
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
      />

      {banner && (
        <Box sx={styles.testDisciplineImagetyle}>
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

          {/* Изменено: теперь показывает выбор теста */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ ...styles.testButtonStyle, left: 16 }}
            onClick={handleShowTestOptions}
          >
            Пройти тест
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleShowTopics}
            sx={{ ...styles.testButtonStyle, right: 16 }}
          >
            Перелік тем
          </Button>
        </Box>
      )}

      {showTopics && topics.length > 0 && (
        <List ref={topicsRef} sx={styles.topicsList}>
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
                    fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                    fontWeight: 500,
                  }}
                  primary={`${index + 1}. ${topic.title}`}
                />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      )}

      {/* ✅ Блок выбора типа теста */}
      {showTestOptions && (
        <Box
          ref={testOptionsRef}
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {/* Учбовий тест */}
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
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
                width: { xs: "150px", md: "200px" },
                height: "auto",
                mb: 1,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Typography variant="h6">Учбовий тест</Typography>
          </Box>

          {/* Реальний тест */}
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
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
                width: { xs: "150px", md: "200px" },
                height: "auto",
                mb: 1,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Typography variant="h6">Реальний тест</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
