import { useEffect, useState } from "react";
import { getRandomQuestionsByDiscipline } from "../api/questionClient";
import { testSessionParameters } from "../constants"
import { shuffleArray } from "../utils/shuffleArray";
import type { Question } from "../types/pages/testpages/types";
import { storage } from "../utils/storage";

export function useTestSession(id?: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);

  const currentQuestion = shuffledQuestions[currentIndex];


  // Загрузка вопросов при монтировании, после чего идет перемешивание опций вопросов
  const ANSWERS_KEY = "test_answers";
  useEffect(() => {
    const fetchQuestions = async () => {
      if (id) {
          // ОЧИСТКА LS ПЕРЕД ЗАГРУЗКОЙ ВОПРОСОВ
          storage.remove(ANSWERS_KEY);

        const data: Question[] = await getRandomQuestionsByDiscipline(Number(id), testSessionParameters.numberOfQuestions);

        if (data) {
          setQuestions(data);

          const shuffled = data.map(q => ({
            ...q,
            options: shuffleArray(q.options),
          }));
          setShuffledQuestions(shuffled);
          
        }
      }
    };
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
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
  };
}
