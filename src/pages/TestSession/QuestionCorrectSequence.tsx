// // ✅ Используем ZoomableImage вместо Box component="img"

// import { useEffect } from "react";
// import {
//   Grid,
//   Typography,
//   List,
//   ListItem,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
// } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { ZoomableImage } from "../../components";

// interface Props {
//   question: Question;
//   savedAnswer: number[];
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// export function QuestionCorrectSequence({ question, savedAnswer, onAnswer }: Props) {
//   const leftItems = question.options.map((item) => ({
//     id: item.id,
//     text: item.text,
//     groupKey: item.groupKey,
//   }));

//   useEffect(() => {
//     if (!savedAnswer || savedAnswer.length !== leftItems.length) {
//       const initial = Array(leftItems.length).fill(undefined);
//       onAnswer(question.id, initial);
//     }
//   }, [savedAnswer, leftItems.length, onAnswer, question.id]);

//   const handleChange = (leftIndex: number, value: number) => {
//     const updated =
//       savedAnswer && savedAnswer.length
//         ? [...savedAnswer]
//         : Array(leftItems.length).fill(undefined);

//     updated[leftIndex] = value;
//     onAnswer(question.id, updated);
//   };

//   return (
//     <Grid container spacing={1}>
//       <Grid size={{ xs: 12 }}>

//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ whiteSpace: "pre-line" }}
//         >
//           {question.text.replace(/<br>/g, "\n")}
//         </Typography>

//         {/* Если есть изображение вопроса */}
//         {question.imageUrl && (
//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <ZoomableImage
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               maxWidth="100%"
//               maxHeight={300}
//             />
//           </Box>
//         )}

//         <List>
//           {leftItems.map((item, index) => (
//             <ListItem
//               key={item.id}
//               sx={{
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: { xs: "stretch", sm: "center" },
//                 gap: 2,
//               }}
//             >
//               {/* Опция */}
//               <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
//                 {item.groupKey?.toLowerCase().startsWith("img") ||
//                 item.groupKey?.toLowerCase().startsWith("image") ? (
//                   <ZoomableImage
//                     src={item.text}
//                     alt={`Опція ${String.fromCharCode(65 + index)}`}
//                     maxHeight={150}
//                     maxWidth="100%"
//                   />
//                 ) : (
//                   <Typography variant="body1">
//                     {String.fromCharCode(65 + index)}. {item.text}
//                   </Typography>
//                 )}
//               </Box>

//               {/* Select */}
//               <FormControl
//                 size="small"
//                 sx={{
//                   minWidth: { xs: "100%", sm: "120px", md: "150px" },
//                   ml: { xs: 0, sm: 1, md: 2, lg: 3 },
//                 }}
//               >
//                 <InputLabel>Позиція</InputLabel>
//                 <Select
//                   label="Позиція"
//                   value={
//                     savedAnswer &&
//                     savedAnswer[index] !== undefined &&
//                     savedAnswer[index] !== null
//                       ? savedAnswer[index]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     handleChange(index, Number(e.target.value))
//                   }
//                 >
//                   {leftItems.map((_, num) => (
//                     <MenuItem key={num + 1} value={num + 1}>
//                       {num + 1}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </ListItem>
//           ))}
//         </List>
//       </Grid>
//     </Grid>
//   );
// }


// Адаптировано для работы с математическими формулами

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
import { ZoomableImage, MathFormula } from "../../components";
import { parseTextWithMath } from "../../utils";

interface Props {
  question: Question;
  savedAnswer: number[];
  onAnswer: (questionId: number, optionIds: number[]) => void;
}

// 🔥 НОВА ФУНКЦІЯ: перевірка на LaTeX
const isLatex = (text: string): boolean => {
  if (!text) return false;
  return text.includes('$') || text.includes('\\(') || text.includes('\\[');
};

// // НОВА ФУНКЦІЯ: парсинг тексту з математичними формулами
// const renderTextWithMath = (text: string): React.ReactNode => {
//   if (!text) return text;
  
//   // Якщо це LaTeX через MathFormula
//   if (isLatex(text)) {
//     return <MathFormula formula={text} />;
//   }
  
//   // Якщо є роздільники ` `, парсимо
//   if (text.includes('`')) {
//     const parts = text.split(/`(.*?)`/g);
//     return parts.map((part, idx) => {
//       if (idx % 2 === 1) {
//         return <MathFormula key={idx} formula={part} />;
//       }
//       return part;
//     });
//   }
  
//   return text;
// };

export function QuestionCorrectSequence({ question, savedAnswer, onAnswer }: Props) {
  const leftItems = question.options.map((item) => ({
    id: item.id,
    text: item.text,
    groupKey: item.groupKey,
  }));

  useEffect(() => {
    if (!savedAnswer || savedAnswer.length !== leftItems.length) {
      const initial = Array(leftItems.length).fill(undefined);
      onAnswer(question.id, initial);
    }
  }, [savedAnswer, leftItems.length, onAnswer, question.id]);

  const handleChange = (leftIndex: number, value: number) => {
    const updated =
      savedAnswer && savedAnswer.length
        ? [...savedAnswer]
        : Array(leftItems.length).fill(undefined);

    updated[leftIndex] = value;
    onAnswer(question.id, updated);
  };

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ whiteSpace: "pre-line" }}
        >
          {parseTextWithMath(question.text.replace(/<br>/g, "\n"))}
        </Typography>

        {/* Если есть изображение вопроса */}
        {question.imageUrl && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <ZoomableImage
              src={question.imageUrl}
              alt="Зображення до питання"
              maxWidth="100%"
              maxHeight={300}
            />
          </Box>
        )}

        <List>
          {leftItems.map((item, index) => (
            <ListItem
              key={item.id}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: 2,
              }}
            >
              {/* Опция */}
              <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
                {item.groupKey?.toLowerCase().startsWith("img") ||
                item.groupKey?.toLowerCase().startsWith("image") ? (
                  <ZoomableImage
                    src={item.text}
                    alt={`Опція ${String.fromCharCode(65 + index)}`}
                    maxHeight={150}
                    maxWidth="100%"
                  />
                ) : (
                  <Typography variant="body1">
                    {String.fromCharCode(65 + index)}. {parseTextWithMath(item.text)}
                  </Typography>
                )}
              </Box>

              {/* Select */}
              <FormControl
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: "120px", md: "150px" },
                  ml: { xs: 0, sm: 1, md: 2, lg: 3 },
                }}
              >
                <InputLabel>Позиція</InputLabel>
                <Select
                  label="Позиція"
                  value={
                    savedAnswer &&
                    savedAnswer[index] !== undefined &&
                    savedAnswer[index] !== null
                      ? savedAnswer[index]
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(index, Number(e.target.value))
                  }
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