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
import { ANCIENT_MEDIEVAL_COLUMNS } from './HistoryOfUkraine/Architecture';
import { FORMULAS_COLUMNS, FORMULAS_SHOW_ROW_NUMBERS } from './Math/formulasData';

// Імпорт конфігурацій для мистецтва
import { 
  ANCIENT_ART_COLUMNS, ANCIENT_ART_SHOW_ROW_NUMBERS,
  KYIVAN_RUS_ART_COLUMNS, KYIVAN_RUS_ART_SHOW_ROW_NUMBERS,
  RENAISSANCE_ART_COLUMNS, RENAISSANCE_ART_SHOW_ROW_NUMBERS,
  MODERN_ART_COLUMNS, MODERN_ART_SHOW_ROW_NUMBERS,
  CONTEMPORARY_ART_COLUMNS, CONTEMPORARY_ART_SHOW_ROW_NUMBERS
} from './HistoryOfUkraine/Art';

// Імпорт конфігурацій для карикатур
import { 
  PRE_SOVIET_COLUMNS, 
  PRE_SOVIET_SHOW_ROW_NUMBERS, SOVIET_EARLY_COLUMNS, SOVIET_EARLY_SHOW_ROW_NUMBERS,
  WW2_COLUMNS, WW2_SHOW_ROW_NUMBERS,POST_WAR_COLUMNS,BUREAUCRACY_COLUMNS,
  DEFICIT_COLUMNS, DEFICIT_SHOW_ROW_NUMBERS, SERVICE_COLUMNS, SERVICE_SHOW_ROW_NUMBERS,
  NESUNY_COLUMNS, NESUNY_SHOW_ROW_NUMBERS,BEZHOZ_COLUMNS, BEZHOZ_SHOW_ROW_NUMBERS,
  NENUZNAJA_PROD_COLUMNS, NENUZNAJA_PROD_SHOW_ROW_NUMBERS,PEREBUDOVA_COLUMNS, 
  PEREBUDOVA_SHOW_ROW_NUMBERS, UKRAINE_COLUMNS, UKRAINE_SHOW_ROW_NUMBERS,
} from './HistoryOfUkraine/Cartoons';

// Дженерик-интерфейс для материала
export interface MaterialItem<T = any> {
  id: string;
  title: string;
  description?: string;
  component: ComponentType<{ data: T }>;
  getData?: () => Promise<T>;
  pdfConfig: {
    columns: readonly {
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
export const CartoonsSection = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/CartoonsTable'));
export const ArtsTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/ArtsTable'));
export const ArchitectureTable = lazy(() => import('../../components/UsefulMaterials/HistoryOfUkraine/ArchitectureTable'));

// Конфиг с указанием конкретных типов для каждого материала
export const disciplineMaterialsConfig: Record<number, MaterialItem[]> = {
  // Історія України (ID = 1)
  1: [
    {
      id: "treaties-table",
      title: "Зведена таблиця історичних угод",
      description: "📜 Повний перелік міжнародних договорів, уній та конференцій від 860 до 2015 року",
      component: TreatiesTable,
      getData: async () => {
        try {
          const { treatiesData } = await import('./HistoryOfUkraine/treatiesTable');
          return treatiesData as Treaty[];
        } catch (error) {
            console.error('❌ [getData] Помилка завантаження treatiesData:', error);
            return []; 
          }
      },
      pdfConfig: {
        columns: TREATIES_COLUMNS,
        showRowNumbers: TREATIES_SHOW_ROW_NUMBERS,
      },
    },
    {
      id: "persons-table",
      title: "Зведена таблиця історичних персоналій",
      description: "👤 Повний перелік видатних історичних персоналій від часів Київської Русі до сучасної незалежної України",
      component: PersonsTable,
      getData: async () => {
        try {
          const { personsData } = await import('./HistoryOfUkraine/personsData');
          return personsData as Person[];
        } catch (error) {
            console.error('❌ [getData] Помилка завантаження personsData:', error);
            return []; 
          }
      },
      pdfConfig: {
        columns: PERSONS_COLUMNS,
        showRowNumbers: PERSONS_SHOW_ROW_NUMBERS,
      },
    },
    {
      id: "hetmans-table",
      title: "Гетьмани України",
      description: "🎖️ Перелік гетьманів України періоду Козацької доби та Руїни (1648–1764)",
      component: HetmanOfRuinsTimeTable,
      getData: async () => {
        try {
          const { hetmansData } = await import('./HistoryOfUkraine/hetmansData');
          return hetmansData as HetmanOfRuins[];
        } catch (error) {
            console.error('❌ [getData] Помилка завантаження hetmansData:', error);
            return []; 
          }
      },
      pdfConfig: {
        columns: HETMANS_COLUMNS,
        showRowNumbers: HETMANS_SHOW_ROW_NUMBERS,
      },
    },
    {
      id: "women-in-history-table",
      title: "Жінки, які вплинули на історію України",
      description: "👩 Видатні жінки України від княжої доби до незалежності",
      component: WomenInHistoryTable,
      
        getData: async () => {
          try {
            const { womenData } = await import('./HistoryOfUkraine/womenData');
            return womenData as Woman[];
          } catch (error) {
            console.error('❌ [getData] Помилка завантаження womenData:', error);
            return []; 
          }
        },
      pdfConfig: {
        columns: WOMEN_COLUMNS as any,
        showRowNumbers: WOMEN_SHOW_ROW_NUMBERS,
      },
    },

    {
      id: "architecture-section",
      title: "🏛️ Пам'ятки архітектури України",
      description: "Від античності до сучасності (хронологічний поділ)",
      component: ArchitectureTable,
      getData: async () => {
        try {
          const architecture = await import('./HistoryOfUkraine');  // ← Виправлено шлях
          return {
            ancientMedievalData: architecture.ancientMedievalData || [],
            earlyModernData: architecture.earlyModernData || [],
            modernData: architecture.modernData || [],
            contemporaryData: architecture.contemporaryData || [],
          };
        } catch (error) {
          console.error('❌ [getData] Помилка завантаження architectureData:', error);
          return {
            ancientMedievalData: [],
            earlyModernData: [],
            modernData: [],
            contemporaryData: [],
          };
        }
      },
      pdfConfig: {
        columns: ANCIENT_MEDIEVAL_COLUMNS as any,  
        showRowNumbers: true,
      },
    },

    // ==================== ОБРАЗОТВОРЧЕ МИСТЕЦТВО ====================
    {
      id: "arts-section",
      title: "🎨 Твори образотворчого мистецтва України",
      description: "Від найдавніших часів до сучасності",
      component: ArtsTable,
      getData: async () => {
        try {
          const art = await import('./HistoryOfUkraine/Art');
          return {
            ancientArtData: art.ancientArtData || [],
            kyivanRusArtData: art.kyivanRusArtData || [],
            renaissanceArtData: art.renaissanceArtData || [],
            modernArtData: art.modernArtData || [],
            contemporaryArtData: art.contemporaryArtData || [],
          };
        } catch (error) {
          console.error('❌ [getData] Помилка завантаження artData:', error);
          return {
            ancientArtData: [],
            kyivanRusArtData: [],
            renaissanceArtData: [],
            modernArtData: [],
            contemporaryArtData: [],
          };
        }
      },
      pdfConfig: {
        columns: ANCIENT_ART_COLUMNS as any,
        showRowNumbers: true,
      },
    },


    // ==================== КАРИКАТУРИ ====================

    {
      id: "cartoons-section",
      title: "Сатиричні карикатури",
      description: "🎭 Політична сатира в історії України (XVIII–XX ст.)",
      component: CartoonsSection,
      getData: async () => {
        // console.log('🔍 [getData] Початок завантаження карикатур...');
        
        try {
          const cartoons = await import('./HistoryOfUkraine/Cartoons');
          
          return {
            preSovietData: cartoons.preSovietData || [],
            sovietEarlyData: cartoons.sovietEarlyData || [],
            ww2Data: cartoons.ww2Data || [],
            postWarData: cartoons.postWarData || [],
            bureaucracyData: cartoons.bureaucracyData || [],
            deficitData: cartoons.deficitData || [],
            serviceData: cartoons.serviceData || [],
            nesunyData: cartoons.nesunyData || [],
            bezhozData: cartoons.bezhozData || [],
            nenuzhnajaProdData: cartoons.nenuzhnajaProdData || [],
            perebudovaData: cartoons.perebudovaData || [],
            ukraineData: cartoons.ukraineData || [],
          };
        } catch (error) {
          console.error('❌ [getData] Помилка завантаження:', error);
          return {
            preSovietData: [],
            sovietEarlyData: [],
            ww2Data: [],
            postWarData: [],
            bureaucracyData: [],
            deficitData: [],
            serviceData: [],
            nesunyData: [],
            bezhozData: [],
            nenuzhnajaProdData: [],
            perebudovaData: [],
            ukraineData: [],
          };
        }
      },
      pdfConfig: {
        columns: PRE_SOVIET_COLUMNS as any,
        showRowNumbers: true,
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
        try {
          const { formulasData } = await import('./Math/formulasData');
          return formulasData as Formula[];
        } catch (error) {
            console.error('❌ [getData] Помилка завантаження formulasData:', error);
            return []; 
          }
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