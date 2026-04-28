// import React, { useState, useEffect, Suspense } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
// import { fetchDisciplines } from '../../api';

// // UsefulMaterials.tsx - оновлений код

// export const UsefulMaterials: React.FC = () => {
//   const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  
//   const id = disciplineId ? parseInt(disciplineId) : null;
//   const [disciplineName, setDisciplineName] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [dataLoading, setDataLoading] = useState(true);  // ← новий state
//   const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);
//   const [materialsData, setMaterialsData] = useState<Record<string, any>>({});

//   const materials = id ? disciplineMaterialsConfig[id] || [] : [];

//   // Загрузка списка дисциплин
//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }
    
//     fetchDisciplines()
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const found = data.find(d => d.id === id);
//           setDisciplineName(found?.name || "Невідома дисципліна");
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   // Загрузка данных для материалов
//   useEffect(() => {
//     const loadMaterialsData = async () => {
//       if (!id || materials.length === 0) {
//         setDataLoading(false);
//         return;
//       }

//       setDataLoading(true);  // ← починаємо завантаження
//       const newData: Record<string, any> = {};

//       for (const material of materials) {
//         if (material.getData) {
//           try {
//             const data = await material.getData();
//             newData[material.id] = data;
//             console.log(`✅ Loaded data for ${material.id}:`, data?.length || 'no length');
//           } catch (error) {
//             console.error(`Failed to load data for ${material.id}:`, error);
//             newData[material.id] = [];  // ← порожній масив при помилці
//           }
//         }
//       }

//       setMaterialsData(newData);
//       setDataLoading(false);
//     };

//     loadMaterialsData();
//   }, [id, materials]);

//   const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpandedMaterial(isExpanded ? materialId : false);
//   };

//   if (!id) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           📚 Корисні матеріали для підготовки
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Оберіть дисципліну з меню "Корисні матеріали" в заголовку
//         </Typography>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   // ← ПОКАЗУЄМО ЗАГАЛЬНИЙ LOADING, ПОКИ ДАНІ НЕ ЗАВАНТАЖЕНІ
//   if (dataLoading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         📚 Корисні матеріали для підготовки
//       </Typography>
      
//       <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
//         {disciplineName}
//       </Typography>

//       {materials.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             На даний момент матеріали для цієї дисципліни відсутні.
//           </Typography>
//         </Box>
//       ) : (
//         <List>
//           {materials.map((material) => (
//             <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
//               <Accordion
//                 expanded={expandedMaterial === material.id}
//                 onChange={handleAccordionChange(material.id)}
//                 sx={{ boxShadow: 1, '&:before': { display: 'none' }, borderRadius: 2 }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'action.hover', borderRadius: 2 }}>
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                       {material.title}
//                     </Typography>
//                     {material.description && (
//                       <Typography variant="caption" color="text.secondary">
//                         {material.description}
//                       </Typography>
//                     )}
//                   </Box>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
//                   <Suspense fallback={<CircularProgress size={24} />}>
//                     {/* ← ПЕРЕВІРКА НА НАЯВНІСТЬ ДАНИХ */}
//                     {materialsData[material.id] ? (
//                       <material.component data={materialsData[material.id]} />
//                     ) : (
//                       <CircularProgress size={24} />
//                     )}
//                   </Suspense>
//                 </AccordionDetails>
//               </Accordion>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Container>
//   );
// };

// export default UsefulMaterials;





// // UsefulMaterials.tsx - з функцією експорту в PDF

// import React, { useState, useEffect, Suspense, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
//   Button,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DownloadIcon from '@mui/icons-material/Download';
// import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
// import { fetchDisciplines } from '../../api';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// // Функція експорту в PDF
// const exportToPDF = async (elementId: string, fileName: string) => {
//   const element = document.getElementById(elementId);
//   if (!element) {
//     console.error('Element not found:', elementId);
//     return false;
//   }

//   try {
//     // Показуємо індикатор завантаження (можна додати)
//     const originalOverflow = element.style.overflow;
//     element.style.overflow = 'visible';
    
//     const canvas = await html2canvas(element, {
//       scale: 1.5, // середня якість
//       backgroundColor: '#ffffff',
//       logging: false,
//       useCORS: true, // для зовнішніх зображень
//     });
    
//     element.style.overflow = originalOverflow;
    
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       orientation: 'landscape',
//       unit: 'mm',
//       format: 'a4',
//     });
    
//     const imgWidth = 277; // A4 landscape ширина з відступами
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     let heightLeft = imgHeight;
//     let position = 0;
    
//     // Додаємо першу сторінку
//     pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
//     heightLeft -= 280; // висота сторінки в мм
    
//     // Додаємо наступні сторінки якщо потрібно
//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
//       heightLeft -= 280;
//     }
    
//     pdf.save(`${fileName}.pdf`);
//     return true;
//   } catch (error) {
//     console.error('PDF export error:', error);
//     return false;
//   }
// };

// // Очищення назви файлу від недопустимих символів
// const sanitizeFileName = (name: string): string => {
//   return name
//     .replace(/[<>:"/\\|?*]/g, '')
//     .replace(/\s+/g, '_')
//     .substring(0, 50);
// };

// export const UsefulMaterials: React.FC = () => {
//   const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  
//   const id = disciplineId ? parseInt(disciplineId) : null;
//   const [disciplineName, setDisciplineName] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);
//   const [materialsData, setMaterialsData] = useState<Record<string, any>>({});
//   const [exporting, setExporting] = useState<string | null>(null);
//   const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
//     open: false,
//     message: '',
//     severity: 'success',
//   });
  
//   // Refs для посилань на елементи таблиць
//   const tableRefs = useRef<Record<string, HTMLElement | null>>({});

//   const materials = id ? disciplineMaterialsConfig[id] || [] : [];

//   // Загрузка списка дисциплин
//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }
    
//     fetchDisciplines()
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const found = data.find(d => d.id === id);
//           setDisciplineName(found?.name || "Невідома дисципліна");
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   // Загрузка данных для материалов
//   useEffect(() => {
//     const loadMaterialsData = async () => {
//       if (!id || materials.length === 0) {
//         setDataLoading(false);
//         return;
//       }

//       setDataLoading(true);
//       const newData: Record<string, any> = {};

//       for (const material of materials) {
//         if (material.getData) {
//           try {
//             const data = await material.getData();
//             newData[material.id] = data;
//             console.log(`✅ Loaded data for ${material.id}:`, data?.length || 'no length');
//           } catch (error) {
//             console.error(`Failed to load data for ${material.id}:`, error);
//             newData[material.id] = [];
//           }
//         }
//       }

//       setMaterialsData(newData);
//       setDataLoading(false);
//     };

//     loadMaterialsData();
//   }, [id, materials]);

//   const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpandedMaterial(isExpanded ? materialId : false);
//   };

//   // Обробник експорту
//   const handleExport = async (materialId: string, title: string) => {
//     const element = tableRefs.current[materialId];
//     if (!element) {
//       setSnackbar({
//         open: true,
//         message: 'Не вдалося знайти таблицю для експорту',
//         severity: 'error',
//       });
//       return;
//     }

//     setExporting(materialId);
    
//     const fileName = `${sanitizeFileName(disciplineName)}_${sanitizeFileName(title)}`;
//     const success = await exportToPDF(`export-table-${materialId}`, fileName);
    
//     setExporting(null);
//     setSnackbar({
//       open: true,
//       message: success ? 'Файл успішно завантажено!' : 'Помилка при створенні PDF',
//       severity: success ? 'success' : 'error',
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   if (!id) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           📚 Корисні матеріали для підготовки
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Оберіть дисципліну з меню "Корисні матеріали" в заголовку
//         </Typography>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (dataLoading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         📚 Корисні матеріали для підготовки
//       </Typography>
      
//       <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
//         {disciplineName}
//       </Typography>

//       {materials.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             На даний момент матеріали для цієї дисципліни відсутні.
//           </Typography>
//         </Box>
//       ) : (
//         <List>
//           {materials.map((material) => (
//             <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
//               <Accordion
//                 expanded={expandedMaterial === material.id}
//                 onChange={handleAccordionChange(material.id)}
//                 sx={{ boxShadow: 1, '&:before': { display: 'none' }, borderRadius: 2 }}
//               >
//                 <AccordionSummary 
//                   expandIcon={<ExpandMoreIcon />} 
//                   sx={{ 
//                     backgroundColor: 'action.hover', 
//                     borderRadius: 2,
//                     '& .MuiAccordionSummary-content': {
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                       {material.title}
//                     </Typography>
//                     {material.description && (
//                       <Typography variant="caption" color="text.secondary">
//                         {material.description}
//                       </Typography>
//                     )}
//                   </Box>
                  
//                   {/* Кнопка експорту PDF */}
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     startIcon={<DownloadIcon />}
//                     onClick={(e) => {
//                       e.stopPropagation(); // Запобігає розкриттю акордеону
//                       handleExport(material.id, material.title);
//                     }}
//                     disabled={exporting === material.id}
//                     sx={{ mr: 1 }}
//                   >
//                     {exporting === material.id ? <CircularProgress size={20} /> : 'PDF'}
//                   </Button>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
//                   <div id={`export-table-${material.id}`} ref={(el) => { tableRefs.current[material.id] = el; }}>
//                     <Suspense fallback={<CircularProgress size={24} />}>
//                       {materialsData[material.id] ? (
//                         <material.component data={materialsData[material.id]} />
//                       ) : (
//                         <CircularProgress size={24} />
//                       )}
//                     </Suspense>
//                   </div>
//                 </AccordionDetails>
//               </Accordion>
//             </ListItem>
//           ))}
//         </List>
//       )}

//       {/* Snackbar для сповіщень */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default UsefulMaterials;




// // UsefulMaterials.tsx - з експортом закритих акордеонів з правильним експортом всієї таблиці

// import React, { useState, useEffect, Suspense, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
//   Button,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DownloadIcon from '@mui/icons-material/Download';
// import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
// import { fetchDisciplines } from '../../api';
// import { exportTableToPDF } from '../../utils/pdfExportUniversal';

// export const UsefulMaterials: React.FC = () => {
//   const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  
//   const id = disciplineId ? parseInt(disciplineId) : null;
//   const [disciplineName, setDisciplineName] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);
//   const [materialsData, setMaterialsData] = useState<Record<string, any>>({});
//   const [exporting, setExporting] = useState<string | null>(null);
//   const [snackbar, setSnackbar] = useState<{ 
//     open: boolean; 
//     message: string; 
//     severity: 'success' | 'error' | 'warning' | 'info' 
//   }>({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   const materials = id ? disciplineMaterialsConfig[id] || [] : [];

//   // Загрузка списка дисциплин
//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }
    
//     fetchDisciplines()
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const found = data.find(d => d.id === id);
//           setDisciplineName(found?.name || "Невідома дисципліна");
//         }
//       })
//       .catch((error) => {
//         console.error('Failed to fetch disciplines:', error);
//         setDisciplineName("Невідома дисципліна");
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   // Загрузка данных для материалов
//   useEffect(() => {
//     const loadMaterialsData = async () => {
//       if (!id || materials.length === 0) {
//         setDataLoading(false);
//         return;
//       }

//       setDataLoading(true);
//       const newData: Record<string, any> = {};

//       for (const material of materials) {
//         if (material.getData) {
//           try {
//             const data = await material.getData();
//             newData[material.id] = data;
//           } catch (error) {
//             console.error(`Failed to load data for ${material.id}:`, error);
//             newData[material.id] = [];
//           }
//         }
//       }

//       setMaterialsData(newData);
//       setDataLoading(false);
//     };

//     loadMaterialsData();
//   }, [id, materials]);

//   const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpandedMaterial(isExpanded ? materialId : false);
//   };

//   const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
//     setSnackbar({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   // Обробник експорту
//   const handleExport = useCallback(async (materialId: string, title: string) => {
//     const material = materials.find(m => m.id === materialId);
//     const componentData = materialsData[materialId];

//     // 🔍 ДЕБАГ - подивитися що зчитується
//     console.log('========== ЕКСПОРТ PDF ==========');
//     console.log('materialId:', materialId);
//     console.log('title:', title);
//     console.log('componentData:', componentData);
//     console.log('Перший запис:', componentData?.[0]);
//     console.log('==================================');

    
    
//     if (!material) {
//       showSnackbar('Матеріал не знайдено', 'error');
//       return;
//     }
    
//     if (!componentData) {
//       showSnackbar('Дані для експорту відсутні', 'warning');
//       return;
//     }
    
//     if (!Array.isArray(componentData) || componentData.length === 0) {
//       showSnackbar('Немає даних для експорту', 'warning');
//       return;
//     }

//     setExporting(materialId);

//     try {
//       await exportTableToPDF(
//         componentData, 
//         disciplineName, 
//         title,
//         materialId
//       );
      
//       showSnackbar(`Файл "${title}.pdf" успішно завантажено!`, 'success');
//     } catch (error) {
//       console.error('Export error:', error);
      
//       if (error instanceof Error) {
//         if (error.message.includes('не вдалося визначити тип')) {
//           showSnackbar(
//             `Для матеріалу "${title}" ще не налаштовано експорт у PDF. Зверніться до адміністратора.`,
//             'warning'
//           );
//         } else {
//           showSnackbar(`Помилка: ${error.message}`, 'error');
//         }
//       } else {
//         showSnackbar('Помилка при створенні PDF. Спробуйте пізніше.', 'error');
//       }
//     } finally {
//       setExporting(null);
//     }
//   }, [materials, materialsData, disciplineName]);

//   if (!id) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           📚 Корисні матеріали для підготовки
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Оберіть дисципліну з меню "Корисні матеріали" в заголовку
//         </Typography>
//       </Container>
//     );
//   }

//   if (loading || dataLoading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         📚 Корисні матеріали для підготовки
//       </Typography>
      
//       <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
//         {disciplineName}
//       </Typography>

//       {materials.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             На даний момент матеріали для цієї дисципліни відсутні.
//           </Typography>
//         </Box>
//       ) : (
//         <List>
//           {materials.map((material) => (
//             <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
//               <Accordion
//                 expanded={expandedMaterial === material.id}
//                 onChange={handleAccordionChange(material.id)}
//                 sx={{ 
//                   boxShadow: 1, 
//                   '&:before': { display: 'none' }, 
//                   borderRadius: 2,
//                   border: exporting === material.id ? '1px solid #1976d2' : 'none'
//                 }}
//               >
//                 <AccordionSummary 
//                   expandIcon={<ExpandMoreIcon />} 
//                   sx={{ 
//                     backgroundColor: 'action.hover', 
//                     borderRadius: 2,
//                     '& .MuiAccordionSummary-content': {
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                       {material.title}
//                     </Typography>
//                     {material.description && (
//                       <Typography variant="caption" color="text.secondary">
//                         {material.description}
//                       </Typography>
//                     )}
//                   </Box>
                  
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     startIcon={exporting === material.id ? <CircularProgress size={18} /> : <DownloadIcon />}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleExport(material.id, material.title);
//                     }}
//                     disabled={exporting === material.id}
//                     sx={{ mr: 1, minWidth: '100px' }}
//                   >
//                     {exporting === material.id ? 'Завантаження...' : 'Завантажити PDF'}
//                   </Button>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
//                   <Suspense fallback={<CircularProgress size={24} />}>
//                     {materialsData[material.id] ? (
//                       <material.component data={materialsData[material.id]} />
//                     ) : (
//                       <Box sx={{ textAlign: 'center', py: 4 }}>
//                         <Typography color="text.secondary">
//                           Дані відсутні або не завантажились
//                         </Typography>
//                       </Box>
//                     )}
//                   </Suspense>
//                 </AccordionDetails>
//               </Accordion>
//             </ListItem>
//           ))}
//         </List>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default UsefulMaterials;




// UsefulMaterials.tsx - з експортом закритих акордеонів з правильним експортом всієї таблиці

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
import { fetchDisciplines } from '../../api';
import { exportTableToPDF } from '../../utils/pdfExportUniversal';

export const UsefulMaterials: React.FC = () => {
  const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  
  const id = disciplineId ? parseInt(disciplineId) : null;
  const [disciplineName, setDisciplineName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);
  const [materialsData, setMaterialsData] = useState<Record<string, any>>({});
  const [exporting, setExporting] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ 
    open: boolean; 
    message: string; 
    severity: 'success' | 'error' | 'warning' | 'info' 
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const materials = id ? disciplineMaterialsConfig[id] || [] : [];

  // Загрузка списка дисциплин
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    fetchDisciplines()
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find(d => d.id === id);
          setDisciplineName(found?.name || "Невідома дисципліна");
        }
      })
      .catch((error) => {
        console.error('Failed to fetch disciplines:', error);
        setDisciplineName("Невідома дисципліна");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Загрузка данных для материалов
  useEffect(() => {
    const loadMaterialsData = async () => {
      if (!id || materials.length === 0) {
        setDataLoading(false);
        return;
      }

      setDataLoading(true);
      const newData: Record<string, any> = {};

      for (const material of materials) {
        if (material.getData) {
          try {
            const data = await material.getData();
            newData[material.id] = data;
          } catch (error) {
            console.error(`Failed to load data for ${material.id}:`, error);
            newData[material.id] = [];
          }
        }
      }

      setMaterialsData(newData);
      setDataLoading(false);
    };

    loadMaterialsData();
  }, [id, materials]);

  const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedMaterial(isExpanded ? materialId : false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Обробник експорту
  const handleExport = useCallback(async (materialId: string, title: string) => {
    const material = materials.find(m => m.id === materialId);
    const componentData = materialsData[materialId];

    // // 🔍 ДЕБАГ - подивитися що зчитується
    // console.log('========== ЕКСПОРТ PDF ==========');
    // console.log('materialId:', materialId);
    // console.log('title:', title);
    // console.log('componentData length:', componentData?.length);
    // console.log('Перший запис:', componentData?.[0]);
    // console.log('pdfConfig:', material?.pdfConfig);
    // console.log('==================================');

    if (!material) {
      showSnackbar('Матеріал не знайдено', 'error');
      return;
    }
    
    if (!componentData) {
      showSnackbar('Дані для експорту відсутні', 'warning');
      return;
    }
    
    if (!Array.isArray(componentData) || componentData.length === 0) {
      showSnackbar('Немає даних для експорту', 'warning');
      return;
    }

    // Перевірка наявності pdfConfig
    if (!material.pdfConfig) {
      showSnackbar(`Для матеріалу "${title}" не налаштовано експорт у PDF. Зверніться до адміністратора.`, 'warning');
      return;
    }

    setExporting(materialId);

    try {
      // 🔥 ВИКОРИСТОВУЄМО pdfConfig ЗАМІСТЬ materialId
      await exportTableToPDF(
        componentData, 
        disciplineName, 
        title,
        material.pdfConfig  // 👈 Передаємо pdfConfig
      );
      
      showSnackbar(`Файл "${title}.pdf" успішно завантажено!`, 'success');
    } catch (error) {
      console.error('Export error:', error);
      
      if (error instanceof Error) {
        showSnackbar(`Помилка: ${error.message}`, 'error');
      } else {
        showSnackbar('Помилка при створенні PDF. Спробуйте пізніше.', 'error');
      }
    } finally {
      setExporting(null);
    }
  }, [materials, materialsData, disciplineName]);

  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          📚 Корисні матеріали для підготовки
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Оберіть дисципліну з меню "Корисні матеріали" в заголовку
        </Typography>
      </Container>
    );
  }

  if (loading || dataLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📚 Корисні матеріали для підготовки
      </Typography>
      
      <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
        {disciplineName}
      </Typography>

      {materials.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            На даний момент матеріали для цієї дисципліни відсутні.
          </Typography>
        </Box>
      ) : (
        <List>
          {materials.map((material) => (
            <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
              <Accordion
                expanded={expandedMaterial === material.id}
                onChange={handleAccordionChange(material.id)}
                sx={{ 
                  boxShadow: 1, 
                  '&:before': { display: 'none' }, 
                  borderRadius: 2,
                  border: exporting === material.id ? '1px solid #1976d2' : 'none'
                }}
              >               

                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: 'action.hover', 
                    borderRadius: 2,
                    '& .MuiAccordionSummary-content': {
                      margin: 0,  // Прибираємо стандартні відступи
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    width: '100%',
                    pr: 12,  // Відступ справа для іконки розгортання
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {material.title}
                      </Typography>
                      {material.description && (
                        <Typography variant="caption" color="text.secondary">
                          {material.description}
                        </Typography>
                      )}
                    </Box>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={exporting === material.id ? <CircularProgress size={18} /> : <DownloadIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExport(material.id, material.title);
                      }}
                      disabled={exporting === material.id}
                      sx={{ 
                        minWidth: '100px',
                        flexShrink: 0,
                        ml: 2,  // 👈 Відступ зліва
                      }}
                    >
                      {exporting === material.id ? 'Завантаження...' : 'Завантажити PDF'}
                    </Button>
                  </Box>
                </AccordionSummary>  


                <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
                  <Suspense fallback={<CircularProgress size={24} />}>
                    {materialsData[material.id] ? (
                      <material.component data={materialsData[material.id]} />
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">
                          Дані відсутні або не завантажились
                        </Typography>
                      </Box>
                    )}
                  </Suspense>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UsefulMaterials;