//Работает с имеджами
// utils/pdfExportUniversal.tsx

import html2pdf from 'html2pdf.js';

// ==================== ІНТЕРФЕЙСИ ====================

export interface PdfColumn {
  header: string;
  accessor: string | ((row: any) => string);
  width?: number | 'auto';
}

export interface PdfConfig {
  columns: readonly PdfColumn[];
  showRowNumbers: boolean;
}

// ==================== ДОПОМІЖНІ ФУНКЦІЇ ====================

const getValue = (row: any, accessor: string | ((row: any) => any)): any => {
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  return row[accessor] !== undefined && row[accessor] !== null ? String(row[accessor]) : '';
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
  pdfConfig: PdfConfig
): HTMLElement => {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.backgroundColor = '#ffffff';
  container.style.minWidth = '700px'; //БЫЛО 800px
  
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
  const headers = pdfConfig.columns.map(col => col.header);
  const finalHeaders = pdfConfig.showRowNumbers ? ['№', ...headers] : headers;
  
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
    
    if (pdfConfig.showRowNumbers) {
      const tdNum = document.createElement('td');
      tdNum.textContent = (idx + 1).toString();
      tdNum.style.padding = '8px';
      tdNum.style.border = '1px solid #ddd';
      tdNum.style.textAlign = 'center';
      tr.appendChild(tdNum);
    }
    
    pdfConfig.columns.forEach(col => {
      const td = document.createElement('td');
      const rawValue = getValue(row, col.accessor);
      
      // Обробка різних типів значень
      let textValue = '';
      let isImage = false;
      let imageUrl = '';
      
      if (rawValue && typeof rawValue === 'object') {
        if (rawValue.type === 'image') {
          isImage = true;
          imageUrl = rawValue.src;
        } else {
          textValue = JSON.stringify(rawValue);
        }
      } else if (typeof rawValue === 'string') {
        // Перевірка на URL зображення (для карикатур)
        const looksLikeImageUrl = rawValue.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || rawValue.includes('/images/');
        const isImageColumn = col.header === 'Карикатура' || col.accessor === 'imageUrl';
        
        if (isImageColumn && looksLikeImageUrl) {
          isImage = true;
          imageUrl = rawValue;
        } else {
          textValue = rawValue;
        }
      } else {
        textValue = String(rawValue || '');
      }
      
      // Відображаємо зображення або текст
      if (isImage && imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxHeight = '80px';
        img.style.maxWidth = '120px';
        img.style.objectFit = 'contain';
        img.style.display = 'block';
        img.alt = 'Image';
        td.appendChild(img);
      } else {
        // Обмеження довжини тексту
        let displayText = textValue;
        if (displayText.length > 500) {
          displayText = displayText.substring(0, 497) + '...';
        }
        td.textContent = displayText;
      }
      
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
  pdfConfig: PdfConfig
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('📄 Генерація PDF...');
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        reject(new Error('Немає даних для експорту'));
        return;
      }

      console.log(`✅ Записів: ${data.length}, Колонок: ${pdfConfig.columns.length}`);
      
      // Створення HTML
      const element = createTableHTML(data, disciplineName, title, pdfConfig);
      document.body.appendChild(element);

      // Затримка для завантаження зображень
      console.log('⏳ Очікування завантаження зображень...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Очищення назви файлу
      const safeFileName = `${disciplineName.replace(/[<>:"/\\|?*]/g, '_')}_${title.replace(/[<>:"/\\|?*]/g, '_')}`;
      
      // Визначення орієнтації сторінки
      const isLandscape = pdfConfig.columns.length > 4;
      
      // Налаштування html2pdf            
      const opt: any = {
        margin: [10, 10, 10, 5],                //БЫЛО margin: [10, 10, 10, 10]
        filename: `${safeFileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: isLandscape ? 'landscape' : 'portrait' }
      };
      
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