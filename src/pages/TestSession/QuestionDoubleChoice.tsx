// Улучшенная версия
import { useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import type { Question } from "../../types/pages/testpages/types";

interface Props {
  question: Question;
  savedAnswer: number[]; 
  onAnswer: (questionId: number, answer: number[]) => void;
}

export function QuestionDoubleChoice({ question, savedAnswer, onAnswer }: Props) {
  const [inputs, setInputs] = useState<string[]>(["", ""]);
  const [errors, setErrors] = useState<boolean[]>([false, false]);

  // Инициализация сохраненных ответов
  useEffect(() => {
    if (savedAnswer && savedAnswer.length === 2) {
      setInputs([
        savedAnswer[0]?.toString() || "",
        savedAnswer[1]?.toString() || ""
      ]);
    }
  }, [savedAnswer]);

  const handleChange = (index: number, value: string) => {
    // Проверяем, что ввод - допустимое число или пустая строка
    const isValid = value === "" || !isNaN(Number(value));
    
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    const updatedErrors = [...errors];
    updatedErrors[index] = !isValid;
    setErrors(updatedErrors);

    // Отправляем только если оба значения валидны
    const numericAnswers = updatedInputs.map(v => v === "" ? NaN : Number(v));
    if (numericAnswers.every(v => !isNaN(v))) {
      onAnswer(question.id, numericAnswers as number[]);
    } else {
      onAnswer(question.id, []);
    }
  };

 // Добавляем масштабируемость
    return (
    <Grid container spacing={2}>
     {/* Заголовок вопроса */}
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6">{question.text}</Typography>
      </Grid>

      {/* Оба инпута вместе */}
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Відповідь 1"
              type="number"
              value={inputs[0]}
              error={errors[0]}
              helperText={errors[0] ? "Введіть коректне число" : ""}
              onChange={(e) => handleChange(0, e.target.value)}
              fullWidth
              inputProps={{ step: "any" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Відповідь 2"
              type="number"
              value={inputs[1]}
              error={errors[1]}
              helperText={errors[1] ? "Введіть коректне число" : ""}
              onChange={(e) => handleChange(1, e.target.value)}
              fullWidth
              inputProps={{ step: "any" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

