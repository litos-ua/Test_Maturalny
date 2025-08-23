// Несколько хуков

import { useParams, useLocation } from "react-router-dom";
import { Box, Button, Typography, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { QuestionSingleChoice, QuestionDoubleChoice, QuestionMultipleChoice, QuestionMatching, QuestionCorrectSequence } from "./";
import { TestNavigation } from "./TestNavigation";
import { useTestSessionCombined, useTestAnswersCombined } from "../../hooks";
import { TestResultsDialog } from "./TestResultsDialog";
import { QuestionType } from "../../types/pages/testpages/types";
import { questionCircleStyle, questionHeaderStyle } from "./testSessionStyles"
import type { TestResult } from "../../types/pages/testpages/types";
import { useState, useMemo } from "react";
import { useAuth } from "../../context";

export function TestSessionPage() {
  const { id, name } = useParams();  // id - disciplineId
  const { authUser, isAuthenticated } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const testType = params.get("type") || "learn";
  //console.log (`TestSessionPage DisciplineId: ${id} DisciplineName: ${name}, UserId: ${authUser?.id}`)


  //const startSession = useTestSessionCombined(testType, id);
  const startSession = useTestSessionCombined(
  testType,
  authUser?.id,
  id ? parseInt(id) : undefined
);

  

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
  }, [shuffledQuestions]);;

  const finishSession = useTestAnswersCombined(testType, questions, startSession?.sessionId ?? null, leftItemsMap, id);


  const {
    answers,
    saveAnswer,
    clearAnswers,
    calculateResults,
    finishAndSendResults, // только для real
  } = finishSession




  // Вычисляем список отвеченных вопросов
  // questionId – это ключи в объекте answers, а значения – массив выбранных optionIds для каждого вопроса.
const answeredIds = Object.entries(answers)
  .filter(([questionId, optionIds]) => {
    const q = questions.find(q => q.id === Number(questionId));
    if (!q || !Array.isArray(optionIds)) return false;

    let requiredLength = 1; // По умолчанию хотя бы один ответ

    switch (q.type) {
      case QuestionType.Matching:
        requiredLength = 5;
        break;
      case QuestionType.CorrectSequence:
        requiredLength = 4;
        break;
      case QuestionType.MultipleChoice:
        requiredLength = 3;
        break;
      case QuestionType.DoubleChoice:
        requiredLength = 2;
        break;
    }

    if (requiredLength > 1) {
      return optionIds.length >= requiredLength &&
             optionIds.every(val => val !== undefined && val !== null);
    } else {
      return optionIds.some(val => val !== undefined && val !== null);
    }
  })
  .map(([questionId]) => Number(questionId));


  //   // Форматирование таймера
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
    console.log("Calling finishAndSendResults...");
    result = await finishAndSendResults();
    console.log("finishAndSendResults returned:", result);
  }

  // Если результат null (learn mode), вычисляем локально
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
  } else {
    console.warn("Result is still null, cannot show results dialog.");
  }
};



  if (!currentQuestion) return <Typography>Загрузка вопросов...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
     <Box sx={{ ...questionHeaderStyle }}>
       <Typography variant="h4">
         Тестування: питання за предметом {name}
       </Typography>

       <Typography variant="h6">
         Час: {formatTime(timeLeft)}
       </Typography>
     </Box>

     {/* Индикаторы вопросов */}

      <Grid container spacing={1} justifyContent="center" sx={{ mb: 4 }}>
  {questions.map((q, index) => (
    <Grid
          key={q.id}
          sx={{
            flex: {
              xs: "0 0 calc(100% / 6)",   // маленький экран: 6 в ряд
              sm: "0 0 calc(100% / 8)",   // средний экран: 8 в ряд
              lg: "0 0 calc(100% / 15)"   // большой экран: 15 в ряд
            },
            maxWidth: {
              xs: "calc(100% / 6)",
              sm: "calc(100% / 8)",
              lg: "calc(100% / 15)"
            }
          }}
        >
          <Paper
            onClick={() => setCurrentIndex(index)}
            sx={{
              ...questionCircleStyle,
              backgroundColor: index === currentIndex
                ? "secondary.main"                                    // текущий вопрос
                : answeredIds.includes(q.id)
                ? "success.light"                                     // вопрос уже отвечен
                : "grey.300",                                         // вопрос еще не отвечен
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

      {currentQuestion && currentQuestion.type === QuestionType.Matching && (
        <QuestionMatching
          key = {currentQuestion.id}  // Позволяет перерендерить компонент при переходе Matching → Matching
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

      {currentQuestion && currentQuestion.type === QuestionType.CorrectSequence && (
        <QuestionCorrectSequence
          key = {currentQuestion.id}
          question={currentQuestion}
          onAnswer={saveAnswer}
          savedAnswer={answers[currentQuestion.id] || []}
        />
      )}


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

      <TestResultsDialog
        open={showResults}
        onClose={() => setShowResults(false)}
        result={testResult}
        disciplineName={name || ""}
        disciplineId={id}
      />

      <Dialog open={showUnansweredDialog} onClose={() => setShowUnansweredDialog(false)}>
        <DialogTitle sx={{ color: 'red' }}>
          У вас є питання без відповідей.
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Ви впевнені, що хочете завершити тест або продовжити відповідати на питання?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowUnansweredDialog(false);
              setPendingFinish(false);
            }}
            color="primary"
            variant="outlined"
          >
            Продовжити тест
          </Button>
          
          <Button
            onClick={async () => {
              setShowUnansweredDialog(false);
              setPendingFinish(false);

              const result = await finishAndSendResults();

              if (result) {
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
                setTestResult(result);
                setShowResults(true);
                clearAnswers();
              }
            }}
            color="error"
            variant="contained"
          >
  Завершити тест
</Button>

        </DialogActions>
      </Dialog>
  

    </Box>

    
  );
}