// import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
// import type { ChangeEvent } from "react";
// import type { Question } from "../../types/pages/testpages/types";

// interface Props {
//   question: Question;
//   savedAnswer: number[]; // массив выбранных вариантов
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// export function QuestionMultipleChoice({ question, savedAnswer, onAnswer }: Props) {

//   // обработчик выбора чекбоксов
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
//         <Typography variant="h6" gutterBottom>{question.text}</Typography>
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
//               label={opt.text}
//             />
//           ))}
//         </FormGroup>
//       </Grid>

//       {/* Правая часть – изображение */}
//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center", mt: { xs: 2, md: 0 } }}>
//             <img
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               style={{ maxWidth: "100%", height: "auto", maxHeight: 300, borderRadius: 8 }}
//             />
//           </Box>
//         </Grid>

//       )}
//     </Grid>
//   );
// }

// ✅ Используем ZoomableImage вместо Box component="img"

import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Question } from "../../types/pages/testpages/types";
import { ZoomableImage } from "../../components";

interface Props {
  question: Question;
  savedAnswer: number[];
  onAnswer: (questionId: number, optionIds: number[]) => void;
}

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
          {question.text.replace(/<br>/g, "\n")}
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
                opt.groupKey?.toLowerCase().startsWith("img") ||
                opt.groupKey?.toLowerCase().startsWith("image") ? (
                  <ZoomableImage
                    src={opt.text}
                    alt={`Option ${opt.text}`}
                    maxHeight={150}
                    maxWidth="100%"
                  />
                ) : (
                  opt.text
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


