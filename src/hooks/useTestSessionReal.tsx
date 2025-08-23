// Обьединенный метод (вопросы и старт сессии). Пока не проверен.
import { useEffect, useState } from "react";
import { testSessionService } from "../services";
import { testSessionParameters } from "../constants";
import type {
  RealTestSessionResult,
  StartExamRequestDto,
  QuestionDto,
  Question,
  AnswerOptionDto,
  QuestionType,
} from "../types";

export function useTestSessionReal(
  userId?: number,
  disciplineId?: number, // ✅ Передаём disciplineId
  description: string = "",
  timeLimitSeconds: number = testSessionParameters.totalCount
) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState(testSessionParameters.totalCount);
  //console.log (`Hook useTestSessionReal is starting`);

  useEffect(() => {
    if (!userId || !disciplineId) return;
    console.log (`useEffect in the  useTestSessionReal is starting`);
    const alreadyCreating = sessionStorage.getItem("testSessionCreating");
    if (alreadyCreating) return;

    const load = async () => {
      try {
        sessionStorage.setItem("testSessionCreating", "true");

        const dto: StartExamRequestDto = {
          userId,
          disciplineId,
          description,
          timeLimitSeconds,
        };

        const result: RealTestSessionResult = await testSessionService.startRealTest(dto);

        setSessionId(result.sessionId);

        // ✅ Маппинг из QuestionDto[] в Question[]
        const mappeddQuestions: Question[] = result.questions.map((q) => ({
          id: q.id,
          text: q.text,
          imageUrl: q.imageUrl,
          type: q.type,
          topicId: 2,         // или q.topicId, если есть
          difficulty: 1,      // или q.difficulty, если есть
          maxScore: 1,        // или q.maxScore, если есть
          options: q.options.map((opt) => ({
            ...opt,
            isCorrect: false,    // добавляем обязательное поле
          })),
        }));


        setQuestions(mappeddQuestions);

        // // Перемешивание опций
        // const shuffled: Question[] = mappeddQuestions.map((q) => ({
        //   ...q,
        //   options: [...q.options].sort(() => Math.random() - 0.5),
        // }));

        // setShuffledQuestions(shuffled);

        setQuestions(mappeddQuestions);
        setShuffledQuestions(mappeddQuestions); // ⬅ только временная заглушка
        
      } catch (e) {
        console.error("Failed to start test session", e);
      } finally {
        setIsLoading(false);
        sessionStorage.removeItem("testSessionCreating"); // ✅ флаг сессии в SessionStorage снимается
      }

    };

    load();
  }, [userId, disciplineId]);

    useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return {
    sessionId: sessionId ?? null,
    //session,
    questions,
    shuffledQuestions,
    currentIndex,
    setCurrentIndex,
    timeLeft,
    currentQuestion: shuffledQuestions[currentIndex] ?? null,
    isLoading, 
};

}
