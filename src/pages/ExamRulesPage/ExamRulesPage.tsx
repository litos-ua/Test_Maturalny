import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {text} from "../../constants"

// Описываем структуру вопроса
interface QuestionType {
  type: string;
  title: string;
  short: string;
  details: string;
}

const questionTypes: QuestionType[] = [
  {
    type: "SingleChoice",
    title: "Простий вибір з опцій",
    short: "Виберіть одну правильну відповідь із запропонованих варіантів.",
    details: `
      Оцінювання:
      - За повністю правильну відповідь: +1 бал.
      - за неправильну або відсутність відповіді: 0 балів.
      - Часткового балу не передбачено.
    `
  },
  {
    type: "DoubleChoice",
    title: "Відповідь з подвійним значенням",
    short: "Виберіть дві правильні відповіді із запропонованих.",
    details: `
      Оцінювання:
      - +1 бал — якщо обидві відповіді вибрано правильно.
      - 0 балів — якщо хоча б одна відповідь неправильна або відсутня.
    `
  },
  {
    type: "MultiChoice",
    title: "Выбор нескольких опций",
    short: "Выберите несколько правильных ответов (от 3 и более).",
    details: `
      Оцінювання:
      - За кожну правильну відповідь: +1 бал. 
      - За кожну неправильну обрану відповідь: -1 бал. 
      - Підсумкова кількість балів за питання не може бути меншою за 0.
    `
  },
  {
    type: "CorrectSequence",
    title: "Питання на послідовність",
    short: "Розташуйте елементи у правильному порядку.",
    details: `
      Оцінювання:
      - Максимум балів: кількість елементів – 1. 
      - +1 бал за кожну пару сусідніх елементів, які розташовані правильно. 
      - 0 балів, якщо жодна пара не збігається із правильною послідовністю.
    `
  },
  {
    type: "Matching",
    title: "Питання на зіставлення",
    short: "З'єднайте елементи з двох колонок у правильні пари.",
    details: `
      Оцінювання:
      - +1 бал за кожну правильно складену пару. 
      - 0 балів за неправильні пари. 
      - Підсумкова кількість балів – сума за всі правильні пари.
    `
  }
];

export function ExamRulesPage() {
  const [open, setOpen] = useState(false);
  const [activeType, setActiveType] = useState<QuestionType | null>(null);

  const handleOpen = (type: QuestionType) => {
    setActiveType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveType(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Правила проведения ЗНО / НМТ
      </Typography>

      <Typography variant="body1" mb={2}>
        {text.examRules?.[0]}
      </Typography>

      <Typography variant="body1" mb={4}>
        {text.examRules?.[1]}
      </Typography>

      <Grid container spacing={2}>
        {questionTypes.map((q) => (
          <Grid size={{xs:12, sm:6, md:4}}  key={q.type}>
            <Card>
              <CardContent>
                <Typography variant="h6">{q.title}</Typography>
                <Typography variant="body2" mb={2}>
                  {q.short}
                </Typography>
                <Button variant="outlined" onClick={() => handleOpen(q)}>
                  Подробнее об оценивании
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {activeType?.title} — Правила оценивания
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" whiteSpace="pre-line">
            {activeType?.details}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
