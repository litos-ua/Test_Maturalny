// // С сервера идет попарное перемешивание (не вразброс) 
// import { useState, useMemo, useEffect } from "react";
// import { Grid, Typography, List, ListItem, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { shuffleArray } from "../../utils/shuffleArray";

// interface Props {
//   question: Question;
//   savedAnswer: number[];
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// export function QuestionMatching({ question, savedAnswer, onAnswer }: Props) {
//   const leftItems = question.options.map((item) => ({
//     id: item.id,
//     text: item.text,
//   }));

//   // const [shuffledRightItems] = useState(() =>
//   //   shuffleArray(
//   //     question.options
//   //       .filter((o) => o.matchLabel !== null && o.matchLabel !== undefined)
//   //       .map((item) => ({
//   //         id: item.id,
//   //         matchLabel: item.matchLabel,
//   //       }))
//   //   )
//   // );

//   const [shuffledRightItems] = useState(() =>
//     question.options
//       .filter((o) => o.matchLabel !== null && o.matchLabel !== undefined)
//       .map((item) => ({
//         id: item.id,
//         matchLabel: item.matchLabel,
//       }))
//   );



//   const advancedRightlabels = generateLabels(leftItems.length, shuffledRightItems.length);

//   function generateLabels(count: number, rightCount: number): string[] {
//     const labels: string[] = [];
//     const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     for (let i = 0; i < count; i++) {
//       if (i < rightCount) {
//         labels.push(base[i]);
//       } else {
//         labels.push("X" + (i - rightCount + 1));
//       }
//     }
//     return labels;
//   }

//   // Инициализация savedAnswer при первом рендере
//   useEffect(() => {
//   if (!savedAnswer || savedAnswer.length !== leftItems.length) {
//     const initial = Array(leftItems.length).fill(undefined);

//     // Добавляем проверку: не вызываем onAnswer если initial не полностью заполнен
//     const allSelected = initial.every(
//       (val) => val !== undefined  && val !== null // && val !== -1
//     );

//     if (allSelected) {
//       onAnswer(question.id, initial);
//     }
//   }
// }, [savedAnswer, leftItems.length, onAnswer, question.id]);



//     const handleChange = (leftIndex: number, rightId: string | number) => {
//       const updated = savedAnswer ? [...savedAnswer] : Array(leftItems.length).fill(undefined);
//       updated[leftIndex] = Number(rightId);
//       onAnswer(question.id, updated);  
//     };

//   return (
//     <Grid container spacing={2} alignItems="flex-start">
//       {/* Левая колонка — вопросы */}
//       <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 7 }}>
//         <Typography variant="h6" gutterBottom>
//           {question.text}
//         </Typography>

//           <List>
//             {leftItems.map((item, index) => (
//               <ListItem
//                 key={item.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start", // <-- выравниваем по верхнему краю
//                   gap: 2,
//                 }}
//               >
//                 {/* Текст вопроса */}
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="body1">
//                     {index + 1}. {item.text}
//                   </Typography>
//                 </Box>

//                 {/* Блок выбора */}
//                 <FormControl
//                   size="small"
//                   sx={{
//                     minWidth: { xs: "40vw", sm: "20vw", md: "10vw" },
//                     flexShrink: 0, // фиксируем ширину
//                   }}
//                 >
//                   <InputLabel>Вибір</InputLabel>
//                   <Select
//                     label="Вибір"
//                     value={typeof savedAnswer?.[index] === "number" ? savedAnswer[index] : 0}
//                     onChange={(e) => handleChange(index, Number(e.target.value))}
//                     displayEmpty
//                   >
//                     <MenuItem value={0}>
//                       <em>Не вибрано</em>
//                     </MenuItem>

//                     {shuffledRightItems.map((item, i) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {advancedRightlabels[i]}
//                       </MenuItem>
//                     ))}

//                     <MenuItem key="X1" value={-1}>
//                       X1
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </ListItem>
//             ))}
//           </List>


//       </Grid>

//       {/* Правая колонка — варианты */}
//       <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 5 }}>
//         <Typography variant="h6" gutterBottom>
//           Варіанти
//         </Typography>

//         <List>
//           {shuffledRightItems.map((item, index) => (
//             <ListItem
//               key={item.id}
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Typography variant="body1">
//                 {String.fromCharCode(65 + index)}.
//               </Typography>

//               {item.matchLabel &&
//               (item.matchLabel.includes("images") ||
//                 item.matchLabel.endsWith(".jpg") ||
//                 item.matchLabel.endsWith(".png")) ? (
//                 <Box
//                   component="img"
//                   src={item.matchLabel}
//                   alt={`Option ${index}`}
//                   sx={{
//                     maxWidth: { xs: "60vw", sm: "40vw", md: "20vw" },
//                     maxHeight: { xs: "30vh", md: "15vh" },
//                   }}
//                 />
//               ) : (
//                 <Typography variant="body1">{item.matchLabel}</Typography>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Grid>

//       {/* Картинка */}
//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center", my: { xs: 2, md: 0 } }}>
//             <img
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               style={{
//                 maxWidth: "100%",
//                 height: "auto",
//                 borderRadius: 8,
//               }}
//             />
//           </Box>
//         </Grid>
//       )}
//     </Grid>

// );
// }









// // С сервера идет попарное перемешивание (не вразброс) 
// import { useState, useMemo, useEffect } from "react";
// import { Grid, Typography, List, ListItem, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { shuffleArray } from "../../utils/shuffleArray";

// interface Props {
//   question: Question;
//   savedAnswer: number[];
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// interface RightItem {
//   id: number;
//   matchLabel?: string;
// }

// export function QuestionMatching({ question, savedAnswer, onAnswer }: Props) {
//   const leftItems = question.options.map((item) => ({
//     id: item.id,
//     text: item.text,
//   }));

//   // функция загрузки/сохранения в sessionStorage
//   const getOrCreateShuffled = () => {
//     const key = `question-${question.id}-rightItems`;
//     const cached = sessionStorage.getItem(key);

//     if (cached) {
//       return JSON.parse(cached);
//     }

//     // формируем список справа
//     const items = question.options
//       .filter((o) => o.matchLabel !== null && o.matchLabel !== undefined)
//       .map((item) => ({
//         id: item.id,
//         matchLabel: item.matchLabel,
//       }));

//     // перемешиваем только при первом обращении
//     const shuffled = shuffleArray(items);

//     // сохраняем в sessionStorage
//     sessionStorage.setItem(key, JSON.stringify(shuffled));

//     return shuffled;
//   };

//   const [shuffledRightItems] = useState<RightItem[]>(getOrCreateShuffled);



//   const advancedRightlabels = generateLabels(leftItems.length, shuffledRightItems.length);

//   function generateLabels(count: number, rightCount: number): string[] {
//     const labels: string[] = [];
//     const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     for (let i = 0; i < count; i++) {
//       if (i < rightCount) {
//         labels.push(base[i]);
//       } else {
//         labels.push("X" + (i - rightCount + 1));
//       }
//     }
//     return labels;
//   }

//   // Инициализация savedAnswer при первом рендере
//   useEffect(() => {
//   if (!savedAnswer || savedAnswer.length !== leftItems.length) {
//     const initial = Array(leftItems.length).fill(undefined);

//     // Добавляем проверку: не вызываем onAnswer если initial не полностью заполнен
//     const allSelected = initial.every(
//       (val) => val !== undefined  && val !== null // && val !== -1
//     );

//     if (allSelected) {
//       onAnswer(question.id, initial);
//     }
//   }
// }, [savedAnswer, leftItems.length, onAnswer, question.id]);



//     const handleChange = (leftIndex: number, rightId: string | number) => {
//       const updated = savedAnswer ? [...savedAnswer] : Array(leftItems.length).fill(undefined);
//       updated[leftIndex] = Number(rightId);
//       onAnswer(question.id, updated);  
//     };

//   return (
//     <Grid container spacing={2} alignItems="flex-start">
//       {/* Левая колонка — вопросы */}
//       <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 7 }}>
//         <Typography variant="h6" gutterBottom>
//           {question.text}
//         </Typography>

//           <List>
//             {leftItems.map((item, index) => (
//               <ListItem
//                 key={item.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start", // <-- выравниваем по верхнему краю
//                   gap: 2,
//                 }}
//               >
//                 {/* Текст вопроса */}
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="body1">
//                     {index + 1}. {item.text}
//                   </Typography>
//                 </Box>

//                 {/* Блок выбора */}
//                 <FormControl
//                   size="small"
//                   sx={{
//                     minWidth: { xs: "40vw", sm: "20vw", md: "10vw" },
//                     flexShrink: 0, // фиксируем ширину
//                   }}
//                 >
//                   <InputLabel>Вибір</InputLabel>
//                   <Select
//                     label="Вибір"
//                     value={typeof savedAnswer?.[index] === "number" ? savedAnswer[index] : 0}
//                     onChange={(e) => handleChange(index, Number(e.target.value))}
//                     displayEmpty
//                   >
//                     <MenuItem value={0}>
//                       <em>Не вибрано</em>
//                     </MenuItem>

//                     {shuffledRightItems.map((item, i) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {advancedRightlabels[i]}
//                       </MenuItem>
//                     ))}

//                     <MenuItem key="X1" value={-1}>
//                       X1
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </ListItem>
//             ))}
//           </List>


//       </Grid>

//       {/* Правая колонка — варианты */}
//       <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 5 }}>
//         <Typography variant="h6" gutterBottom>
//           Варіанти
//         </Typography>

//         <List>
//           {shuffledRightItems.map((item, index) => (
//             <ListItem
//               key={item.id}
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Typography variant="body1">
//                 {String.fromCharCode(65 + index)}.
//               </Typography>

//               {item.matchLabel &&
//               (item.matchLabel.includes("images") ||
//                 item.matchLabel.endsWith(".jpg") ||
//                 item.matchLabel.endsWith(".png")) ? (
//                 <Box
//                   component="img"
//                   src={item.matchLabel}
//                   alt={`Option ${index}`}
//                   sx={{
//                     maxWidth: { xs: "60vw", sm: "40vw", md: "20vw" },
//                     maxHeight: { xs: "30vh", md: "15vh" },
//                   }}
//                 />
//               ) : (
//                 <Typography variant="body1">{item.matchLabel}</Typography>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Grid>

//       {/* Картинка */}
//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center", my: { xs: 2, md: 0 } }}>
//             <img
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               style={{
//                 maxWidth: "100%",
//                 height: "auto",
//                 borderRadius: 8,
//               }}
//             />
//           </Box>
//         </Grid>
//       )}
//     </Grid>

// );
// }








// // ✅ Используем ZoomableImage вместо Box component="img"

// // С сервера идет попарное перемешивание (не вразброс) 
// import { useState, useEffect } from "react";
// import { Grid, Typography, List, ListItem, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
// import type { Question } from "../../types/pages/testpages/types";
// import { shuffleArray } from "../../utils/shuffleArray";
// import { ZoomableImage } from "../../components";

// interface Props {
//   question: Question;
//   savedAnswer: number[];
//   onAnswer: (questionId: number, optionIds: number[]) => void;
// }

// interface RightItem {
//   id: number;
//   matchLabel?: string;
// }

// export function QuestionMatching({ question, savedAnswer, onAnswer }: Props) {
//   const leftItems = question.options.map((item) => ({
//     id: item.id,
//     text: item.text,
//   }));

//   // функция загрузки/сохранения в sessionStorage
//   const getOrCreateShuffled = () => {
//     const key = `question-${question.id}-rightItems`;
//     const cached = sessionStorage.getItem(key);

//     if (cached) {
//       return JSON.parse(cached);
//     }

//     // формируем список справа
//     const items = question.options
//       .filter((o) => o.matchLabel !== null && o.matchLabel !== undefined)
//       .map((item) => ({
//         id: item.id,
//         matchLabel: item.matchLabel,
//       }));

//     // перемешиваем только при первом обращении
//     const shuffled = shuffleArray(items);

//     // сохраняем в sessionStorage
//     sessionStorage.setItem(key, JSON.stringify(shuffled));

//     return shuffled;
//   };

//   const [shuffledRightItems] = useState<RightItem[]>(getOrCreateShuffled);



//   const advancedRightlabels = generateLabels(leftItems.length, shuffledRightItems.length);

//   function generateLabels(count: number, rightCount: number): string[] {
//     const labels: string[] = [];
//     const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     for (let i = 0; i < count; i++) {
//       if (i < rightCount) {
//         labels.push(base[i]);
//       } else {
//         labels.push("X" + (i - rightCount + 1));
//       }
//     }
//     return labels;
//   }

//   // Инициализация savedAnswer при первом рендере
//   useEffect(() => {
//   if (!savedAnswer || savedAnswer.length !== leftItems.length) {
//     const initial = Array(leftItems.length).fill(undefined);

//     // Добавляем проверку: не вызываем onAnswer если initial не полностью заполнен
//     const allSelected = initial.every(
//       (val) => val !== undefined  && val !== null // && val !== -1
//     );

//     if (allSelected) {
//       onAnswer(question.id, initial);
//     }
//   }
// }, [savedAnswer, leftItems.length, onAnswer, question.id]);



//     const handleChange = (leftIndex: number, rightId: string | number) => {
//       const updated = savedAnswer ? [...savedAnswer] : Array(leftItems.length).fill(undefined);
//       updated[leftIndex] = Number(rightId);
//       onAnswer(question.id, updated);  
//     };

//   return (
//     <Grid container spacing={2} alignItems="flex-start">
//       {/* Левая колонка — вопросы */}
//       <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 7 }}>
//         <Typography variant="h6" gutterBottom>
//           {question.text}
//         </Typography>

//           <List>
//             {leftItems.map((item, index) => (
//               <ListItem
//                 key={item.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start", // <-- выравниваем по верхнему краю
//                   gap: 2,
//                 }}
//               >
//                 {/* Текст вопроса с возможностью вывода имеджей*/}
//                 <Box sx={{ flexGrow: 1 }}>
//                   {item.text &&
//                   (item.text.includes("images") ||
//                     item.text.endsWith(".jpg") ||
//                     item.text.endsWith(".png")) ? (
//                     <ZoomableImage
//                       src={item.text}
//                       alt={`Left ${index + 1}`}
//                       maxWidth="100%"
//                       maxHeight={150}
//                     />
//                   ) : (
//                     <Typography variant="body1">
//                       {index + 1}. {item.text}
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Блок выбора */}
//                 <FormControl
//                   size="small"
//                   sx={{
//                     minWidth: { xs: "40vw", sm: "20vw", md: "10vw" },
//                     flexShrink: 0, // фиксируем ширину
//                   }}
//                 >
//                   <InputLabel>Вибір</InputLabel>
//                   <Select
//                     label="Вибір"
//                     value={typeof savedAnswer?.[index] === "number" ? savedAnswer[index] : 0}
//                     onChange={(e) => handleChange(index, Number(e.target.value))}
//                     displayEmpty
//                   >
//                     <MenuItem value={0}>
//                       <em>Не вибрано</em>
//                     </MenuItem>

//                     {shuffledRightItems.map((item, i) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {advancedRightlabels[i]}
//                       </MenuItem>
//                     ))}

//                     <MenuItem key="X1" value={-1}>
//                       X1
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </ListItem>
//             ))}
//           </List>


//       </Grid>

//       {/* Правая колонка — варианты */}
//       <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 5 }}>
//         <Typography variant="h6" gutterBottom>
//           Варіанти
//         </Typography>

//         <List>
//           {shuffledRightItems.map((item, index) => (
//             <ListItem
//               key={item.id}
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Typography variant="body1">
//                 {String.fromCharCode(65 + index)}.
//               </Typography>

//               {item.matchLabel &&
//               (item.matchLabel.includes("images") ||
//                 item.matchLabel.endsWith(".jpg") ||
//                 item.matchLabel.endsWith(".png")) ? (
//                 <ZoomableImage
//                   src={item.matchLabel}
//                   alt={`Option ${index}`}
//                   sx={{
//                     maxWidth: { xs: "60vw", sm: "40vw", md: "20vw" },
//                     maxHeight: { xs: "30vh", md: "15vh" },
//                   }}
//                 />
//               ) : (
//                 <Typography variant="body1">{item.matchLabel}</Typography>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Grid>

//       {/* Картинка */}
//       {question.imageUrl && (
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Box sx={{ textAlign: "center", my: { xs: 2, md: 0 } }}>
//             <ZoomableImage
//               src={question.imageUrl}
//               alt="Зображення до питання"
//               maxWidth="100%"
//               maxHeight={400}
//             />
//           </Box>
//         </Grid>
//       )}
//     </Grid>

// );
// }




import { useState, useEffect, useMemo, useCallback } from "react";
import { Grid, Typography, List, ListItem, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import type { Question } from "../../types/pages/testpages/types";
import { shuffleArray } from "../../utils/shuffleArray";
import { ZoomableImage } from "../../components";

interface Props {
  question: Question;
  savedAnswer: number[];
  onAnswer: (questionId: number, optionIds: number[]) => void;
}

interface RightItem {
  id: number;
  matchLabel?: string;
}

// ========== 🔥 ЦВЕТА ДЛЯ СОПОСТАВЛЕННЫХ ПАР ==========
const MATCHING_COLORS = {
  1: "#FF9800", // оранжевый
  2: "#2196F3", // синий
  3: "#4CAF50", // зеленый
  4: "#f44336", // темно-красный
  5: "#9C27B0", // фиолетовый (на случай если больше 4)
  6: "#009688", // бирюзовый
} as const;

// Получить цвет по индексу пары (1-индексация для удобства)
const getColorByPairIndex = (pairIndex: number): string => {
  return MATCHING_COLORS[pairIndex as keyof typeof MATCHING_COLORS] || "#757575";
};
// ========== КОНЕЦ ЦВЕТОВ ==========

// Функция для проверки изображений
const isImageUrl = (url?: string): boolean => {
  if (!url) return false;
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;
  const imagePaths = /\/images\//i;
  return (
    imageExtensions.test(url) ||
    imagePaths.test(url) ||
    url.includes("images")
  );
};

export function QuestionMatching({ question, savedAnswer, onAnswer }: Props) {
  const leftItems = useMemo(() => 
    question.options.map((item) => ({
      id: item.id,
      text: item.text,
    })),
    [question.options]
  );

  const getOrCreateShuffled = useCallback(() => {
    const key = `question-${question.id}-rightItems`;
    const cached = sessionStorage.getItem(key);

    if (cached) {
      return JSON.parse(cached);
    }

    const items = question.options
      .filter((o) => o.matchLabel !== null && o.matchLabel !== undefined)
      .map((item) => ({
        id: item.id,
        matchLabel: item.matchLabel,
      }));

    const shuffled = shuffleArray(items);
    sessionStorage.setItem(key, JSON.stringify(shuffled));
    return shuffled;
  }, [question.id, question.options]);

  const [shuffledRightItems] = useState<RightItem[]>(getOrCreateShuffled);

  const advancedRightLabels = useMemo(() => {
    const labels: string[] = [];
    const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const leftCount = leftItems.length;
    const rightCount = shuffledRightItems.length;
    
    for (let i = 0; i < leftCount; i++) {
      if (i < rightCount) {
        labels.push(base[i]);
      } else {
        labels.push(`X${i - rightCount + 1}`);
      }
    }
    return labels;
  }, [leftItems.length, shuffledRightItems.length]);

  // ========== 🔥 ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЦВЕТА ВЫБРАННОЙ ПАРЫ ==========
  const getSelectedPairColor = useCallback((leftIndex: number): string | null => {
    const selectedRightId = savedAnswer?.[leftIndex];
    if (!selectedRightId || selectedRightId === 0 || selectedRightId === -1) return null;
    
    // Находим индекс выбранного варианта в shuffledRightItems
    const rightIndex = shuffledRightItems.findIndex(item => item.id === selectedRightId);
    if (rightIndex === -1) return null;
    
    // Цвет определяется по номеру пары (1-индексация для наглядности)
    return getColorByPairIndex(rightIndex + 1);
  }, [savedAnswer, shuffledRightItems]);
  // ========== КОНЕЦ ФУНКЦИИ ==========

  useEffect(() => {
    if (!savedAnswer || savedAnswer.length !== leftItems.length) {
      const initial = Array(leftItems.length).fill(undefined);
      if (initial.every((val) => val !== undefined && val !== null)) {
        onAnswer(question.id, initial);
      }
    }
  }, [savedAnswer, leftItems.length, onAnswer, question.id]);

  const handleChange = useCallback((leftIndex: number, rightId: string | number) => {
    const updated = savedAnswer ? [...savedAnswer] : Array(leftItems.length).fill(undefined);
    updated[leftIndex] = Number(rightId);
    onAnswer(question.id, updated);
  }, [savedAnswer, leftItems.length, onAnswer, question.id]);

  return (
    <Grid container spacing={2} alignItems="flex-start">
      {/* Левая колонка — вопросы */}
      <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 7 }}>
        <Typography variant="h6" gutterBottom sx={{ whiteSpace: "pre-line" }}>
          {question.text.replace(/<br\s*\/?>/g, "\n")}
        </Typography>

        <List>
          {leftItems.map((item, index) => {
            const pairColor = getSelectedPairColor(index);
            const isSelected = pairColor !== null;
            
            return (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  px: { xs: 1, sm: 2 },
                  // ========== 🔥 ПОДСВЕТКА ВЫБРАННОЙ ПАРЫ ==========
                  ...(isSelected && !isImageUrl(item.text) && {
                    backgroundColor: `${pairColor}15`, // 15 = 9% прозрачности
                    borderRadius: 1,
                    transition: "background-color 0.2s ease",
                  }),
                }}
              >
                {/* Текст вопроса с возможностью вывода изображений */}
                <Box sx={{ flexGrow: 1 }}>
                  {isImageUrl(item.text) ? (
                    <ZoomableImage
                      src={item.text}
                      alt={`Left ${index + 1}`}
                      maxWidth="100%"
                      maxHeight={150}
                    />
                  ) : (
                    <Typography 
                      variant="body1"
                      // ========== 🔥 ЦВЕТ ТЕКСТА ДЛЯ ВЫБРАННОЙ ПАРЫ ==========
                      sx={{
                        ...(isSelected && {
                          color: pairColor,
                          fontWeight: 500,
                        }),
                      }}
                    >
                      {index + 1}. {item.text}
                    </Typography>
                  )}
                </Box>

                {/* Блок выбора */}
                <FormControl
                  size="small"
                  sx={{
                    minWidth: { xs: "40vw", sm: "20vw", md: "10vw" },
                    flexShrink: 0,
                  }}
                >
                  <InputLabel>Вибір</InputLabel>
                  <Select
                    label="Вибір"
                    value={typeof savedAnswer?.[index] === "number" ? savedAnswer[index] : 0}
                    onChange={(e) => handleChange(index, Number(e.target.value))}
                    displayEmpty
                    // ========== 🔥 ЦВЕТОВАЯ ИНДИКАЦИЯ В SELECT ==========
                    sx={{
                      ...(isSelected && {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: pairColor,
                          borderWidth: 2,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: pairColor,
                        },
                      }),
                    }}
                  >
                    <MenuItem value={0}>
                      <em>Не вибрано</em>
                    </MenuItem>

                    {shuffledRightItems.map((rightItem, i) => {
                      const isThisSelected = savedAnswer?.[index] === rightItem.id;
                      const rightPairColor = getColorByPairIndex(i + 1);
                      
                      return (
                        <MenuItem 
                          key={rightItem.id} 
                          value={rightItem.id}
                          // ========== 🔥 ЦВЕТОВАЯ ИНДИКАЦИЯ В МЕНЮ ==========
                          sx={{
                            ...(isThisSelected && {
                              backgroundColor: `${rightPairColor}20`,
                              "&:hover": {
                                backgroundColor: `${rightPairColor}30`,
                              },
                            }),
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: rightPairColor,
                                display: "inline-block",
                              }}
                            />
                            {advancedRightLabels[i]}
                          </Box>
                        </MenuItem>
                      );
                    })}

                    <MenuItem value={-1}>
                      X1
                    </MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            );
          })}
        </List>
      </Grid>

      {/* Правая колонка — варианты */}
      <Grid size={{ xs: 12, md: question.imageUrl ? 4 : 5 }}>
        <Typography variant="h6" gutterBottom>
          Варіанти
        </Typography>

        <List>
          {shuffledRightItems.map((item, index) => {
            const rightColor = getColorByPairIndex(index + 1);
            // Проверяем, выбран ли этот вариант где-либо
            const isSelected = savedAnswer?.some(answer => answer === item.id);
            
            return (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  px: { xs: 1, sm: 2 },
                  // ========== 🔥 ПОДСВЕТКА ВЫБРАННОГО ВАРИАНТА ==========
                  ...(isSelected && !isImageUrl(item.matchLabel) && {
                    backgroundColor: `${rightColor}15`,
                    borderRadius: 1,
                    transition: "background-color 0.2s ease",
                  }),
                }}
              >
                {/* Цветной кружок-индикатор */}
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: rightColor,
                    display: "inline-block",
                    mr: 0.5,
                  }}
                />
                
                <Typography variant="body1" sx={{ minWidth: 30 }}>
                  {String.fromCharCode(65 + index)}.
                </Typography>

                {isImageUrl(item.matchLabel) ? (
                  <ZoomableImage
                    src={item.matchLabel!}
                    alt={`Option ${index}`}
                    sx={{
                      maxWidth: { xs: "60vw", sm: "40vw", md: "20vw" },
                      maxHeight: { xs: "30vh", md: "15vh" },
                    }}
                  />
                ) : (
                  <Typography 
                    variant="body1"
                    // ========== 🔥 ЦВЕТ ТЕКСТА ДЛЯ ВЫБРАННОГО ВАРИАНТА ==========
                    sx={{
                      ...(isSelected && {
                        color: rightColor,
                        fontWeight: 500,
                      }),
                    }}
                  >
                    {item.matchLabel}
                  </Typography>
                )}
              </ListItem>
            );
          })}
        </List>
      </Grid>

      {/* Картинка вопроса (если есть) */}
      {question.imageUrl && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ textAlign: "center", my: { xs: 2, md: 0 } }}>
            <ZoomableImage
              src={question.imageUrl}
              alt="Зображення до питання"
              maxWidth="100%"
              maxHeight={400}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}