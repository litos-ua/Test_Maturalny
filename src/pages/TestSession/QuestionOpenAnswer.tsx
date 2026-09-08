// Адаптированный компонент с поддержкой изображений
// import { Box, Typography, TextField, Grid } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { ZoomableImage, MathFormula } from "../../components";

// interface Props {
//   question: Question;
//   savedAnswer: number[] | string[];
//   onAnswer: (questionId: number, value: number[] | string[]) => void;
// }

// const isLatex = (text: string) => text.includes('$') || text.includes('\\(');

// const parseTextWithMath = (text: string): React.ReactNode => {
//   if (!text) return text;
  
//   const parts = text.split(/`(.*?)`/g);
  
//   return parts.map((part, index) => {
//     if (index % 2 === 1) {
//       // Формула (между ` `)
//       return <MathFormula key={index} formula={part} />;
//     }
//     // Обычный текст
//     return part;
//   });
// };

// export function QuestionOpenAnswer({ question, savedAnswer, onAnswer }: Props) {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onAnswer(question.id, [event.target.value]); // Сохраняем текст как массив строк или чисел.
//   };

//   return (
//     <Grid container spacing={2} alignItems="flex-start">
//       <Grid size={{ xs: 12, md: 8 }}>
//         <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
//           {isLatex(question.text) ? (
//             <MathFormula formula={question.text} />
//           ) : (
//             parseTextWithMath(question.text.replace(/<br>/g, '\n'))
//           )}
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
//           placeholder="Введіть число, формулу або коротку відповідь..."
//         />
//       </Grid>

//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center", mt: { xs: 2, md: 0 } }}>
//             <ZoomableImage
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               maxWidth="100%"
//               maxHeight={300}
//             />
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// }


// // Работают один и два блока, при попытке нечисловоговвода ранее набранное сбрасывается.
// import { Box, Typography, TextField, Grid } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { ZoomableImage, MathFormula } from "../../components";

// interface Props {
//   question: Question;
//   savedAnswer: number[] | string[];
//   onAnswer: (questionId: number, value: number[]) => void;  // ← тільки number[]
// }

// const isLatex = (text: string) => text.includes('$') || text.includes('\\(');

// const parseTextWithMath = (text: string): React.ReactNode => {
//   if (!text) return text;
  
//   const parts = text.split(/`(.*?)`/g);
  
//   return parts.map((part, index) => {
//     if (index % 2 === 1) {
//       return <MathFormula key={index} formula={part} />;
//     }
//     return part;
//   });
// };

// export function QuestionOpenAnswer({ question, savedAnswer, onAnswer }: Props) {
//   // Кількість відповідей = кількість правильних опцій
//   const correctOptions = question.options.filter(o => o.isCorrect === true);
//   const answerCount = correctOptions.length;

//   const handleChange = (index: number, value: string) => {
//     console.log('🔍 [handleChange] Введено:', value);
    
//     // ✅ ЗБЕРІГАЄМО РЯДОК, а не число!
//     const updated = Array.isArray(savedAnswer) ? [...savedAnswer] : [];
//     updated[index] = value;  // ← зберігаємо як рядок
//     onAnswer(question.id, updated as any);
//   };

//   // 🔑 Отримуємо значення для відображення
//   const answersArray = Array.isArray(savedAnswer) 
//     ? savedAnswer.map(v => isNaN(Number(v)) ? "" : String(v))
//     : [];

//   return (
//     <Grid container spacing={2} alignItems="flex-start">
//       <Grid size={{ xs: 12, md: 8 }}>
//         <Typography variant="h6" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
//           {isLatex(question.text) ? (
//             <MathFormula formula={question.text} />
//           ) : (
//             parseTextWithMath(question.text.replace(/<br>/g, '\n'))
//           )}
//         </Typography>
        
//         {Array.from({ length: answerCount }).map((_, index) => (
//           <TextField
//             key={index}
//             fullWidth
//             multiline
//             rows={1}
//             variant="outlined"
//             label={answerCount > 1 ? `Відповідь ${index + 1}` : "Введіть вашу відповідь"}
//             value={answersArray[index] || ""}
//             onChange={(e) => handleChange(index, e.target.value)}
//             sx={{ mt: index === 0 ? 2 : 1 }}
//             placeholder="Введіть число..."
//           />
//         ))}
//       </Grid>

//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center", mt: { xs: 2, md: 0 } }}>
//             <ZoomableImage
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               maxWidth="100%"
//               maxHeight={300}
//             />
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// }

// Нормально валидирует ввод нецифровых символов и второй точки.
import { Box, Typography, TextField, Grid, Alert } from "@mui/material";
import type { Question } from "../../types/pages/testpages/types";
import { ZoomableImage, MathFormula } from "../../components";
import { useState } from "react";

interface Props {
  question: Question;
  savedAnswer: number[] | string[];
  onAnswer: (questionId: number, value: number[]) => void;
}

const isLatex = (text: string) => text.includes('$') || text.includes('\\(');

const parseTextWithMath = (text: string): React.ReactNode => {
  if (!text) return text;
  
  const parts = text.split(/`(.*?)`/g);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <MathFormula key={index} formula={part} />;
    }
    return part;
  });
};

export function QuestionOpenAnswer({ question, savedAnswer, onAnswer }: Props) {
  // Кількість відповідей = кількість правильних опцій
  const correctOptions = question.options.filter(o => o.isCorrect === true);
  const answerCount = correctOptions.length;
  
  // Стан для помилок
  const [errorMessages, setErrorMessages] = useState<Record<number, string>>({});

  const handleChange = (index: number, value: string) => {
    console.log('🔍 [handleChange] Введено:', value);
    
    // Очищаємо помилку для цього поля
    setErrorMessages(prev => ({ ...prev, [index]: '' }));
    
    // Якщо введено некоректний символ - показуємо помилку, але НЕ скидаємо!
    // Перевіряємо, чи можна перетворити на число (дозволяємо крапку)
    const isNumeric = /^[0-9]*\.?[0-9]*$/.test(value);
    
    if (value !== '' && !isNumeric) {
      setErrorMessages(prev => ({ 
        ...prev, 
        [index]: 'Будь ласка, вводьте лише цифри та крапку (.)' 
      }));
      // ❌ НЕ зберігаємо некоректне значення
      return;
    }
    
    // Перевіряємо, чи не більше однієї крапки
    if (value.includes('.') && value.indexOf('.') !== value.lastIndexOf('.')) {
      setErrorMessages(prev => ({ 
        ...prev, 
        [index]: 'Будь ласка, вводьте лише одну крапку (.)' 
      }));
      return;
    }

    // ✅ ЗБЕРІГАЄМО РЯДОК, а не число!
    const updated = Array.isArray(savedAnswer) ? [...savedAnswer] : [];
    updated[index] = value;  // ← зберігаємо як рядок
    onAnswer(question.id, updated as any);
  };

  // 🔑 Отримуємо значення для відображення
  const answersArray = Array.isArray(savedAnswer) 
    ? savedAnswer.map(v => isNaN(Number(v)) ? "" : String(v))
    : [];

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
        
        {Array.from({ length: answerCount }).map((_, index) => (
          <Box key={index} sx={{ mt: index === 0 ? 2 : 1 }}>
            <TextField
              fullWidth
              multiline
              rows={1}
              variant="outlined"
              label={answerCount > 1 ? `Відповідь ${index + 1}` : "Введіть вашу відповідь"}
              value={answersArray[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              error={!!errorMessages[index]}
              placeholder="Введіть число..."
            />
            {errorMessages[index] && (
              <Alert severity="error" sx={{ mt: 1 }} onClose={() => setErrorMessages(prev => ({ ...prev, [index]: '' }))}>
                {errorMessages[index]}
              </Alert>
            )}
          </Box>
        ))}
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