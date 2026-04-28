// // utils/pdfExportUniversal.tsx  На базе jspdf. Работает, но не отображает кириллицу.

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// // ==================== ІНТЕРФЕЙСИ ====================
// interface ColumnDef {
//   header: string;
//   accessor: string | ((row: any) => string);
//   width?: number | 'auto';
// }

// interface TableConfig {
//   columns: ColumnDef[];
//   title?: string;
//   showRowNumbers?: boolean;
// }

// // ==================== КОНФІГУРАЦІЇ ТАБЛИЦЬ ====================
// const tableConfigs: Record<string, TableConfig> = {
//   treaties: {
//     columns: [
//       { header: 'Угода', accessor: 'treaty', width: 50 },
//       { header: 'Рік', accessor: 'year', width: 15 },
//       { header: 'Сторони', accessor: 'parties', width: 50 },
//       { header: 'Опис', accessor: 'description', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
//   persons: {
//     columns: [
//       { header: 'Персоналія', accessor: 'name', width: 40 },
//       { header: 'Роки життя', accessor: 'years', width: 20 },
//       { header: 'Категорія', accessor: (row: any) => `${row.categoryIcon || ''} ${row.category}`, width: 50 },
//       { header: 'Опис', accessor: 'description', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
//   hetmans: {
//     columns: [
//       { header: 'Гетьман', accessor: 'name', width: 35 },
//       { header: 'Роки правління', accessor: 'rulingYears', width: 20 },
//       { header: 'Територія', accessor: 'territory', width: 30 },
//       { header: 'Орієнтація', accessor: 'orientation', width: 35 },
//       { header: 'Ключові угоди', accessor: 'keyTreaties', width: 50 },
//       { header: 'Характеристика', accessor: 'description', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
//   formulas: {
//     columns: [
//       { header: 'Розділ', accessor: (row: any) => `${row.sectionIcon || '📐'} ${row.section}`, width: 40 },
//       { header: 'Назва', accessor: 'title', width: 50 },
//       { header: 'Формула', accessor: 'formula', width: 60 },
//       { header: 'Опис', accessor: (row: any) => row.description || '', width: 'auto' },
//     ],
//     showRowNumbers: false,
//   },
// };

// // ==================== ДОПОМІЖНІ ФУНКЦІЇ ====================

// // Визначення типу таблиці за ID матеріалу
// const getTableTypeById = (materialId: string): string | null => {
//   if (materialId.includes('treaties')) return 'treaties';
//   if (materialId.includes('persons')) return 'persons';
//   if (materialId.includes('hetmans')) return 'hetmans';
//   if (materialId.includes('formulas')) return 'formulas';
//   return null;
// };

// // Визначення типу таблиці за структурою даних
// const detectTableTypeByData = (data: any[]): string | null => {
//   if (!data || data.length === 0) return null;
  
//   const firstItem = data[0];
  
//   if (firstItem.treaty && firstItem.year && firstItem.parties) return 'treaties';
//   if (firstItem.name && firstItem.years && !firstItem.treaty) return 'persons';
//   if (firstItem.rulingYears !== undefined && firstItem.territory) return 'hetmans';
//   if (firstItem.formula && firstItem.section) return 'formulas';
  
//   return null;
// };

// // Отримання значення з рядка
// const getValue = (row: any, accessor: string | ((row: any) => string)): string => {
//   if (typeof accessor === 'function') {
//     return accessor(row);
//   }
//   const value = row[accessor];
//   return value !== undefined && value !== null ? String(value) : '';
// };

// // ==================== ОСНОВНА ФУНКЦІЯ ЕКСПОРТУ ====================

// export const exportTableToPDF = async (
//   data: any[],
//   disciplineName: string,
//   title: string,
//   materialId?: string
// ): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     try {
//       // Перевірка вхідних даних
//       if (!data || !Array.isArray(data) || data.length === 0) {
//         reject(new Error('Немає даних для експорту'));
//         return;
//       }

//       // Визначення типу таблиці
//       let tableType: string | null = null;
      
//       if (materialId) {
//         tableType = getTableTypeById(materialId);
//       }
      
//       if (!tableType) {
//         tableType = detectTableTypeByData(data);
//       }
      
//       if (!tableType) {
//         reject(new Error(`Не вдалося визначити тип таблиці для матеріалу: ${title}`));
//         return;
//       }
      
//       const config = tableConfigs[tableType];
//       if (!config) {
//         reject(new Error(`Немає конфігурації для типу таблиці: ${tableType}`));
//         return;
//       }
      
//       // Визначення орієнтації сторінки
//       const isLandscape = config.columns.length > 4;
//       const doc = new jsPDF({
//         orientation: isLandscape ? 'landscape' : 'portrait',
//         unit: 'mm',
//         format: 'a4',
//       });
      
//       // Додавання заголовків
//       let y = 20;
      
//       doc.setFontSize(16);
//       doc.text('📚 Корисні матеріали', 14, y);
//       y += 10;
      
//       doc.setFontSize(14);
//       doc.text(disciplineName, 14, y);
//       y += 8;
      
//       doc.setFontSize(12);
//       doc.text(title, 14, y);
//       y += 5;
      
//       doc.line(14, y, isLandscape ? 280 : 190, y);
//       y += 8;
      
//       // Підготовка даних для таблиці
//       const headers = config.columns.map((col: ColumnDef) => col.header);
//       const bodyData = data.map((row: any, idx: number) => {
//         const rowData: string[] = [];
//         if (config.showRowNumbers) {
//           rowData.push((idx + 1).toString());
//         }
//         config.columns.forEach((col: ColumnDef) => {
//           let value = getValue(row, col.accessor);
//           // Видаляємо надто довгі тексти
//           if (value.length > 500) {
//             value = value.substring(0, 497) + '...';
//           }
//           rowData.push(value);
//         });
//         return rowData;
//       });
      
//       const finalHeaders = config.showRowNumbers ? ['№', ...headers] : headers;
      
//       // Розрахунок ширини колонок (тепер використовуємо number | 'auto')
//       const columnStyles: Record<number, { cellWidth: number | 'auto' }> = {};
//       let colIndex = 0;
      
//       if (config.showRowNumbers) {
//         columnStyles[colIndex] = { cellWidth: 10 };
//         colIndex++;
//       }
      
//       config.columns.forEach((col: ColumnDef, idx: number) => {
//         // Якщо width 'auto' - залишаємо 'auto', інакше число
//         const width = col.width === 'auto' ? 'auto' : (col.width || 'auto');
//         columnStyles[colIndex + idx] = { cellWidth: width };
//       });
      
//       // Генерація таблиці
//       autoTable(doc, {
//         startY: y,
//         head: [finalHeaders],
//         body: bodyData,
//         styles: {
//           fontSize: 8,
//           cellPadding: 2,
//           overflow: 'linebreak',
//           font: 'helvetica',
//           textColor: [0, 0, 0],
//         },
//         headStyles: {
//           fillColor: [46, 125, 50],
//           textColor: [255, 255, 255],
//           fontStyle: 'bold',
//           halign: 'center',
//         },
//         alternateRowStyles: {
//           fillColor: [245, 245, 245],
//         },
//         columnStyles: columnStyles,
//         margin: { left: 14, right: 14 },
//       });
      
//       // Збереження файлу
//       const safeFileName = `${disciplineName.replace(/[<>:"/\\|?*]/g, '_')}_${title.replace(/[<>:"/\\|?*]/g, '_')}`;
//       doc.save(`${safeFileName}.pdf`);
      
//       resolve(true);
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       reject(error);
//     }
//   });
// };

// export default exportTableToPDF;




// // utils/pdfExportUniversal.tsx - кодирует из HTML в pdf. Есть ошибка типа, но все работает.
// import html2pdf from 'html2pdf.js';

// // ==================== ІНТЕРФЕЙСИ ====================
// interface ColumnDef {
//   header: string;
//   accessor: string | ((row: any) => string);
//   width?: number | 'auto';
// }

// interface TableConfig {
//   columns: ColumnDef[];
//   title?: string;
//   showRowNumbers?: boolean;
// }

// // ==================== КОНФІГУРАЦІЇ ТАБЛИЦЬ ====================
// const tableConfigs: Record<string, TableConfig> = {
//   treaties: {
//     columns: [
//       { header: 'Угода', accessor: 'treaty', width: 50 },
//       { header: 'Рік', accessor: 'year', width: 15 },
//       { header: 'Сторони', accessor: 'parties', width: 50 },
//       { header: 'Опис', accessor: 'description', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
//   persons: {
//     columns: [
//       { header: 'Персоналія', accessor: 'name', width: 40 },
//       { header: 'Роки життя', accessor: 'years', width: 20 },
//       { header: 'Категорія', accessor: (row: any) => `${row.categoryIcon || ''} ${row.category}`, width: 50 },
//       { header: 'Опис', accessor: 'description', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
//   hetmans: {
//     columns: [
//       { header: 'Гетьман', accessor: 'name', width: 35 },
//       { header: 'Роки правління', accessor: 'rulingYears', width: 20 },
//       { header: 'Територія', accessor: 'territory', width: 30 },
//       { header: 'Орієнтація', accessor: 'orientation', width: 35 },
//       { header: 'Ключові угоди', accessor: 'keyTreaties', width: 50 },
//       { header: 'Характеристика', accessor: 'description', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
//   formulas: {
//     columns: [
//       { header: 'Розділ', accessor: (row: any) => `${row.sectionIcon || '📐'} ${row.section}`, width: 40 },
//       { header: 'Назва', accessor: 'title', width: 50 },
//       { header: 'Формула', accessor: 'formula', width: 60 },
//       { header: 'Опис', accessor: (row: any) => row.description || '', width: 'auto' },
//     ],
//     showRowNumbers: false,
//   },
//   // 👇 НОВА КОНФІГУРАЦІЯ ДЛЯ ЖІНОК
//   women: {
//     columns: [
//       { header: 'Персоналія', accessor: 'name', width: 35 },
//       { header: 'Роки життя', accessor: 'years', width: 20 },
//       { header: 'Період', accessor: 'period', width: 25 },
//       { header: 'Категорія', accessor: (row: any) => `${row.icons || ''} ${row.category || ''}`, width: 30 },
//       { header: 'Діяльність / Внесок', accessor: 'activity', width: 'auto' },
//     ],
//     showRowNumbers: true,
//   },
// };

// // ==================== ДОПОМІЖНІ ФУНКЦІЇ ====================

// const getTableTypeById = (materialId: string): string | null => {
//   if (materialId.includes('treaties')) return 'treaties';
//   if (materialId.includes('persons')) return 'persons';
//   if (materialId.includes('hetmans')) return 'hetmans';
//   if (materialId.includes('formulas')) return 'formulas';
//   if (materialId.includes('women')) return 'women';  // 👈 ДОДАТИ
//   return null;
// };

// const detectTableTypeByData = (data: any[]): string | null => {
//   if (!data || data.length === 0) return null;
//   const firstItem = data[0];
  
//   if (firstItem.treaty && firstItem.year && firstItem.parties) return 'treaties';
//   if (firstItem.name && firstItem.years && !firstItem.treaty && firstItem.categoryIcon !== undefined) return 'persons';
//   if (firstItem.rulingYears !== undefined && firstItem.territory) return 'hetmans';
//   if (firstItem.formula && firstItem.section) return 'formulas';
//   // 👇 НОВА ПЕРЕВІРКА ДЛЯ ЖІНОК
//   if (firstItem.activity && firstItem.icons !== undefined && firstItem.period) return 'women';
  
//   return null;
// };

// const getValue = (row: any, accessor: string | ((row: any) => string)): string => {
//   if (typeof accessor === 'function') {
//     return accessor(row);
//   }
//   const value = row[accessor];
//   return value !== undefined && value !== null ? String(value) : '';
// };

// // Створення HTML таблиці
// const createTableHTML = (
//   data: any[],
//   disciplineName: string,
//   title: string,
//   config: TableConfig
// ): HTMLElement => {
//   const container = document.createElement('div');
//   container.style.padding = '20px';
//   container.style.fontFamily = 'Arial, sans-serif';
//   container.style.backgroundColor = '#ffffff';
//   container.style.minWidth = '800px';
  
//   // Заголовок
//   const header = document.createElement('div');
//   header.style.textAlign = 'center';
//   header.style.marginBottom = '20px';
//   header.innerHTML = `
//     <h2 style="color: #2E7D32; margin: 0;">📚 Корисні матеріали</h2>
//     <h3 style="color: #1565C0; margin: 5px 0;">${disciplineName}</h3>
//     <h4 style="color: #333; margin: 5px 0;">${title}</h4>
//     <hr style="margin: 10px 0;" />
//   `;
//   container.appendChild(header);
  
//   // Таблиця
//   const table = document.createElement('table');
//   table.style.width = '100%';
//   table.style.borderCollapse = 'collapse';
//   table.style.fontSize = '11px';
  
//   // Заголовки
//   const headers = config.columns.map(col => col.header);
//   const finalHeaders = config.showRowNumbers ? ['№', ...headers] : headers;
  
//   const thead = document.createElement('thead');
//   const headerRow = document.createElement('tr');
//   headerRow.style.backgroundColor = '#2E7D32';
//   headerRow.style.color = '#ffffff';
  
//   finalHeaders.forEach(headerText => {
//     const th = document.createElement('th');
//     th.textContent = headerText;
//     th.style.padding = '8px';
//     th.style.border = '1px solid #ddd';
//     th.style.textAlign = 'left';
//     th.style.fontWeight = 'bold';
//     headerRow.appendChild(th);
//   });
//   thead.appendChild(headerRow);
//   table.appendChild(thead);
  
//   // Тіло таблиці
//   const tbody = document.createElement('tbody');
  
//   data.forEach((row, idx) => {
//     const tr = document.createElement('tr');
//     tr.style.backgroundColor = idx % 2 === 0 ? '#f5f5f5' : '#ffffff';
    
//     if (config.showRowNumbers) {
//       const tdNum = document.createElement('td');
//       tdNum.textContent = (idx + 1).toString();
//       tdNum.style.padding = '8px';
//       tdNum.style.border = '1px solid #ddd';
//       tdNum.style.textAlign = 'center';
//       tr.appendChild(tdNum);
//     }
    
//     config.columns.forEach(col => {
//       const td = document.createElement('td');
//       td.textContent = getValue(row, col.accessor);
//       td.style.padding = '8px';
//       td.style.border = '1px solid #ddd';
//       td.style.verticalAlign = 'top';
//       tr.appendChild(td);
//     });
    
//     tbody.appendChild(tr);
//   });
  
//   table.appendChild(tbody);
//   container.appendChild(table);
  
//   return container;
// };

// // ==================== ОСНОВНА ФУНКЦІЯ ЕКСПОРТУ ====================

// export const exportTableToPDF = async (
//   data: any[],
//   disciplineName: string,
//   title: string,
//   materialId?: string
// ): Promise<boolean> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log('📄 Генерація PDF...');
      
//       if (!data || !Array.isArray(data) || data.length === 0) {
//         reject(new Error('Немає даних для експорту'));
//         return;
//       }

//       // Визначення типу таблиці
//       let tableType: string | null = null;
//       if (materialId) tableType = getTableTypeById(materialId);
//       if (!tableType) tableType = detectTableTypeByData(data);
//       if (!tableType) {
//         console.warn(`Тип не визначено для ${materialId}, використовуємо persons`);
//         tableType = 'persons';
//       }
      
//       const config = tableConfigs[tableType];
//       if (!config) {
//         reject(new Error(`Немає конфігурації для типу: ${tableType}`));
//         return;
//       }
      
//       // Визначення формату сторінки
//       const isLandscape = config.columns.length > 4;
      
//       console.log(`✅ Тип: ${tableType}, Записів: ${data.length}, Формат: ${isLandscape ? 'альбомний' : 'портретний'}`);
      
//       // Створення HTML
//       const element = createTableHTML(data, disciplineName, title, config);
      
//       // Очищення назви файлу
//       const safeFileName = `${disciplineName.replace(/[<>:"/\\|?*]/g, '_')}_${title.replace(/[<>:"/\\|?*]/g, '_')}`;
      
//       const opt = {
//         margin: [10, 10, 10, 10] as [number, number, number, number],
//         filename: `${safeFileName}.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true, logging: false },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: isLandscape ? 'landscape' : 'portrait' }
//       };
      
//       await html2pdf().set(opt).from(element).save();
      
//       element.remove();
//       console.log('✅ PDF створено!');
//       resolve(true);
      
//     } catch (error) {
//       console.error('❌ Помилка:', error);
//       reject(error);
//     }
//   });
// };

// export default exportTableToPDF;


// utils/pdfExportUniversal.tsx - мінімальне виправлення

import html2pdf from 'html2pdf.js';

// ==================== ІНТЕРФЕЙСИ ====================
interface ColumnDef {
  header: string;
  accessor: string | ((row: any) => string);
  width?: number | 'auto';
}

interface TableConfig {
  columns: ColumnDef[];
  title?: string;
  showRowNumbers?: boolean;
}

// ==================== КОНФІГУРАЦІЇ ТАБЛИЦЬ ====================
const tableConfigs: Record<string, TableConfig> = {
  treaties: {
    columns: [
      { header: 'Угода', accessor: 'treaty', width: 50 },
      { header: 'Рік', accessor: 'year', width: 15 },
      { header: 'Сторони', accessor: 'parties', width: 50 },
      { header: 'Опис', accessor: 'description', width: 'auto' },
    ],
    showRowNumbers: true,
  },
  persons: {
    columns: [
      { header: 'Персоналія', accessor: 'name', width: 40 },
      { header: 'Роки життя', accessor: 'years', width: 20 },
      { header: 'Категорія', accessor: (row: any) => `${row.categoryIcon || ''} ${row.category}`, width: 50 },
      { header: 'Опис', accessor: 'description', width: 'auto' },
    ],
    showRowNumbers: true,
  },
  hetmans: {
    columns: [
      { header: 'Гетьман', accessor: 'name', width: 35 },
      { header: 'Роки правління', accessor: 'rulingYears', width: 20 },
      { header: 'Територія', accessor: 'territory', width: 30 },
      { header: 'Орієнтація', accessor: 'orientation', width: 35 },
      { header: 'Ключові угоди', accessor: 'keyTreaties', width: 50 },
      { header: 'Характеристика', accessor: 'description', width: 'auto' },
    ],
    showRowNumbers: true,
  },
  formulas: {
    columns: [
      { header: 'Розділ', accessor: (row: any) => `${row.sectionIcon || '📐'} ${row.section}`, width: 40 },
      { header: 'Назва', accessor: 'title', width: 50 },
      { header: 'Формула', accessor: 'formula', width: 60 },
      { header: 'Опис', accessor: (row: any) => row.description || '', width: 'auto' },
    ],
    showRowNumbers: false,
  },
  women: {
    columns: [
      { header: 'Персоналія', accessor: 'name', width: 35 },
      { header: 'Роки життя', accessor: 'years', width: 20 },
      { header: 'Період', accessor: 'period', width: 25 },
      { header: 'Категорія', accessor: (row: any) => `${row.icons || ''} ${row.category || ''}`, width: 30 },
      { header: 'Діяльність / Внесок', accessor: 'activity', width: 'auto' },
    ],
    showRowNumbers: true,
  },
};

// ==================== ДОПОМІЖНІ ФУНКЦІЇ ====================

const getTableTypeById = (materialId: string): string | null => {
  if (materialId.includes('treaties')) return 'treaties';
  if (materialId.includes('persons')) return 'persons';
  if (materialId.includes('hetmans')) return 'hetmans';
  if (materialId.includes('formulas')) return 'formulas';
  if (materialId.includes('women')) return 'women';
  return null;
};

const detectTableTypeByData = (data: any[]): string | null => {
  if (!data || data.length === 0) return null;
  const firstItem = data[0];
  
  if (firstItem.treaty && firstItem.year && firstItem.parties) return 'treaties';
  if (firstItem.name && firstItem.years && !firstItem.treaty && firstItem.categoryIcon !== undefined) return 'persons';
  if (firstItem.rulingYears !== undefined && firstItem.territory) return 'hetmans';
  if (firstItem.formula && firstItem.section) return 'formulas';
  if (firstItem.activity && firstItem.icons !== undefined && firstItem.period) return 'women';
  
  return null;
};

const getValue = (row: any, accessor: string | ((row: any) => string)): string => {
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  const value = row[accessor];
  return value !== undefined && value !== null ? String(value) : '';
};

const escapeHtml = (text: string): string => {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Створення HTML таблиці
const createTableHTML = (
  data: any[],
  disciplineName: string,
  title: string,
  config: TableConfig
): HTMLElement => {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.backgroundColor = '#ffffff';
  container.style.minWidth = '800px';
  
  // Заголовок
  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '20px';
  header.innerHTML = `
    <h2 style="color: #2E7D32; margin: 0;">📚 Корисні матеріали</h2>
    <h3 style="color: #1565C0; margin: 5px 0;">${escapeHtml(disciplineName)}</h3>
    <h4 style="color: #333; margin: 5px 0;">${escapeHtml(title)}</h4>
    <hr style="margin: 10px 0;" />
  `;
  container.appendChild(header);
  
  // Таблиця
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.fontSize = '11px';
  
  // Заголовки
  const headers = config.columns.map(col => col.header);
  const finalHeaders = config.showRowNumbers ? ['№', ...headers] : headers;
  
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.backgroundColor = '#2E7D32';
  headerRow.style.color = '#ffffff';
  
  finalHeaders.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.style.padding = '8px';
    th.style.border = '1px solid #ddd';
    th.style.textAlign = 'left';
    th.style.fontWeight = 'bold';
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Тіло таблиці
  const tbody = document.createElement('tbody');
  
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.style.backgroundColor = idx % 2 === 0 ? '#f5f5f5' : '#ffffff';
    
    if (config.showRowNumbers) {
      const tdNum = document.createElement('td');
      tdNum.textContent = (idx + 1).toString();
      tdNum.style.padding = '8px';
      tdNum.style.border = '1px solid #ddd';
      tdNum.style.textAlign = 'center';
      tr.appendChild(tdNum);
    }
    
    config.columns.forEach(col => {
      const td = document.createElement('td');
      td.textContent = getValue(row, col.accessor);
      td.style.padding = '8px';
      td.style.border = '1px solid #ddd';
      td.style.verticalAlign = 'top';
      tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  container.appendChild(table);
  
  return container;
};

// ==================== ОСНОВНА ФУНКЦІЯ ЕКСПОРТУ ====================

export const exportTableToPDF = async (
  data: any[],
  disciplineName: string,
  title: string,
  materialId?: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('📄 Генерація PDF...');
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        reject(new Error('Немає даних для експорту'));
        return;
      }

      // Визначення типу таблиці
      let tableType: string | null = null;
      if (materialId) tableType = getTableTypeById(materialId);
      if (!tableType) tableType = detectTableTypeByData(data);
      if (!tableType) {
        tableType = 'persons';
      }
      
      const config = tableConfigs[tableType];
      if (!config) {
        reject(new Error(`Немає конфігурації для типу: ${tableType}`));
        return;
      }
      
      // Визначення формату сторінки
      const isLandscape = config.columns.length > 4;
      
      console.log(`✅ Тип: ${tableType}, Записів: ${data.length}, Формат: ${isLandscape ? 'альбомний' : 'портретний'}`);
      
      // Створення HTML
      const element = createTableHTML(data, disciplineName, title, config);
      document.body.appendChild(element);
      
      // Очищення назви файлу
      const safeFileName = `${disciplineName.replace(/[<>:"/\\|?*]/g, '_')}_${title.replace(/[<>:"/\\|?*]/g, '_')}`;
      
      // ТІЛЬКИ ОДНА ЗМІНА - ДОДАЄМО as any
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${safeFileName}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: isLandscape ? 'landscape' : 'portrait' }
      } as any;  // ← ЦЕ ЄДИНА ЗМІНА - as any
      
      await html2pdf().set(opt).from(element).save();
      
      element.remove();
      console.log('✅ PDF створено!');
      resolve(true);
      
    } catch (error) {
      console.error('❌ Помилка:', error);
      reject(error);
    }
  });
};

export default exportTableToPDF;