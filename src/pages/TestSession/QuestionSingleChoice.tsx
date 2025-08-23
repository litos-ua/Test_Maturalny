
//Не выбираются варианты в RadioGroup
import { Box, RadioGroup, FormControlLabel, Radio, Typography, Grid } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Question } from "../../types/pages/testpages/types";

interface Props {
  question: Question;
  savedAnswer: number[]; // текущий выбранный ответ
  onAnswer: (questionId: number, optionIds: number[]) => void; // функция сохранения
}

export function QuestionSingleChoice({ question, savedAnswer, onAnswer }: Props) {
  // обработчик изменения выбора
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOptionId = Number(event.target.value);
    onAnswer(question.id, [selectedOptionId]);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* Левая часть – текст и варианты (возможны изображения) */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h6" gutterBottom>
          {question.text}
        </Typography>

        <RadioGroup value={savedAnswer[0]?.toString() || ""} onChange={handleChange}>
          {question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={
                option.groupKey?.startsWith('image') ? (
                  <Box component="img" src={option.text} alt={`Option ${option.text}`} sx={{ maxWidth: "150px" }} />
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
          {question.imageUrl && (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={question.imageUrl}
              alt="Зображення до питання"
              style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
            />
          </Box>
          )}
        </Grid>
      )}
    </Grid>
  );
}



