import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Question } from "../../types/pages/testpages/types";

interface Props {
  question: Question;
  savedAnswer: number[]; // массив выбранных вариантов
  onAnswer: (questionId: number, optionIds: number[]) => void;
}

export function QuestionMultipleChoice({ question, savedAnswer, onAnswer }: Props) {

  // обработчик выбора чекбоксов
  const handleChange = (event: ChangeEvent<HTMLInputElement>, optionId: number) => {
    let updated: number[];
    if (event.target.checked) {
      updated = [...savedAnswer, optionId];
    } else {
      updated = savedAnswer.filter(id => id !== optionId);
    }
  //  console.log("Выбраны варианты в MultipleChoice:", updated);
    onAnswer(question.id, updated);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* Левая часть – текст и варианты */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h6" gutterBottom>{question.text}</Typography>
        <FormGroup>
          {question.options.map(opt => (
            <FormControlLabel
              key={opt.id}
              control={
                <Checkbox
                  checked={savedAnswer.includes(opt.id)}
                  onChange={(e) => handleChange(e, opt.id)}
                />
              }
              label={opt.text}
            />
          ))}
        </FormGroup>
      </Grid>

      {/* Правая часть – изображение */}
      {question.imageUrl && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={question.imageUrl}
              alt="Зображення до питання"
              style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

