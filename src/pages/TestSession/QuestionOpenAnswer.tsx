// import { Box, Typography, TextField, Grid } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { ZoomableImage } from "../../components";

// interface Props {
//   question: Question;
//   savedAnswer: number[];
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// export function QuestionOpenAnswer({ question, savedAnswer, onAnswer }: Props) {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Зберігаємо текст відповіді як єдиний елемент масиву
//     onAnswer(question.id, [Number(event.target.value)]);
//   };

//   return (
//     <Grid container spacing={2} alignItems="center">
//       <Grid size={{ xs: 12, md: 8 }}>
//         <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
//           {question.text.replace(/<br>/g, '\n')}
//         </Typography>
        
//         <TextField
//           fullWidth
//           multiline
//           rows={3}
//           variant="outlined"
//           label="Введіть вашу відповідь"
//           value={savedAnswer[0]?.toString() || ""}
//           onChange={handleChange}
//           sx={{ mt: 2 }}
//         />
//       </Grid>

//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center" }}>
//             <ZoomableImage
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               maxWidth="100%"
//             />
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// }


// Адаптированный компонент с поддержкой изображений
import { Box, Typography, TextField, Grid } from "@mui/material";
import type { Question } from "../../types/pages/testpages/types";
import { ZoomableImage, MathFormula } from "../../components";

interface Props {
  question: Question;
  savedAnswer: number[] | string[];
  onAnswer: (questionId: number, value: number[] | string[]) => void;
}

const isLatex = (text: string) => text.includes('$') || text.includes('\\(');

const parseTextWithMath = (text: string): React.ReactNode => {
  if (!text) return text;
  
  const parts = text.split(/`(.*?)`/g);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // Формула (между ` `)
      return <MathFormula key={index} formula={part} />;
    }
    // Обычный текст
    return part;
  });
};

export function QuestionOpenAnswer({ question, savedAnswer, onAnswer }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(question.id, [event.target.value]); // Сохраняем текст как массив строк или чисел.
  };

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
          {isLatex(question.text) ? (
            <MathFormula formula={question.text} />
          ) : (
            parseTextWithMath(question.text.replace(/<br>/g, '\n'))
          )}
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
          placeholder="Введіть число, формулу або коротку відповідь..."
        />
      </Grid>

      {question.imageUrl && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ textAlign: "center", mt: { xs: 2, md: 0 } }}>
            <ZoomableImage
              src={question.imageUrl}
              alt="Зображення до питання"
              maxWidth="100%"
              maxHeight={300}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}