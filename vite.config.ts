import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      maxParallelFileOps: 2
    }
  },
    preview: {
    port: 5173
  }
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import vitePrerender from 'vite-plugin-prerender';
// import path from 'path';

// // Список дисциплін для генерації маршрутів
// const disciplines = [
//   { slug: 'istoriia-ukrainy', id: 1, name: 'Історія України' },
//   { slug: 'matematyka', id: 2, name: 'Математика' },
//   { slug: 'informatyka', id: 3, name: 'Інформатика' },
//   { slug: 'fizyka', id: 4, name: 'Фізика' },
//   { slug: 'angliiska-mova', id: 5, name: 'Англійська мова' },
//   { slug: 'ukrainska-mova', id: 6, name: 'Українська мова' },
//   { slug: 'polska-mova', id: 7, name: 'Польська мова' },
//   { slug: 'khmiiia', id: 1001, name: 'Хімія' },
// ];

// // Функція для генерації всіх маршрутів
// const getAllRoutes = () => {
//   // Статичні маршрути
//   const staticRoutes = [
//     '/',
//     '/about',
//     '/contacts',
//     '/subject-intro',
//     '/test-selection',
//     '/exam-rules',
//     '/login',
//     '/register',
//     '/forgot-password',
//     '/profile',
//     '/profile-settings',
//     '/profile-results',
//     '/messages',
//   ];
  
//   // Динамічні маршрути для кожної дисципліни
//   const disciplineRoutes = disciplines.flatMap(d => [
//     `/test/${d.slug}/${d.id}`,                                    // тест без типу
//     `/test/${d.slug}/${d.id}?type=learn`,                        // навчальний тест
//     `/test/${d.slug}/${d.id}?type=real`,                         // реальний тест
//     `/usefulmaterials/${d.slug}/${d.id}`,                        // корисні матеріали
//   ]);
  
//   return [...staticRoutes, ...disciplineRoutes];
// };

// export default defineConfig({
//   plugins: [
//     react(),
//     vitePrerender({
//       // Всі маршрути для попереднього рендеру
//       routes: getAllRoutes(),
      
//       // Папка з результатом збірки
//       staticDir: path.join(__dirname, 'dist'),
      
//       // Налаштування рендерера
//       renderer: new vitePrerender.PuppeteerRenderer({
//         // Чекаємо події, що сторінка завантажилась
//         renderAfterDocumentEvent: 'render-event',
//         // Таймаут для безпеки (30 секунд)
//         timeout: 30000,
//         // Безголовий режим
//         headless: true,
//         // Додаткові аргументи для Puppeteer
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       }),
      
//       // Опціонально: мініфікація HTML
//       minify: {
//         collapseWhitespace: true,
//         removeComments: true,
//         removeRedundantAttributes: true,
//         removeEmptyAttributes: true,
//       },
//     }),
//   ],
  
//   build: {
//     rollupOptions: {
//       maxParallelFileOps: 2,
//     },
//   },
// });
