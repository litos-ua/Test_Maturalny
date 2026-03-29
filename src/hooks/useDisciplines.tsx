import { useState, useEffect, useCallback } from "react";
import { fetchDisciplines } from "../api/disciplineClient";

interface Discipline {
  id: number;
  name: string;
}

// Кэш для хранения дисциплин между вызовами хука
let cachedDisciplines: Discipline[] | null = null;
let isFetching = false;
let fetchPromise: Promise<Discipline[]> | null = null;

export function useDisciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>(cachedDisciplines || []);
  const [loading, setLoading] = useState(!cachedDisciplines);
  const [error, setError] = useState<string | null>(null);

  const loadDisciplines = useCallback(async () => {
    // Если уже есть кэш, используем его
    if (cachedDisciplines) {
      setDisciplines(cachedDisciplines);
      setLoading(false);
      return;
    }

    // Если уже идет загрузка, ждем ее
    if (isFetching && fetchPromise) {
      try {
        const data = await fetchPromise;
        setDisciplines(data);
        setLoading(false);
      } catch (err) {
        setError("Ошибка загрузки дисциплин");
      }
      return;
    }

    isFetching = true;
    fetchPromise = fetchDisciplines() as Promise<Discipline[]>;
    
    try {
      const data = await fetchPromise;
      if (Array.isArray(data)) {
        cachedDisciplines = data;
        setDisciplines(data);
      } else {
        setDisciplines([]);
      }
    } catch (err) {
      setError("Ошибка загрузки дисциплин");
      console.error(err);
    } finally {
      setLoading(false);
      isFetching = false;
      fetchPromise = null;
    }
  }, []);

  useEffect(() => {
    loadDisciplines();
  }, [loadDisciplines]);

  return { disciplines, loading, error, refetch: loadDisciplines };
}