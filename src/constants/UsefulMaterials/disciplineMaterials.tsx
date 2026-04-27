import { lazy} from 'react';
import type { ReactNode } from 'react';

export interface MaterialItem {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<any>;  // Компонент для отображения
  getData?: () => Promise<any>;          // Опциональная функция для загрузки данных
}

// Ленивая загрузка компонентов
export const TreatiesTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/TreatiesTable'));
export const PersonsTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/PersonsTable'));
// Для будущих материалов:
// const MathFormulas = lazy(() => import('../../components/UsefulMaterials/MathFormulas'));
// const PhysicsFormulas = lazy(() => import('../../components/UsefulMaterials/PhysicsFormulas'));

export const disciplineMaterialsConfig: Record<number, MaterialItem[]> = {
  // Історія України (ID = 1)
  1: [
    {
      id: "treaties-table",
      title: "Зведена таблиця історичних угод",
      description: "Повний перелік міжнародних договорів, уній та конференцій від 860 до 2015 року",
      component: TreatiesTable,
      getData: async () => {
        const { treatiesData } = await import('./HistoryOfUkraine/treatiesTable');
        return treatiesData;
      },
    },
    {
      id: "persons-table",
      title: "Зведена таблиця історичних персоналій",
      description: "Повний перелік видатних історичних персоналій від часів Київської Русі до сучасної незалежної України",
      component: PersonsTable,
      getData: async () => {
        const { personsData } = await import('./HistoryOfUkraine/personsData');
        return personsData;
      },
    },
  ],
  
  // Математика (ID = 2) - пока пусто
  2: [],
  
  // Інформатика (ID = 3) - пока пусто
  3: [],
  
  // Фізика (ID = 4) - пока пусто
  4: [],
  
  // Англійська мова (ID = 5) - пока пусто
  5: [],
  
  // Українська мова (ID = 6) - пока пусто
  6: [],
  
  // Польська мова (ID = 7) - пока пусто
  7: [],
  
  // Хімія (ID = 1001) - пока пусто
  1001: [],
};

// Вспомогательная функция для проверки наличия материалов
export const hasMaterials = (disciplineId: number): boolean => {
  const materials = disciplineMaterialsConfig[disciplineId];
  return materials !== undefined && materials.length > 0;
};