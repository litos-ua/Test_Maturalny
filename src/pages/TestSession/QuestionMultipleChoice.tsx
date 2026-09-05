// // ✅ Используем ZoomableImage вместо Box component="img"

// import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
// import type { ChangeEvent } from "react";
// import type { Question } from "../../types/pages/testpages/types";
// import { ZoomableImage } from "../../components";

// interface Props {
//   question: Question;
//   savedAnswer: number[];
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// export function QuestionMultipleChoice({ question, savedAnswer, onAnswer }: Props) {

//   const handleChange = (event: ChangeEvent<HTMLInputElement>, optionId: number) => {
//     let updated: number[];

//     if (event.target.checked) {
//       updated = [...savedAnswer, optionId];
//     } else {
//       updated = savedAnswer.filter(id => id !== optionId);
//     }

//     onAnswer(question.id, updated);
//   };

//   return (
//     <Grid container spacing={2} alignItems="center">

//       {/* Левая часть – текст и варианты */}
//       <Grid size={{ xs: 12, md: 8 }}>

//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ whiteSpace: "pre-line" }}
//         >
//           {question.text.replace(/<br>/g, "\n")}
//         </Typography>

//         <FormGroup>
//           {question.options.map(opt => (
//             <FormControlLabel
//               key={opt.id}
//               control={
//                 <Checkbox
//                   checked={savedAnswer.includes(opt.id)}
//                   onChange={(e) => handleChange(e, opt.id)}
//                 />
//               }
//               label={
//                 opt.groupKey?.toLowerCase().startsWith("img") ||
//                 opt.groupKey?.toLowerCase().startsWith("image") ? (
//                   <ZoomableImage
//                     src={opt.text}
//                     alt={`Option ${opt.text}`}
//                     maxHeight={150}
//                     maxWidth="100%"
//                   />
//                 ) : (
//                   opt.text
//                 )
//               }
//             />
//           ))}
//         </FormGroup>
//       </Grid>

//       {/* Правая часть – изображение вопроса */}
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

// Подключение математических формул
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
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

// Функція парсингу тексту з роздільниками ``
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

export function QuestionMultipleChoice({ question, savedAnswer, onAnswer }: Props) {

  const handleChange = (event: ChangeEvent<HTMLInputElement>, optionId: number) => {
    let updated: number[];

    if (event.target.checked) {
      updated = [...savedAnswer, optionId];
    } else {
      updated = savedAnswer.filter(id => id !== optionId);
    }

    onAnswer(question.id, updated);
  };

  return (
    <Grid container spacing={2} alignItems="center">

      {/* Левая часть – текст и варианты */}
      <Grid size={{ xs: 12, md: 8 }}>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ whiteSpace: "pre-line" }}
        >
          {isLatex(question.text) ? (
            <MathFormula formula={question.text} />
          ) : (
            parseTextWithMath(question.text.replace(/<br>/g, "\n"))
          )}
        </Typography>

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
              label={
                isImage(opt.groupKey) ? (
                  <ZoomableImage
                    src={opt.text}
                    alt={`Option ${opt.text}`}
                    maxHeight={150}
                    maxWidth="100%"
                  />
                ) : isLatex(opt.text) ? (
                  <MathFormula formula={opt.text} />
                ) : (
                  parseTextWithMath(opt.text)
                )
              }
            />
          ))}
        </FormGroup>
      </Grid>

      {/* Правая часть – изображение вопроса */}
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


