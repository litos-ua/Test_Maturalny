import { useEffect } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import type { Question } from "../../types/pages/testpages/types";

interface Props {
  question: Question;
  savedAnswer: number[];
  onAnswer: (questionId: number, optionIds: number[]) => void;
}

export function QuestionCorrectSequence({ question, savedAnswer, onAnswer }: Props) {
  const leftItems = question.options.map((item) => ({
    id: item.id,
    text: item.text,
  }));

  // ✅ Инициализация savedAnswer при первом рендере
  useEffect(() => {
    if (!savedAnswer || savedAnswer.length !== leftItems.length) {
      const initial = Array(leftItems.length).fill(undefined);
      onAnswer(question.id, initial);
    }
  }, [savedAnswer, leftItems.length, onAnswer, question.id]);

  const handleChange = (leftIndex: number, value: number) => {
    const updated = savedAnswer ? [...savedAnswer] : Array(leftItems.length).fill(undefined);
    updated[leftIndex] = value;
    onAnswer(question.id, updated);
  };






  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          {question.text}
        </Typography>

        <List>
            {leftItems.map((item, index) => (
                <ListItem
                key={item.id}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
                >
                {/* Текст события */}
                <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
                    <Typography variant="body1">
                    {String.fromCharCode(65 + index)}. {item.text}
                    </Typography>
                </Box>

                {/* Select для выбора позиции */}
                <FormControl
                    size="small"
                    sx={{
                    minWidth: "10vw",
                    ml: { xs: 0, sm: 1, md: 2, lg: 3 },
                    }}
                >
                    <InputLabel>Позиція</InputLabel>
                    <Select
                    label="Позиція"
                    value={
                        savedAnswer && savedAnswer[index] !== undefined && savedAnswer[index] !== null
                        ? savedAnswer[index]
                        : ""
                    }
                    onChange={(e) => handleChange(index, Number(e.target.value))}
                    >
                    {leftItems.map((_, num) => (
                        <MenuItem key={num + 1} value={num + 1}>
                        {num + 1}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </ListItem>
            ))}
        </List>

      </Grid>
    </Grid>
  );
}
