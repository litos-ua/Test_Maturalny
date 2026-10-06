// // Обьединенный метод (вопросы и старт сессии). Пока не проверен.
// import { useEffect, useState } from "react";
// import { testSessionService } from "../services";
// import { testSessionParameters } from "../constants";
// import type {
//   RealTestSessionResult,
//   StartExamRequestDto,
//   QuestionDto,
//   Question,
//   //AnswerOptionDto,
//   //QuestionType,
// } from "../types";

// export function useTestSessionReal(
//   userId?: number,
//   disciplineId?: number, // ✅ Передаём disciplineId
//   description: string = "",
//   timeLimitSeconds: number = testSessionParameters.totalCount
// ) {
//   const [sessionId, setSessionId] = useState<number | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isEmpty, setIsEmpty] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState(testSessionParameters.totalCount);


//   useEffect(() => {
//     // 🔑 ОЧИЩУЄМО ПРИ МОНТУВАННІ (захист від "залипання")
//     sessionStorage.removeItem("testSessionCreating");
//     console.log('🔍 useEffect start');
    
//     if (!userId || !disciplineId) return;
//     const alreadyCreating = sessionStorage.getItem("testSessionCreating");
//     //if (alreadyCreating) return;
//       if (alreadyCreating) {
//         console.log('⚠️ Test session already creating, skipping...');
//         return;
//       }

//     const load = async () => {
//       try {
//         console.log('🔍 Starting load...');
//         sessionStorage.setItem("testSessionCreating", "true");

//         const dto: StartExamRequestDto = {
//           userId,
//           disciplineId,
//           description,
//           timeLimitSeconds,
//         };
//         console.log('🔍 Sending request:', dto);
//         const result: RealTestSessionResult = await testSessionService.startRealTest(dto);
//         console.log('✅ Result:', result);
//         setSessionId(result.sessionId);

//         // //✅ Маппинг из QuestionDto[] в Question[]
//         // const mappeddQuestions: Question[] = result.questions.map((q) => ({
//         //   id: q.id,
//         //   text: q.text,
//         //   imageUrl: q.imageUrl,
//         //   type: q.type,
//         //   topicId: 2,         // или q.topicId, если есть
//         //   difficulty: 1,      // или q.difficulty, если есть
//         //   maxScore: 1,        // или q.maxScore, если есть
//         //   options: q.options.map((opt) => ({
//         //     ...opt,
//         //     isCorrect: false,    // добавляем обязательное поле
//         //   })),
//         // }));

//         const mappeddQuestions: Question[] = result.questions.map((q) => ({
//           id: q.id,
//           text: q.text,
//           imageUrl: q.imageUrl,
//           type: q.type,
//           topicId: q.topicId ?? 2,              // 🔑 З СЕРВЕРА
//           difficulty: q.difficulty ?? 1,        // 🔑 З СЕРВЕРА
//           maxScore: q.maxScore ?? 1,            // 🔑 З СЕРВЕРА
//           options: q.options.map((opt) => ({
//             ...opt,
//             isCorrect: opt.isCorrect ?? false,  // 🔑 З СЕРВЕРА 
//           })),
//         }));


//         setQuestions(mappeddQuestions);

//         // // Перемешивание опций
//         // const shuffled: Question[] = mappeddQuestions.map((q) => ({
//         //   ...q,
//         //   options: [...q.options].sort(() => Math.random() - 0.5),
//         // }));

//         // setShuffledQuestions(shuffled);

//         setQuestions(mappeddQuestions);
//         setShuffledQuestions(mappeddQuestions); // ⬅ только временная заглушка
        
//       } catch (e) {
//         console.error("Failed to start test session", e);
//       } finally {
//         setIsLoading(false);
//         sessionStorage.removeItem("testSessionCreating"); // ✅ флаг сессии в SessionStorage снимается
//       }

//     };

//     load();
//   }, [userId, disciplineId]);

//     useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return {
//     sessionId: sessionId ?? null,
//     //session,
//     questions,
//     shuffledQuestions,
//     currentIndex,
//     setCurrentIndex,
//     timeLeft,
//     currentQuestion: shuffledQuestions[currentIndex] ?? null,
//     isLoading, 
// };

// }


// Добавлено состояние isEmpty для случая отсутствия вопросов по дисциплине
import { useEffect, useState } from "react";
import { testSessionService } from "../services";
import { testSessionParameters } from "../constants";
import type {
  RealTestSessionResult,
  StartExamRequestDto,
  Question,
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
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(testSessionParameters.totalCount);

  useEffect(() => {
    // 🔑 ОЧИЩУЄМО ПРИ МОНТУВАННІ (захист від "залипання")
    sessionStorage.removeItem("testSessionCreating");
    console.log('🔍 useEffect start');
    
    if (!userId || !disciplineId) {
      console.log('⚠️ Missing userId or disciplineId');
      setIsLoading(false);  // 🔑 не залишаємо в стані завантаження
      setIsEmpty(true);     // 🔑 показуємо порожній стан
      return;
    }
    
    const alreadyCreating = sessionStorage.getItem("testSessionCreating");
    //if (alreadyCreating) return;
    if (alreadyCreating) {
      console.log('⚠️ Test session already creating, skipping...');
      return;
    }

    const load = async () => {
      try {
        console.log('🔍 Starting load...');
        sessionStorage.setItem("testSessionCreating", "true");

        const dto: StartExamRequestDto = {
          userId,
          disciplineId,
          description,
          timeLimitSeconds,
        };
        console.log('🔍 Sending request:', dto);
        
        const result: RealTestSessionResult = await testSessionService.startRealTest(dto);
        console.log('✅ Result:', result);

        // 🔑 ПЕРЕВІРКА: чи є питання?
        if (!result.questions || result.questions.length === 0) {
          console.warn('⚠️ No questions available for this discipline');
          setIsEmpty(true);
          return;  // 🔑 не встановлюємо порожні питання
        }

        setSessionId(result.sessionId);

        const mappeddQuestions: Question[] = result.questions.map((q) => ({
          id: q.id,
          text: q.text,
          imageUrl: q.imageUrl,
          type: q.type,
          topicId: q.topicId ?? 2,              // 🔑 С СЕРВЕРА
          difficulty: q.difficulty ?? 1,        // 🔑 С СЕРВЕРА
          maxScore: q.maxScore ?? 1,            // 🔑 С СЕРВЕРА
          options: q.options.map((opt) => ({
            ...opt,
            isCorrect: opt.isCorrect ?? false,  // 🔑 С СЕРВЕРА 
          })),
        }));

        setQuestions(mappeddQuestions);
        setShuffledQuestions(mappeddQuestions); // ⬅ только временная заглушка
        
      } catch (e) {
        console.error("❌ Failed to start test session", e);
        setIsEmpty(true);  // 🔑 при помилці показуємо порожній стан
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
    questions,
    shuffledQuestions,
    currentIndex,
    setCurrentIndex,
    timeLeft,
    currentQuestion: shuffledQuestions[currentIndex] ?? null,
    isLoading,  // loading для отображения состояния загрузки
    isEmpty,    // isEmpty для отображения состояния отсутствия вопросов по дисциплине
  };
}
