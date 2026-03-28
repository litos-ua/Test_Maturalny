// Адаптация к разним экранам и вывод масштабируемых изображений.
import { Box, RadioGroup, FormControlLabel, Radio, Typography, Grid } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Question } from "../../types/pages/testpages/types";
import { ZoomableImage } from "../../components";

interface Props {
  question: Question;
  savedAnswer: number[]; // текущий выбранный ответ
  onAnswer: (questionId: number, optionIds: number[]) => void; 
}

export function QuestionSingleChoice({ question, savedAnswer, onAnswer }: Props) {
  // обработчик изменения выбора
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOptionId = Number(event.target.value);
    onAnswer(question.id, [selectedOptionId]);
  };

    return (
    <Grid container spacing={2} alignItems="center">
      {/* Левая часть – текст и варианты */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ whiteSpace: 'pre-line' }}
        >
          {question.text.replace(/<br>/g, '\n')}
        </Typography>
        <RadioGroup
          value={savedAnswer[0]?.toString() || ""}
          onChange={handleChange}
        >
          {question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              sx={{                       //Отступ по вертикали для изображений
                alignItems: "flex-start",
                mb:
                  option.groupKey?.toLowerCase().startsWith("img") ||
                  option.groupKey?.toLowerCase().startsWith("image")
                    ? 1.5
                    : 0.5,
              }}
              label={
                option.groupKey?.toLowerCase().startsWith("img") ||
                option.groupKey?.toLowerCase().startsWith("image") ? (
                  // Используем ZoomableImage вместо Box component="img"
                  <ZoomableImage
                    src={option.text}
                    alt={`Option ${option.text}`}
                    maxHeight={150}
                    maxWidth="100%"
                  />
                ) : (
                  option.text
                )
              }
            />
          ))}
        </RadioGroup>
      </Grid>

      {/* Правая часть – изображение */}
      {question.imageUrl && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ textAlign: "center" }}>
            <ZoomableImage
              src={question.imageUrl}
              alt="Зображення до питання"
              maxWidth="100%"
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}