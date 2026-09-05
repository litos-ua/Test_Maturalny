import { Box, Typography, TextField, Grid } from "@mui/material";
import type { Question } from "../../types/pages/testpages/types";
import { ZoomableImage } from "../../components";

interface Props {
  question: Question;
  savedAnswer: number[];
  onAnswer: (questionId: number, optionIds: number[]) => void;
}

export function QuestionOpenAnswer({ question, savedAnswer, onAnswer }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Зберігаємо текст відповіді як єдиний елемент масиву
    onAnswer(question.id, [Number(event.target.value)]);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
          {question.text.replace(/<br>/g, '\n')}
        </Typography>
        
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Введіть вашу відповідь"
          value={savedAnswer[0]?.toString() || ""}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
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