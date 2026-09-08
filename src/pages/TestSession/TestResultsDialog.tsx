// import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Tooltip } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import type { TestResult } from "../../types";
// import { testFinishButtonStyle } from "./testSessionStyles";
// import { useNavigate } from "react-router-dom";
// import { useExplanation } from "../../hooks/useExplanation"; 

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   result: TestResult | null;
//   disciplineName: string;
//   disciplineId: string | undefined;
// }

// export function TestResultsDialog({ open, onClose, result, disciplineName, disciplineId }: Props) {
//   const navigate = useNavigate();
//   const { fetchExplanation, cache } = useExplanation(); //Подключение кэширования

//   return (
//     <Dialog 
//       open={open} 
//       onClose={(event, reason) => {
//         // Блокируем закрытие при клике вне диалога
//         if (reason !== "backdropClick") {
//           onClose();
//         }
//       }} 
//       maxWidth="md" 
//       fullWidth
//     >
//       <DialogTitle>Результати тесту</DialogTitle>
//       <IconButton
//         aria-label="close"
//         onClick={onClose}
//         sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//       >
//         <CloseIcon />
//       </IconButton>
//       <DialogContent>
//         {result && (
//           <>
//             <Typography>
//               Загальна/Максимально можлива кількість балів: {result.totalScore}/{result.maxTotalScore}
//             </Typography>

//             {result.results.map((r, index) => (
//               <Box key={r.questionId} sx={{ mb: 2 }}>
                
//                 {/* ⬅️ 4. Оборачиваем вопрос в Tooltip */}
//                 <Tooltip
//                   title={
//                     cache[r.questionId] !== undefined
//                       ? (cache[r.questionId] || "Обґрунтування відсутнє")
//                       : "Завантаження..."
//                   }
//                   arrow
//                   onOpen={() => fetchExplanation(r.questionId)} // Загружаем Explanation при первом наведении
//                 >
//                   <Typography sx={{ cursor: "help" }}>
//                     Питання № {index+1} ({r.questionId}):{" "}
//                     {r.isCorrect
//                       ? "✅ Правильно"
//                       : r.score > 0
//                         ? "⚠️ Частково правильно"
//                         : "❌ Неправильно"} ({r.score} бал.)
//                   </Typography>
//                 </Tooltip>

//                 {!r.isCorrect && ( 
//                   <Typography>
//                     Правильна відповідь:{" "}
//                     {r.correctAnswer && r.correctAnswer.length > 0
//                       ? r.correctAnswer.join(", ")
//                       : ""}
//                   </Typography>
//                 )}
//               </Box>
//             ))}
//           </>
//         )}
//       </DialogContent>
      
//       <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, mb: 2 }}>
//         <Button
//           variant="contained"
//           sx={{ ...testFinishButtonStyle, minWidth: "150px" }}
//           onClick={() => navigate(`/test/${disciplineName}/${disciplineId}`)}
//         >
//           До тесту
//         </Button>
//         <Button
//           variant="contained"
//           sx={{
//             ...testFinishButtonStyle,
//             minWidth: "150px",
//             backgroundColor: "#1976d2",
//             "&:hover": { backgroundColor: "#115293" },
//           }}
//           onClick={() => navigate("/")}
//         >
//           На головну
//         </Button>
//       </Box>
//     </Dialog>
//   );
// }



import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import type { TestResult } from "../../types";
import { testFinishButtonStyle } from "./testSessionStyles";
import { useNavigate } from "react-router-dom";
import { useExplanation } from "../../hooks/useExplanation";
import { MathFormula } from "../../components";
import { QuestionType } from "../../types/pages/testpages/types";

interface Props {
  open: boolean;
  onClose: () => void;
  result: TestResult | null;
  disciplineName: string;
  disciplineId: string | undefined;
  questions?: any[];
}

// 🔑 Функція для перевірки наявності формул
const isLatex = (text: string) => {
  if (!text) return false;
  return text.includes('$') || text.includes('\\(') || text.includes('`');
};

// 🔑 Функція для парсингу тексту з формулами (з пробілами)
const parseTextWithMath = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // 🔑 Розбиваємо по зворотнім лапкам, але зберігаємо роздільники
  const parts = text.split(/`(.*?)`/g);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // 🔑 Це формула (між ` `) - пробіли не потрібні всередині
      return <MathFormula key={index} formula={part} />;
    }
    // 🔑 Це звичайний текст - повертаємо з пробілами
    return <span key={index}>{part}</span>;
  });
};

// 🔑 Функція для відображення пояснення з підтримкою формул
const renderExplanation = (explanation: string | null | undefined) => {
  if (!explanation) return "Обґрунтування відсутнє";
  
  // 🔑 Якщо текст містить формули - розбиваємо на частини
  if (isLatex(explanation)) {
    return (
      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {parseTextWithMath(explanation)}
      </Typography>
    );
  }
  
  // 🔑 Звичайний текст - просто показуємо
  return (
    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {explanation}
    </Typography>
  );
};

export function TestResultsDialog({ open, onClose, result, disciplineName, disciplineId, questions }: Props) {
  const navigate = useNavigate();
  const { fetchExplanation, cache } = useExplanation();

  const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

  return (
    <Dialog 
      open={open} 
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>Результати тесту</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {result && (
          <>
            <Typography>
              Загальна/Максимально можлива кількість балів: {result.totalScore}/{result.maxTotalScore}
            </Typography>

            {result.results.map((r, index) => {
              const question = questions?.find((q: any) => q.id === r.questionId);
              const isOpenAnswer = question?.type === QuestionType.OpenAnswer;
              
              let correctAnswerText = "";
              if (isOpenAnswer) {
                const correctOption = question?.options?.find((o: any) => o.isCorrect === true);
                correctAnswerText = correctOption?.text || "Немає даних";
              } else {
                correctAnswerText = r.correctAnswer && r.correctAnswer.length > 0
                  ? r.correctAnswer.join(", ")
                  : "";
              }
              
              return (
                <Box key={r.questionId} sx={{ mb: 2 }}>
                  
                  {/* ⬅️ 4. Оборачиваем вопрос в Tooltip */}
                  <Tooltip
                    title={
                      <Box sx={{ maxWidth: 400, p: 1 }}>
                        {cache[r.questionId] !== undefined && cache[r.questionId] !== null ? (
                          // 🔑 Підтримка формул у поясненні
                          renderExplanation(cache[r.questionId])
                        ) : (
                          "Завантаження..."
                        )}
                      </Box>
                    }
                    arrow
                    onOpen={() => fetchExplanation(r.questionId)}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          maxWidth: 450,
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333' : '#fff',
                            color: (theme) => theme.palette.text.primary,
                            border: '1px solid #ddd',
                            boxShadow: 4,
                          }
                        }
                      }
                    }}
                  >
                    <Typography sx={{ cursor: "help" }}>
                      Питання № {index + 1}{isDev ? ` (ID: ${r.questionId})` : ''}:{" "}
                      {r.isCorrect
                        ? "✅ Правильно"
                        : r.score > 0
                          ? "⚠️ Частково правильно"
                          : "❌ Неправильно"} ({r.score} бал.)
                    </Typography>
                  </Tooltip>

                  {!r.isCorrect && (
                    <Typography>
                      Правильна відповідь:{" "}
                      {isOpenAnswer ? (
                        question?.options?.find((o: any) => o.isCorrect)?.text || "Немає даних"
                      ) : (
                        r.correctAnswer && r.correctAnswer.length > 0
                          ? r.correctAnswer.join(", ")
                          : ""
                      )}
                      {isDev && !isOpenAnswer && r.correctAnswer && r.correctAnswer.length > 0 && (
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
                          (ID опцій: {r.correctAnswer.join(", ")})
                        </Typography>
                      )}
                      {isDev && isOpenAnswer && question?.options?.find((o: any) => o.isCorrect) && (
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
                          (ID опції: {question.options.find((o: any) => o.isCorrect)?.id})
                        </Typography>
                      )}
                    </Typography>
                  )}

                  {isDev && (
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
                      Ваша відповідь: {Array.isArray(r.userAnswer) && r.userAnswer.length > 0
                        ? r.userAnswer.join(", ")
                        : "не надано"}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </>
        )}
      </DialogContent>
      
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          sx={{ ...testFinishButtonStyle, minWidth: "150px" }}
          onClick={() => navigate(`/test/${disciplineName}/${disciplineId}`)}
        >
          До тесту
        </Button>
        <Button
          variant="contained"
          sx={{
            ...testFinishButtonStyle,
            minWidth: "150px",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
          onClick={() => navigate("/")}
        >
          На головну
        </Button>
      </Box>
    </Dialog>
  );
}
