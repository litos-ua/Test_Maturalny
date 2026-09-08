// Добавляем поддержку тестирования по темам
// // Адаптивний вариант
// import { useParams, useLocation } from "react-router-dom";
// import { Box, Button, Typography, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, useMediaQuery } from "@mui/material";
// import { QuestionSingleChoice, QuestionDoubleChoice, QuestionMultipleChoice, QuestionMatching, QuestionCorrectSequence } from "./";
// import { TestNavigation } from "./TestNavigation";
// import { useTestSessionCombined, useTestAnswersCombined } from "../../hooks";
// import { TestResultsDialog } from "./TestResultsDialog";
// import { QuestionType } from "../../types/pages/testpages/types";
// import { questionCircleStyle, questionHeaderStyle } from "./testSessionStyles"
// import type { TestResult } from "../../types/pages/testpages/types";
// import { useState, useMemo } from "react";
// import { useAuth } from "../../context";

// export function TestSessionPage() {
//   const { id, name, topicId, topicName } = useParams();  // id - disciplineId, topicId - для теста по теме
  
//   const { authUser, isAuthenticated } = useAuth();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const testType = params.get("type") || "learn";
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));
//   const isTopicTest = !!topicId;
//   const displayName = isTopicTest ? decodeURIComponent(topicName || "") : name;


//   // ========== Передаем topicId в хук ==========
//   const startSession = useTestSessionCombined(
//     testType,
//     authUser?.id,
//     id ? parseInt(id) : undefined,                    // disciplineId (существующий)
//     isTopicTest ? parseInt(topicId!) : undefined      // topicId (НОВЫЙ, опционально)
//   );
//   // ========== КОНЕЦ ИЗМЕНЕНИЯ ==========

//   const {
//     sessionId,
//     questions,
//     shuffledQuestions,
//     currentIndex,
//     setCurrentIndex,
//     timeLeft,
//     currentQuestion,
//   } = startSession;

//   const leftItemsMap = useMemo(() => {
//     const map: Record<number, { id: number; text: string }[]> = {};
//     shuffledQuestions.forEach(q => {
//       if (q.type === QuestionType.Matching || q.type === QuestionType.CorrectSequence) {
//         map[q.id] = q.options.map(o => ({ id: o.id, text: o.text }));
//       }
//     });
//     return map;
//   }, [shuffledQuestions]);

//   const finishSession = useTestAnswersCombined(testType, questions, startSession?.sessionId ?? null, leftItemsMap, id);

//   const {
//     answers,
//     saveAnswer,
//     clearAnswers,
//     calculateResults,
//     finishAndSendResults,
//   } = finishSession;

//   const answeredIds = Object.entries(answers)
//     .filter(([questionId, optionIds]) => {
//       const q = questions.find(q => q.id === Number(questionId));
//       if (!q || !Array.isArray(optionIds)) return false;

//       let requiredLength = 1;

//       switch (q.type) {
//         case QuestionType.Matching:
//           requiredLength = 5;
//           break;
//         case QuestionType.CorrectSequence:
//           requiredLength = 4;
//           break;
//         case QuestionType.MultipleChoice:
//           requiredLength = 3;
//           break;
//         case QuestionType.DoubleChoice:
//           requiredLength = 2;
//           break;
//       }

//       if (requiredLength > 1) {
//         return optionIds.length >= requiredLength &&
//                optionIds.every(val => val !== undefined && val !== null);
//       } else {
//         return optionIds.some(val => val !== undefined && val !== null);
//       }
//     })
//     .map(([questionId]) => Number(questionId));

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const [showResults, setShowResults] = useState(false);
//   const [testResult, setTestResult] = useState<TestResult | null>(null);
//   const [showUnansweredDialog, setShowUnansweredDialog] = useState(false);
//   const [pendingFinish, setPendingFinish] = useState(false);

//   const handleFinishTest = async () => {
//     const unanswered = questions.filter(
//       (q) =>
//         !answers[q.id] ||
//         answers[q.id].length === 0 ||
//         answers[q.id].some((val) => val === undefined || val === null)
//     );

//     if (unanswered.length > 0) {
//       setShowUnansweredDialog(true);
//       setPendingFinish(true);
//       return;
//     }

//     let result: TestResult | null = null;

//     if (finishAndSendResults) {
//       result = await finishAndSendResults();
//     }

//     if (!result) {
//       result = calculateResults();
//     }

//     if (result) {
//       if (document.activeElement instanceof HTMLElement) {
//         document.activeElement.blur();
//       }
//       setTestResult(result);
//       setShowResults(true);
//       clearAnswers();
//     }
//   };

//   if (!currentQuestion) return <Typography>Загрузка вопросов...</Typography>;

//   return (
//     <Box sx={{ 
//       p: { xs: 2, sm: 3, md: 4 },
//       maxWidth: '100%',
//       overflowX: 'hidden'
//     }}>
//       {/* Заголовок */}
//       <Box sx={{ 
//         ...questionHeaderStyle,
//         flexDirection: { xs: 'column', sm: 'row' },
//         textAlign: { xs: 'center', sm: 'left' },
//         p: { xs: 1.5, sm: 2 },
//         gap: { xs: 1, sm: 0 }
//       }}>
//         {/* ========== 🔥 ИЗМЕНЕНО: Используем displayName вместо name ========== */}
//         <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
//           Тестування: {displayName}
//         </Typography>
//         {/* ========== КОНЕЦ ИЗМЕНЕНИЯ ========== */}
//         <Typography variant={isMobile ? "body1" : "h6"} sx={{ 
//           backgroundColor: { xs: 'rgba(255,255,255,0.2)', sm: 'transparent' },
//           px: { xs: 2, sm: 0 },
//           py: { xs: 1, sm: 0 },
//           borderRadius: { xs: 2, sm: 0 }
//         }}>
//           Час: {formatTime(timeLeft)}
//         </Typography>
//       </Box>

//       {/* Индикаторы вопросов */}
//       <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
//         {questions.map((q, index) => (
//           <Grid size = {{xs:2, sm:1.5, md:1, lg:0.8}} key={q.id} >
//             <Paper
//               onClick={() => setCurrentIndex(index)}
//               sx={{
//                 ...questionCircleStyle,
//                 width: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw', xl: '2.5vw' },
//                 height: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw', xl: '2.5vw' },
//                 maxWidth: { xs: 40, sm: 45, md: 50 },
//                 maxHeight: { xs: 40, sm: 45, md: 50 },
//                 minWidth: { xs: 28, sm: 32, md: 36 },
//                 minHeight: { xs: 28, sm: 32, md: 36 },
//                 fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem', lg: '1rem'},
//                 backgroundColor: index === currentIndex
//                   ? "secondary.main"
//                   : answeredIds.includes(q.id)
//                   ? "success.light"
//                   : "grey.300",
//                 color: index === currentIndex ? "white" : "text.primary",
//                 fontWeight: index === currentIndex ? "bold" : "normal",
//               }}
//               elevation={index === currentIndex ? 4 : 1}
//             >
//               {index + 1}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       {/* Текущий вопрос */}
//       <Box sx={{ 
//         mb: 3,
//         px: { xs: 0, sm: 1 }
//       }}>
//         {currentQuestion.type === QuestionType.SingleChoice && (
//           <QuestionSingleChoice
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//         )}
//         {currentQuestion.type === QuestionType.MultipleChoice && (
//           <QuestionMultipleChoice
//             question={currentQuestion}
//             savedAnswer={answers[currentQuestion.id] || []}
//             onAnswer={saveAnswer}
//           />
//         )}
//         {currentQuestion.type === QuestionType.Matching && (
//           <QuestionMatching
//             key={currentQuestion.id}
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//         )}
//         {currentQuestion.type === QuestionType.DoubleChoice && (
//           <QuestionDoubleChoice
//             question={currentQuestion}
//             savedAnswer={answers[currentQuestion.id] || []}
//             onAnswer={saveAnswer}
//           />
//         )}
//         {currentQuestion.type === QuestionType.CorrectSequence && (
//           <QuestionCorrectSequence
//             key={currentQuestion.id}
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//         )}
//       </Box>

//       {/* Навигация */}
//       <TestNavigation
//         currentIndex={currentIndex}
//         total={questions.length}
//         onPrev={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
//         onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
//         onFinish={handleFinishTest}
//         onSave={() => {
//           const currentAnswer = answers[currentQuestion.id] || [];
//           saveAnswer(currentQuestion.id, currentAnswer);
//         }}
//       />

//       {/* Диалоговые окна */}
//       {/* ========== 🔥 ИЗМЕНЕНО: Передаем правильные параметры в диалог ========== */}
//       <TestResultsDialog
//         open={showResults}
//         onClose={() => setShowResults(false)}
//         result={testResult}
//         disciplineName={displayName || ""}
//         disciplineId={isTopicTest ? topicId : id}
//       />
//       {/* ========== КОНЕЦ ИЗМЕНЕНИЯ ========== */}

//       <Dialog 
//         open={showUnansweredDialog} 
//         onClose={() => setShowUnansweredDialog(false)}
//         fullScreen={isMobile}
//       >
//         <DialogTitle sx={{ color: 'error.main', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
//           У вас є питання без відповідей
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant={isMobile ? "body2" : "body1"}>
//             Ви впевнені, що хочете завершити тест або продовжити відповідати на питання?
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ 
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1, sm: 0 }
//         }}>
//           <Button
//             onClick={() => {
//               setShowUnansweredDialog(false);
//               setPendingFinish(false);
//             }}
//             color="primary"
//             variant="outlined"
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//           >
//             Продовжити тест
//           </Button>
//           <Button
//             onClick={async () => {
//               setShowUnansweredDialog(false);
//               setPendingFinish(false);
//               const result = await finishAndSendResults?.();
//               if (result) {
//                 setTestResult(result);
//                 setShowResults(true);
//                 clearAnswers();
//               }
//             }}
//             color="error"
//             variant="contained"
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//           >
//             Завершити тест
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>    
//   );
// }




// // Используем параметры константы для количества опций в зависимости от выбранной дисциплины

// // Адаптивний вариант
// import { useParams, useLocation } from "react-router-dom";
// import { Box, Button, Typography, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, useMediaQuery } from "@mui/material";
// import { QuestionSingleChoice, QuestionDoubleChoice, QuestionMultipleChoice, QuestionMatching, QuestionCorrectSequence, QuestionOpenAnswer } from "./";
// import { TestNavigation } from "./TestNavigation";
// import { useTestSessionCombined, useTestAnswersCombined } from "../../hooks";
// import { TestResultsDialog } from "./TestResultsDialog";
// import { QuestionType } from "../../types/pages/testpages/types";
// import { questionCircleStyle, questionHeaderStyle } from "./testSessionStyles"
// import type { TestResult } from "../../types/pages/testpages/types";
// import { useState, useMemo } from "react";
// import { useAuth } from "../../context";
// import { getRequiredAnswerCount } from "../../utils/testConfigHelpers"

// export function TestSessionPage() {
//   const { id, name, topicId, topicName, disciplineId } = useParams();  // id - disciplineId, topicId - для теста по теме
  
//   const { authUser, isAuthenticated } = useAuth();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const testType = params.get("type") || "learn";
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));
//   const isTopicTest = !!topicId;
//   const displayName = isTopicTest ? decodeURIComponent(topicName || "") : name;

//   // 🔑 отримуємо disciplineId з query параметра (для тесту по темі) або з id (для стандартного тесту)
//   const finalDisciplineId = disciplineId 
//   ? parseInt(disciplineId) // для тесту по темі
//   : (id ? parseInt(id) : undefined); // для стандартного тесту

//   // ========== Передаем topicId в хук ==========
//   const startSession = useTestSessionCombined(
//     testType,
//     authUser?.id,
//     finalDisciplineId, 
//     isTopicTest ? parseInt(topicId!) : undefined      
//   );
//   // ========== КОНЕЦ ИЗМЕНЕНИЯ ==========


//   const {
//     sessionId,
//     questions,
//     shuffledQuestions,
//     currentIndex,
//     setCurrentIndex,
//     timeLeft,
//     currentQuestion,
//   } = startSession;

//   const leftItemsMap = useMemo(() => {
//     const map: Record<number, { id: number; text: string }[]> = {};
//     shuffledQuestions.forEach(q => {
//       if (q.type === QuestionType.Matching || q.type === QuestionType.CorrectSequence) {
//         map[q.id] = q.options.map(o => ({ id: o.id, text: o.text }));
//       }
//     });
//     return map;
//   }, [shuffledQuestions]);

//   // 🔑 ВИПРАВЛЕНО: передаємо finalDisciplineId замість id!
//   const finishSession = useTestAnswersCombined(
//     testType, 
//     questions, 
//     startSession?.sessionId ?? null, 
//     leftItemsMap, 
//     finalDisciplineId?.toString() 
//   );

// const {
//   answers,
//   saveAnswer,
//   clearAnswers,
//   calculateResults,
//   finishAndSendResults,
// } = finishSession;


// const answeredIds = Object.entries(answers)
//   .filter(([questionId, optionIds]) => {
//     const q = questions.find(q => q.id === Number(questionId));
//     if (!q || !Array.isArray(optionIds)) return false;

//     // Використовуємо конфігурацію замість хардкоду
//     const requiredLength = getRequiredAnswerCount(
//       disciplineId,
//       q.type,
//       q.options
//     );

//     if (requiredLength > 1) {
//       return optionIds.length >= requiredLength &&
//              optionIds.every(val => val !== undefined && val !== null);
//     } else {
//       return optionIds.some(val => val !== undefined && val !== null);
//     }
//   })
//   .map(([questionId]) => Number(questionId));

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const [showResults, setShowResults] = useState(false);
//   const [testResult, setTestResult] = useState<TestResult | null>(null);
//   const [showUnansweredDialog, setShowUnansweredDialog] = useState(false);
//   const [pendingFinish, setPendingFinish] = useState(false);

//   const handleFinishTest = async () => {
//     const unanswered = questions.filter(
//       (q) =>
//         !answers[q.id] ||
//         answers[q.id].length === 0 ||
//         answers[q.id].some((val) => val === undefined || val === null)
//     );

//     if (unanswered.length > 0) {
//       setShowUnansweredDialog(true);
//       setPendingFinish(true);
//       return;
//     }

//     let result: TestResult | null = null;

//     if (finishAndSendResults) {
//       result = await finishAndSendResults();
//     }

//     if (!result) {
//       result = calculateResults();
//     }

//     if (result) {
//       if (document.activeElement instanceof HTMLElement) {
//         document.activeElement.blur();
//       }
//       setTestResult(result);
//       setShowResults(true);
//       clearAnswers();
//     }
//   };

//   if (!currentQuestion) return <Typography>Загрузка вопросов...</Typography>;

//   return (
//     <Box sx={{ 
//       p: { xs: 2, sm: 3, md: 4 },
//       maxWidth: '100%',
//       overflowX: 'hidden'
//     }}>
//       {/* Заголовок */}
//       <Box sx={{ 
//         ...questionHeaderStyle,
//         flexDirection: { xs: 'column', sm: 'row' },
//         textAlign: { xs: 'center', sm: 'left' },
//         p: { xs: 1.5, sm: 2 },
//         gap: { xs: 1, sm: 0 }
//       }}>
//         {/* ========== Используем displayName вместо name ========== */}
//         <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
//           Тестування: {displayName}
//         </Typography>
        
//         <Typography variant={isMobile ? "body1" : "h6"} sx={{ 
//           backgroundColor: { xs: 'rgba(255,255,255,0.2)', sm: 'transparent' },
//           px: { xs: 2, sm: 0 },
//           py: { xs: 1, sm: 0 },
//           borderRadius: { xs: 2, sm: 0 }
//         }}>
//           Час: {formatTime(timeLeft)}
//         </Typography>
//       </Box>

//       {/* Индикаторы вопросов */}
//       <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
//         {questions.map((q, index) => (
//           <Grid size = {{xs:2, sm:1.5, md:1, lg:0.8}} key={q.id} >
//             <Paper
//               onClick={() => setCurrentIndex(index)}
//               sx={{
//                 ...questionCircleStyle,
//                 width: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw', xl: '2.5vw' },
//                 height: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw', xl: '2.5vw' },
//                 maxWidth: { xs: 40, sm: 45, md: 50 },
//                 maxHeight: { xs: 40, sm: 45, md: 50 },
//                 minWidth: { xs: 28, sm: 32, md: 36 },
//                 minHeight: { xs: 28, sm: 32, md: 36 },
//                 fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem', lg: '1rem'},
//                 backgroundColor: index === currentIndex
//                   ? "secondary.main"
//                   : answeredIds.includes(q.id)
//                   ? "success.light"
//                   : "grey.300",
//                 color: index === currentIndex ? "white" : "text.primary",
//                 fontWeight: index === currentIndex ? "bold" : "normal",
//               }}
//               elevation={index === currentIndex ? 4 : 1}
//             >
//               {index + 1}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       {/* Текущий вопрос */}
//       <Box sx={{ 
//         mb: 3,
//         px: { xs: 0, sm: 1 }
//       }}>
//         {currentQuestion.type === QuestionType.SingleChoice && (
//           <QuestionSingleChoice
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//         )}
//         {currentQuestion.type === QuestionType.MultipleChoice && (
//           <QuestionMultipleChoice
//             question={currentQuestion}
//             savedAnswer={answers[currentQuestion.id] || []}
//             onAnswer={saveAnswer}
//           />
//         )}
//         {currentQuestion.type === QuestionType.Matching && (
//           <QuestionMatching
//             key={currentQuestion.id}
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//         )}
//         {currentQuestion.type === QuestionType.DoubleChoice && (
//           <QuestionDoubleChoice
//             question={currentQuestion}
//             savedAnswer={answers[currentQuestion.id] || []}
//             onAnswer={saveAnswer}
//           />
//         )}
//         {currentQuestion.type === QuestionType.CorrectSequence && (
//           <QuestionCorrectSequence
//             key={currentQuestion.id}
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//         )}
//         {currentQuestion.type === QuestionType.OpenAnswer && (
//           <QuestionOpenAnswer
//             key={currentQuestion.id}
//             question={currentQuestion}
//             onAnswer={saveAnswer}
//             savedAnswer={answers[currentQuestion.id] || []}
//           />
//   )}
//       </Box>

//       {/* Навигация */}
//       <TestNavigation
//         currentIndex={currentIndex}
//         total={questions.length}
//         onPrev={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
//         onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
//         onFinish={handleFinishTest}
//         onSave={() => {
//           const currentAnswer = answers[currentQuestion.id] || [];
//           saveAnswer(currentQuestion.id, currentAnswer);
//         }}
//       />

//       {/* Диалоговые окна */}
//       {/* ========== 🔥 ИЗМЕНЕНО: Передаем правильные параметры в диалог ========== */}
//       <TestResultsDialog
//         open={showResults}
//         onClose={() => setShowResults(false)}
//         result={testResult}
//         disciplineName={displayName || ""}
//         disciplineId={isTopicTest ? topicId : id}
//       />
//       {/* ========== КОНЕЦ ИЗМЕНЕНИЯ ========== */}

//       <Dialog 
//         open={showUnansweredDialog} 
//         onClose={() => setShowUnansweredDialog(false)}
//         fullScreen={isMobile}
//       >
//         <DialogTitle sx={{ color: 'error.main', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
//           У вас є питання без відповідей
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant={isMobile ? "body2" : "body1"}>
//             Ви впевнені, що хочете завершити тест або продовжити відповідати на питання?
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ 
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1, sm: 0 }
//         }}>
//           <Button
//             onClick={() => {
//               setShowUnansweredDialog(false);
//               setPendingFinish(false);
//             }}
//             color="primary"
//             variant="outlined"
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//           >
//             Продовжити тест
//           </Button>
//           <Button
//             onClick={async () => {
//               setShowUnansweredDialog(false);
//               setPendingFinish(false);
//               const result = await finishAndSendResults?.();
//               if (result) {
//                 setTestResult(result);
//                 setShowResults(true);
//                 clearAnswers();
//               }
//             }}
//             color="error"
//             variant="contained"
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//           >
//             Завершити тест
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>    
//   );
// }


// Используем параметры константы для количества опций в зависимости от выбранной дисциплины

// Адаптивний вариант
import { useParams, useLocation } from "react-router-dom";
import { Box, Button, Typography, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, useTheme, useMediaQuery } from "@mui/material";
import { QuestionSingleChoice, QuestionDoubleChoice, QuestionMultipleChoice, QuestionMatching, QuestionCorrectSequence, QuestionOpenAnswer } from "./";
import { TestNavigation } from "./TestNavigation";
import { useTestSessionCombined, useTestAnswersCombined } from "../../hooks";
import { TestResultsDialog } from "./TestResultsDialog";
import { QuestionType } from "../../types/pages/testpages/types";
import { questionCircleStyle, questionHeaderStyle } from "./testSessionStyles"
import type { TestResult } from "../../types/pages/testpages/types";
import { useState, useMemo } from "react";
import { useAuth } from "../../context";
import { getRequiredAnswerCount } from "../../utils/testConfigHelpers"

export function TestSessionPage() {
  const { id, name, topicId, topicName, disciplineId } = useParams();  // id - disciplineId, topicId - для теста по теме
  
  const { authUser, isAuthenticated } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const testType = params.get("type") || "learn";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isTopicTest = !!topicId;
  const displayName = isTopicTest ? decodeURIComponent(topicName || "") : name;

  // 🔑 отримуємо disciplineId з query параметра (для тесту по темі) або з id (для стандартного тесту)
  const finalDisciplineId = disciplineId 
  ? parseInt(disciplineId) // для тесту по темі
  : (id ? parseInt(id) : undefined); // для стандартного тесту

  // ========== Передаем topicId в хук ==========
  const startSession = useTestSessionCombined(
    testType,
    authUser?.id,
    finalDisciplineId, 
    isTopicTest ? parseInt(topicId!) : undefined      
  );
  // ========== КОНЕЦ ИЗМЕНЕНИЯ ==========


  const {
    sessionId,
    questions,
    shuffledQuestions,
    currentIndex,
    setCurrentIndex,
    timeLeft,
    currentQuestion,
  } = startSession;

  const leftItemsMap = useMemo(() => {
    const map: Record<number, { id: number; text: string }[]> = {};
    shuffledQuestions.forEach(q => {
      if (q.type === QuestionType.Matching || q.type === QuestionType.CorrectSequence) {
        map[q.id] = q.options.map(o => ({ id: o.id, text: o.text }));
      }
    });
    return map;
  }, [shuffledQuestions]);

  // передаем finalDisciplineId вместо id!
  const finishSession = useTestAnswersCombined(
    testType, 
    questions, 
    startSession?.sessionId ?? null, 
    leftItemsMap, 
    finalDisciplineId?.toString() 
  );

const {
  answers,
  saveAnswer,
  clearAnswers,
  calculateResults,
  finishAndSendResults,
} = finishSession;


const answeredIds = Object.entries(answers)
  .filter(([questionId, optionIds]) => {
    const q = questions.find(q => q.id === Number(questionId));
    if (!q || !Array.isArray(optionIds)) return false;

    // Використовуємо конфігурацію замість хардкоду
    const requiredLength = getRequiredAnswerCount(
      disciplineId,
      q.type,
      q.options
    );

    if (requiredLength > 1) {
      return optionIds.length >= requiredLength &&
             optionIds.every(val => val !== undefined && val !== null);
    } else {
      return optionIds.some(val => val !== undefined && val !== null);
    }
  })
  .map(([questionId]) => Number(questionId));

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const [showResults, setShowResults] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showUnansweredDialog, setShowUnansweredDialog] = useState(false);
  const [pendingFinish, setPendingFinish] = useState(false);

  const handleFinishTest = async () => {
    const unanswered = questions.filter(
      (q) =>
        !answers[q.id] ||
        answers[q.id].length === 0 ||
        answers[q.id].some((val) => val === undefined || val === null)
    );

    if (unanswered.length > 0) {
      setShowUnansweredDialog(true);
      setPendingFinish(true);
      return;
    }

    let result: TestResult | null = null;

    if (finishAndSendResults) {
      result = await finishAndSendResults();
    }

    if (!result) {
      result = calculateResults();
    }

    if (result) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setTestResult(result);
      setShowResults(true);
      clearAnswers();
    }
  };

  if (!currentQuestion) return <Typography>Загрузка вопросов...</Typography>;

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      {/* Заголовок */}
      <Box sx={{ 
        ...questionHeaderStyle,
        flexDirection: { xs: 'column', sm: 'row' },
        textAlign: { xs: 'center', sm: 'left' },
        p: { xs: 1.5, sm: 2 },
        gap: { xs: 1, sm: 0 }
      }}>
        {/* ========== Используем displayName вместо name ========== */}
        <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
          Тестування: {displayName}
        </Typography>
        
        <Typography variant={isMobile ? "body1" : "h6"} sx={{ 
          backgroundColor: { xs: 'rgba(255,255,255,0.2)', sm: 'transparent' },
          px: { xs: 2, sm: 0 },
          py: { xs: 1, sm: 0 },
          borderRadius: { xs: 2, sm: 0 }
        }}>
          Час: {formatTime(timeLeft)}
        </Typography>
      </Box>

      {/* Индикаторы вопросов */}
      <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
        {questions.map((q, index) => (
          <Grid size = {{xs:2, sm:1.5, md:1, lg:0.8}} key={q.id} >
            <Paper
              onClick={() => setCurrentIndex(index)}
              sx={{
                ...questionCircleStyle,
                width: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw', xl: '2.5vw' },
                height: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw', xl: '2.5vw' },
                maxWidth: { xs: 40, sm: 45, md: 50 },
                maxHeight: { xs: 40, sm: 45, md: 50 },
                minWidth: { xs: 28, sm: 32, md: 36 },
                minHeight: { xs: 28, sm: 32, md: 36 },
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem', lg: '1rem'},
                backgroundColor: index === currentIndex
                  ? "secondary.main"
                  : answeredIds.includes(q.id)
                  ? "success.light"
                  : "grey.300",
                color: index === currentIndex ? "white" : "text.primary",
                fontWeight: index === currentIndex ? "bold" : "normal",
              }}
              elevation={index === currentIndex ? 4 : 1}
            >
              {index + 1}
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Текущий вопрос */}
      <Box sx={{ 
        mb: 3,
        px: { xs: 0, sm: 1 }
      }}>
        {currentQuestion.type === QuestionType.SingleChoice && (
          <QuestionSingleChoice
            question={currentQuestion}
            onAnswer={saveAnswer}
            savedAnswer={answers[currentQuestion.id] || []}
          />
        )}
        {currentQuestion.type === QuestionType.MultipleChoice && (
          <QuestionMultipleChoice
            question={currentQuestion}
            savedAnswer={answers[currentQuestion.id] || []}
            onAnswer={saveAnswer}
          />
        )}
        {currentQuestion.type === QuestionType.Matching && (
          <QuestionMatching
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={saveAnswer}
            savedAnswer={answers[currentQuestion.id] || []}
          />
        )}
        {currentQuestion.type === QuestionType.DoubleChoice && (
          <QuestionDoubleChoice
            question={currentQuestion}
            savedAnswer={answers[currentQuestion.id] || []}
            onAnswer={saveAnswer}
          />
        )}
        {currentQuestion.type === QuestionType.CorrectSequence && (
          <QuestionCorrectSequence
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={saveAnswer}
            savedAnswer={answers[currentQuestion.id] || []}
          />
        )}
        {currentQuestion.type === QuestionType.OpenAnswer && (
          <QuestionOpenAnswer
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={saveAnswer}
            savedAnswer={answers[currentQuestion.id] || []}
          />
  )}
      </Box>

      {/* Навигация */}
      <TestNavigation
        currentIndex={currentIndex}
        total={questions.length}
        onPrev={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
        onFinish={handleFinishTest}
        onSave={() => {
          const currentAnswer = answers[currentQuestion.id] || [];
          saveAnswer(currentQuestion.id, currentAnswer);
        }}
      />

      {/* Диалоговые окна */}
      {/* ========== 🔥 ИЗМЕНЕНО: Передаем правильные параметры в диалог ========== */}
      <TestResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={testResult}
        disciplineName={displayName || ""}
        disciplineId={isTopicTest ? topicId : id}
      />
      {/* ========== КОНЕЦ ИЗМЕНЕНИЯ ========== */}

      <Dialog 
        open={showUnansweredDialog} 
        onClose={() => setShowUnansweredDialog(false)}
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ color: 'error.main', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          У вас є питання без відповідей
        </DialogTitle>
        <DialogContent>
          <Typography variant={isMobile ? "body2" : "body1"}>
            Ви впевнені, що хочете завершити тест або продовжити відповідати на питання?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Button
            onClick={() => {
              setShowUnansweredDialog(false);
              setPendingFinish(false);
            }}
            color="primary"
            variant="outlined"
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            Продовжити тест
          </Button>
          <Button
            onClick={async () => {
              setShowUnansweredDialog(false);
              setPendingFinish(false);
              const result = await finishAndSendResults?.();
              if (result) {
                setTestResult(result);
                setShowResults(true);
                clearAnswers();
              }
            }}
            color="error"
            variant="contained"
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            Завершити тест
          </Button>
        </DialogActions>
      </Dialog>
    </Box>    
  );
}