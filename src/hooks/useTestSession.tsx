// import { useEffect, useState } from "react";
// import { getRandomQuestionsByDiscipline } from "../api/questionClient";
// import { testSessionParameters } from "../constants"
// import { shuffleArray } from "../utils/shuffleArray";
// import type { Question } from "../types/pages/testpages/types";
// import { storage } from "../utils/storage";

// export function useTestSession(id?: string) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(3600);

//   const currentQuestion = shuffledQuestions[currentIndex];


//   // Загрузка вопросов при монтировании, после чего идет перемешивание опций вопросов
//   const ANSWERS_KEY = "test_answers";
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (id) {
//           // ОЧИСТКА LS ПЕРЕД ЗАГРУЗКОЙ ВОПРОСОВ
//           storage.remove(ANSWERS_KEY);

//         const data: Question[] = await getRandomQuestionsByDiscipline(Number(id), testSessionParameters.numberOfQuestions);

//         if (data) {
//           setQuestions(data);

//           const shuffled = data.map(q => ({
//             ...q,
//             options: shuffleArray(q.options),
//           }));
//           setShuffledQuestions(shuffled);
          
//         }
//       }
//     };
//     fetchQuestions();
//   }, [id]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return {
//     sessionId: null,
//     questions,
//     shuffledQuestions,
//     currentIndex,
//     setCurrentIndex,
//     timeLeft,
//     currentQuestion,
//   };
// }


// Добавляем обработку теста по темам

import { useEffect, useState } from "react";
import { getRandomQuestionsByDiscipline, getQuestionsByTopic } from "../api/questionClient";
import { testSessionParameters } from "../constants"
import { shuffleArray } from "../utils/shuffleArray";
import type { Question } from "../types/pages/testpages/types";
import { storage } from "../utils/storage";

export function useTestSession(disciplineId?: string, topicId?: number) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [loading, setLoading] = useState(true);

  const currentQuestion = shuffledQuestions[currentIndex];

  const ANSWERS_KEY = "test_answers";

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      
      try {
        let data: Question[] = [];
        
        // НОВОЕ: если есть topicId — загружаем ВСЕ вопросы по теме
        if (topicId) {
          console.log(`📚 Загружаем вопросы по теме ID: ${topicId}`);
          data = await getQuestionsByTopic(topicId);
          console.log(`✅ Загружено ${data.length} вопросов по теме`);
          
          // Очищаем localStorage перед загрузкой вопросов по теме
          storage.remove(ANSWERS_KEY);
          
          // Для теста по теме не ограничиваем количество вопросов
          if (data && data.length > 0) {
            setQuestions(data);
            
            // Перемешиваем опции внутри каждого вопроса
            const shuffled = data.map(q => ({
              ...q,
              options: shuffleArray(q.options),
            }));
            setShuffledQuestions(shuffled);
            
            // Устанавливаем время: 2 минуты на вопрос
            const timePerQuestion = 120;
            setTimeLeft(data.length * timePerQuestion);
          }
        } 
        // 🔹 СУЩЕСТВУЮЩЕЕ: загружаем по дисциплине (30 случайных)
        else if (disciplineId) {
          console.log(`📚 Загружаем вопросы по дисциплине ID: ${disciplineId}`);
          
          // Очистка LS перед загрузкой вопросов
          storage.remove(ANSWERS_KEY);

          data = await getRandomQuestionsByDiscipline(
            Number(disciplineId), 
            testSessionParameters.numberOfQuestions
          );

          if (data && data.length > 0) {
            setQuestions(data);

            const shuffled = data.map(q => ({
              ...q,
              options: shuffleArray(q.options),
            }));
            setShuffledQuestions(shuffled);
            
            // Существующая логика таймера (1 час)
            setTimeLeft(3600);
          }
        }
        
      } catch (error) {
        console.error("❌ Ошибка загрузки вопросов:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [disciplineId, topicId]); // Добавляем topicId в зависимости

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return {
    sessionId: null,
    questions,
    shuffledQuestions,
    currentIndex,
    setCurrentIndex,
    timeLeft,
    currentQuestion,
    loading,  // Добавляем loading для отображения состояния загрузки
  };
}