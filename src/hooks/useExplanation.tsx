import { useState } from "react";
import { getExplanationByQuestionId } from "../api";

export function useExplanation() {
  const [cache, setCache] = useState<Record<number, string | null>>({});

  const fetchExplanation = async (id: number) => {
    if (cache[id] !== undefined) return cache[id];

    try {
      const data = await getExplanationByQuestionId(id);
      const explanation = data?.explanation ?? null;
      setCache(prev => ({ ...prev, [id]: explanation }));
      return explanation;
    } catch {
      setCache(prev => ({ ...prev, [id]: null }));
      return null;
    }
  };

  return { fetchExplanation, cache };
}
