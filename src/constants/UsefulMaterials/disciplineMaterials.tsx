// // constants/UsefulMaterials/index.ts

// import { lazy } from 'react';
// import type { ComponentType } from 'react';
// import type { Treaty } from './HistoryOfUkraine/treatiesTable';
// import type { Person } from './HistoryOfUkraine/personsData';
// import type { Formula } from './Math/formulasData';
// import type { HetmanOfRuins } from './HistoryOfUkraine/hetmansData';

// // Дженерик-интерфейс для материала
// export interface MaterialItem<T = any> {
//   id: string;
//   title: string;
//   description?: string;
//   component: ComponentType<{ data: T }>;  // Компонент принимает data типа T
//   getData?: () => Promise<T>;              // Функция возвращает Promise<T>
// }

// // Ленивая загрузка компонентов
// export const TreatiesTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/TreatiesTable'));
// export const PersonsTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/PersonsTable'));
// export const FormulasTable = lazy(() => import('../../components/UsefulMaterials/Math/FormulasTable'));
// export const HetmanOfRuinsTimeTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/HetmansOfRuinTimeTable'));
// export const WomenInHistoryTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/WomenInHistoryTable'));

// // Конфиг с указанием конкретных типов для каждого материала
// export const disciplineMaterialsConfig: Record<number, MaterialItem[]> = {
//   // Історія України (ID = 1)
//   1: [
//     {
//       id: "treaties-table",
//       title: "Зведена таблиця історичних угод",
//       description: "Повний перелік міжнародних договорів, уній та конференцій від 860 до 2015 року",
//       component: TreatiesTable,  // TreatiesTable ожидает data: Treaty[]
//       getData: async () => {
//         const { treatiesData } = await import('./HistoryOfUkraine/treatiesTable');
//         return treatiesData as Treaty[];  // 👈 Явное приведение типа
//       },
//     },
//     {
//       id: "persons-table",
//       title: "Зведена таблиця історичних персоналій",
//       description: "Повний перелік видатних історичних персоналій...",
//       component: PersonsTable,   // PersonsTable ожидает data: Person[]
//       getData: async () => {
//         const { personsData } = await import('./HistoryOfUkraine/personsData');
//         return personsData as Person[];
//       },
//     },
//     {
//       id: "hetmans-table",
//       title: "Гетьмани України",
//       description: "Перелік гетьманів України періоду Козацької доби та Руїни (1648–1764)",
//       component: HetmanOfRuinsTimeTable,
//       getData: async () => {
//         const { hetmansData } = await import('./HistoryOfUkraine/hetmansData');
//         return hetmansData as HetmanOfRuins[];
//       },
//     },
//     {
//       id: "women-in-history-table",
//       title: "Жінки, які вплинули на історію України",
//       description: "Видатні жінки України від княжої доби до незалежності",
//       component: WomenInHistoryTable,
//       getData: async () => {
//         const { womenData } = await import('./HistoryOfUkraine/womenData');
//         return womenData;
//       },
//     },
//   ],
  
//   // Математика (ID = 2)
//   2: [
//     {
//       id: "formulas-table",
//       title: "Основні математичні формули",
//       description: "Повний збірник формул з алгебри, геометрії, тригонометрії та аналізу",
//       component: FormulasTable,  // FormulasTable ожидает data: Formula[]
//       getData: async () => {
//         const { formulasData } = await import('./Math/formulasData');
//         return formulasData as Formula[];
//       },
//     },
//   ],
  
//     // Інформатика (ID = 3) - пока пусто
//   3: [],
  
//   // Фізика (ID = 4) - пока пусто
//   4: [],
  
//   // Англійська мова (ID = 5) - пока пусто
//   5: [],
  
//   // Українська мова (ID = 6) - пока пусто
//   6: [],
  
//   // Польська мова (ID = 7) - пока пусто
//   7: [],
  
//   // Хімія (ID = 1001) - пока пусто
//   1001: [],

// };



// Универсальный конфиг для вывода и pdf
// constants/UsefulMaterials/disciplineMaterials.ts

import { lazy } from 'react';
import type { ComponentType } from 'react';
import type { Treaty } from './HistoryOfUkraine/treatiesTable';
import type { Person } from './HistoryOfUkraine/personsData';
import type { Formula } from './Math/formulasData';
import type { HetmanOfRuins } from './HistoryOfUkraine/hetmansData';
import type { Woman } from './HistoryOfUkraine/womenData';

// Імпорт конфігурацій для PDF
import { TREATIES_COLUMNS, TREATIES_SHOW_ROW_NUMBERS } from './HistoryOfUkraine/treatiesTable';
import { PERSONS_COLUMNS, PERSONS_SHOW_ROW_NUMBERS } from './HistoryOfUkraine/personsData';
import { HETMANS_COLUMNS, HETMANS_SHOW_ROW_NUMBERS } from './HistoryOfUkraine/hetmansData';
import { WOMEN_COLUMNS, WOMEN_SHOW_ROW_NUMBERS } from './HistoryOfUkraine/womenData';
import { FORMULAS_COLUMNS, FORMULAS_SHOW_ROW_NUMBERS } from './Math/formulasData';

// Дженерик-интерфейс для материала
export interface MaterialItem<T = any> {
  id: string;
  title: string;
  description?: string;
  component: ComponentType<{ data: T }>;
  getData?: () => Promise<T>;
  pdfConfig: {
    columns: readonly {  // 👈 Додати "readonly"
      header: string;
      accessor: string | ((row: any) => string);
      width?: number | 'auto';
    }[];
    showRowNumbers: boolean;
  };
}

// Ленивая загрузка компонентов
export const TreatiesTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/TreatiesTable'));
export const PersonsTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/PersonsTable'));
export const FormulasTable = lazy(() => import('../../components/UsefulMaterials/Math/FormulasTable'));
export const HetmanOfRuinsTimeTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/HetmansOfRuinTimeTable'));
export const WomenInHistoryTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/WomenInHistoryTable'));

// Конфиг с указанием конкретных типов для каждого материала
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
        return treatiesData as Treaty[];
      },
      pdfConfig: {
        columns: TREATIES_COLUMNS,
        showRowNumbers: TREATIES_SHOW_ROW_NUMBERS,
      },
    },
    {
      id: "persons-table",
      title: "Зведена таблиця історичних персоналій",
      description: "Повний перелік видатних історичних персоналій від часів Київської Русі до сучасної незалежної України",
      component: PersonsTable,
      getData: async () => {
        const { personsData } = await import('./HistoryOfUkraine/personsData');
        return personsData as Person[];
      },
      pdfConfig: {
        columns: PERSONS_COLUMNS,
        showRowNumbers: PERSONS_SHOW_ROW_NUMBERS,
      },
    },
    {
      id: "hetmans-table",
      title: "Гетьмани України",
      description: "Перелік гетьманів України періоду Козацької доби та Руїни (1648–1764)",
      component: HetmanOfRuinsTimeTable,
      getData: async () => {
        const { hetmansData } = await import('./HistoryOfUkraine/hetmansData');
        return hetmansData as HetmanOfRuins[];
      },
      pdfConfig: {
        columns: HETMANS_COLUMNS,
        showRowNumbers: HETMANS_SHOW_ROW_NUMBERS,
      },
    },
    {
      id: "women-in-history-table",
      title: "Жінки, які вплинули на історію України",
      description: "Видатні жінки України від княжої доби до незалежності",
      component: WomenInHistoryTable,
      getData: async () => {
        const { womenData } = await import('./HistoryOfUkraine/womenData');
        return womenData as Woman[];
      },
      pdfConfig: {
        columns: WOMEN_COLUMNS,
        showRowNumbers: WOMEN_SHOW_ROW_NUMBERS,
      },
    },
  ],
  
  // Математика (ID = 2)
  2: [
    {
      id: "formulas-table",
      title: "Основні математичні формули",
      description: "Повний збірник формул з алгебри, геометрії, тригонометрії та аналізу",
      component: FormulasTable,
      getData: async () => {
        const { formulasData } = await import('./Math/formulasData');
        return formulasData as Formula[];
      },
      pdfConfig: {
        columns: FORMULAS_COLUMNS,
        showRowNumbers: FORMULAS_SHOW_ROW_NUMBERS,
      },
    },
  ],
  
  // Інформатика (ID = 3) - поки пусто
  3: [],
  
  // Фізика (ID = 4) - поки пусто
  4: [],
  
  // Англійська мова (ID = 5) - поки пусто
  5: [],
  
  // Українська мова (ID = 6) - поки пусто
  6: [],
  
  // Польська мова (ID = 7) - поки пусто
  7: [],
  
  // Хімія (ID = 1001) - поки пусто
  1001: [],
};

// Вспомогательная функция для проверки наличия материалов
export const hasMaterials = (disciplineId: number): boolean => {
  const materials = disciplineMaterialsConfig[disciplineId];
  return materials !== undefined && materials.length > 0;
};