// Подключение математических формул
// Адаптация к разним экранам и вывод масштабируемых изображений.

import { Box, RadioGroup, FormControlLabel, Radio, Typography, Grid } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Question } from "../../types/pages/testpages/types";
import { ZoomableImage, MathFormula } from "../../components";

interface Props {
  question: Question;
  savedAnswer: number[];
  onAnswer: (questionId: number, optionIds: number[]) => void; 
}

const isLatex = (text: string) => text.includes('$') || text.includes('\\(');
const isImage = (groupKey?: string) => groupKey?.toLowerCase().startsWith('img') || 
      groupKey?.toLowerCase().startsWith('image');

// 🔥 ЗАМІНІТЬ extractFormula на цю функцію
const parseTextWithMath = (text: string): React.ReactNode => {
  if (!text) return text;
  
  const parts = text.split(/`(.*?)`/g);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // Це формула (між ` `)
      return <MathFormula key={index} formula={part} />;
    }
    // Це звичайний текст
    return part;
  });
};

export function QuestionSingleChoice({ question, savedAnswer, onAnswer }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOptionId = Number(event.target.value);
    onAnswer(question.id, [selectedOptionId]);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
          {isLatex(question.text) ? (
            <MathFormula formula={question.text} />
          ) : (
            parseTextWithMath(question.text.replace(/<br>/g, '\n'))
          )}
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
              sx={{
                alignItems: "flex-start",
                mb: isImage(option.groupKey) ? 1.5 : 0.5,
              }}
              label={
                isImage(option.groupKey) ? (
                  <ZoomableImage src={option.text} alt="Option" maxHeight={150} />
                ) : isLatex(option.text) ? (
                  <MathFormula formula={option.text} />
                ) : (
                  parseTextWithMath(option.text)  // 🔥 ДЛЯ ОПЦІЙ ТЕЖ
                )
              }
            />
          ))}
        </RadioGroup>
      </Grid>

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