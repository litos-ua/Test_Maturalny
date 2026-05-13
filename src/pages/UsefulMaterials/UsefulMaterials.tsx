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
// import { useTheme } from '@mui/material';

// export const UsefulMaterials: React.FC = () => {
//   const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
//   const theme = useTheme();
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
//   const newData: Record<string, any> = {};

//   for (const material of materials) {
//     if (material.getData) {
//       try {
//         // console.log(`🔄 Завантаження даних для: ${material.id}`);
//         const data = await material.getData();
//         // console.log(`✅ Дані для ${material.id}:`, data);
//         newData[material.id] = data;
//       } catch (error) {
//         // console.error(`❌ Failed to load data for ${material.id}:`, error);
//         newData[material.id] = [];
//       }
//     }
//   }

//   // console.log('📦 Всі завантажені дані:', newData);
//   setMaterialsData(newData);
//   setDataLoading(false);
// };

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
//     let componentData = materialsData[materialId];

//     if (!material) {
//       showSnackbar('Матеріал не знайдено', 'error');
//       return;
//     }
    
//     if (!componentData) {
//       showSnackbar('Дані для експорту відсутні', 'warning');
//       return;
//     }
    
//     // 🔥 СПЕЦІАЛЬНА ОБРОБКА ДЛЯ КАРИКАТУР (об'єднує три масиви в один)
//     let exportData = componentData;
//     if (materialId === 'cartoons-section' && componentData && !Array.isArray(componentData)) {
//       exportData = [
//         ...(componentData.preSovietData || []),
//         ...(componentData.sovietEarlyData || []),
//         ...(componentData.ww2Data || []),
//         ...(componentData.postWarData || []),     
//         ...(componentData.bureaucracyData || []),
//         ...(componentData.deficitData || []),
//         ...(componentData.serviceData || []),
//         ...(componentData.nesunyData || []),
//         ...(componentData.bezhozData || []),
//         ...(componentData.nenuzhnajaProdData || []),
//         ...(componentData.perebudovaData || []),
//         ...(componentData.ukraineData || []),
//       ];
//       console.log('🎭 Об\'єднано дані карикатур:', exportData.length);
//     }

//   if (materialId === 'architecture-section' && componentData && !Array.isArray(componentData)) {
//     exportData = [
//       ...(componentData.ancientMedievalData || []),
//       ...(componentData.earlyModernData || []),
//       ...(componentData.modernData || []),
//       ...(componentData.contemporaryData || []),
//     ];
//     console.log('🏛️ Об\'єднано дані архітектури:', exportData.length);
//   }
    
//     // Перевірка на масив
//     if (!Array.isArray(exportData) || exportData.length === 0) {
//       showSnackbar('Немає даних для експорту', 'warning');
//       return;
//     }

//     // Перевірка наявності pdfConfig
//     if (!material.pdfConfig) {
//       showSnackbar(`Для матеріалу "${title}" не налаштовано експорт у PDF. Зверніться до адміністратора.`, 'warning');
//       return;
//     }

//     setExporting(materialId);

//     try {
//       // Використовуємо об'єднані дані для експорту
//       await exportTableToPDF(
//         exportData, 
//         disciplineName, 
//         title,
//         material.pdfConfig
//       );
      
//       showSnackbar(`Файл "${title}.pdf" успішно завантажено!`, 'success');
//     } catch (error) {
//       console.error('Export error:', error);
      
//       if (error instanceof Error) {
//         showSnackbar(`Помилка: ${error.message}`, 'error');
//       } else {
//         showSnackbar('Помилка при створенні PDF. Спробуйте пізніше.', 'error');
//       }
//     } finally {
//       setExporting(null);
//     }
//   }, [materials, materialsData, disciplineName]);

//   if (!id) {
//     return (
//       // <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
//       <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 }, textAlign: "center" }}> 
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
//                       margin: 0,  // Прибираємо стандартні відступи
//                     }
//                   }}
//                 >
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center', 
//                     width: '100%',
//                     pr: 12,  // Відступ справа для іконки розгортання
//                   }}>
//                     <Box>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                         {material.title}
//                       </Typography>
//                       {material.description && (
//                         <Typography variant="caption" color="text.secondary">
//                           {material.description}
//                         </Typography>
//                       )}
//                     </Box>
//                         <Box
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleExport(material.id, material.title);
//                           }}
//                           sx={{ 
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             gap: 1,
//                             cursor: 'pointer',
//                             fontFamily: 'inherit',
//                             fontWeight: 500,
//                             fontSize: '0.875rem',
//                             lineHeight: 1.75,
//                             minWidth: 64,
//                             padding: '4px 10px',
//                             borderRadius: 1,
//                             border: '1px solid',
//                             borderColor: theme.palette.mode === 'dark' ? '#5a9ad9' : '#81C3FF',  // світло-голубий бордюр
//                             backgroundColor: theme.palette.mode === 'dark' ? 'rgba(90, 154, 217, 0.1)' : 'rgba(129, 195, 255, 0.1)',  // світло-голубий фон
//                             transition: 'all 0.2s',
//                             '& svg': {
//                               color: theme.palette.mode === 'dark' ? '#5a9ad9' : '#81C3FF',  // світло-голуба іконка
//                             },
//                             '& .MuiTypography-root': {
//                               color: theme.palette.mode === 'dark' ? '#5a9ad9' : '#81C3FF',  // світло-голубий текст
//                             },
//                             '&:hover': {
//                               backgroundColor: theme.palette.mode === 'dark' 
//                                 ? 'rgba(255, 193, 7, 0.2)'   // темно-жовтий фон для темної теми
//                                 : 'rgba(255, 193, 7, 0.3)',   // світло-жовтий фон для світлої теми
//                               borderColor: theme.palette.mode === 'dark' ? '#FFC107' : '#F4A460',  // жовтий бордюр (опціонально)
//                             },
//                             '&:hover svg': {
//                               color: theme.palette.mode === 'dark' ? '#FFC107' : '#F4A460',  // іконка стає жовтою (опціонально)
//                             },
//                             '&:hover .MuiTypography-root': {
//                               color: theme.palette.mode === 'dark' ? '#FFC107' : '#F4A460',  // текст стає жовтим (опціонально)
//                             }
//                           }}
//                         >
//                           {exporting === material.id ? (
//                             <CircularProgress size={18} />
//                           ) : (
//                             <DownloadIcon fontSize="small" />
//                           )}
//                           <Typography variant="body2">
//                             {exporting === material.id ? 'Завантаження...' : 'Завантажити PDF'}
//                           </Typography>
//                         </Box>
//                   </Box>
//                 </AccordionSummary>  


//                 <AccordionDetails sx={{ p: 2, overflowX: 'auto', width: '100%' }}>
//                   <Suspense fallback={<CircularProgress size={24} />}>
//                     {materialsData[material.id] ? (
//                       <material.component data={materialsData[material.id]} />
//                     ) : (
//                       <Box sx={{ textAlign: 'center', py: 4, width: '100%' }}>
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


// Адаптация к разным экранам
// pages/UsefulMaterials/UsefulMaterials.tsx

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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
import { fetchDisciplines } from '../../api';
import { exportTableToPDF } from '../../utils/pdfExportUniversal';

export const UsefulMaterials: React.FC = () => {
  const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
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
    let componentData = materialsData[materialId];

    if (!material) {
      showSnackbar('Матеріал не знайдено', 'error');
      return;
    }
    
    if (!componentData) {
      showSnackbar('Дані для експорту відсутні', 'warning');
      return;
    }
    
    // Об'єднання даних для карикатур
    let exportData = componentData;
    if (materialId === 'cartoons-section' && componentData && !Array.isArray(componentData)) {
      exportData = [
        ...(componentData.preSovietData || []),
        ...(componentData.sovietEarlyData || []),
        ...(componentData.ww2Data || []),
        ...(componentData.postWarData || []),     
        ...(componentData.bureaucracyData || []),
        ...(componentData.deficitData || []),
        ...(componentData.serviceData || []),
        ...(componentData.nesunyData || []),
        ...(componentData.bezhozData || []),
        ...(componentData.nenuzhnajaProdData || []),
        ...(componentData.perebudovaData || []),
        ...(componentData.ukraineData || []),
      ];
      console.log('🎭 Об\'єднано дані карикатур:', exportData.length);
    }

    if (materialId === 'architecture-section' && componentData && !Array.isArray(componentData)) {
      exportData = [
        ...(componentData.ancientMedievalData || []),
        ...(componentData.earlyModernData || []),
        ...(componentData.modernData || []),
        ...(componentData.contemporaryData || []),
      ];
      console.log('🏛️ Об\'єднано дані архітектури:', exportData.length);
    }

    if (materialId === 'arts-section' && componentData && !Array.isArray(componentData)) {
    exportData = [
      ...(componentData.ancientArtData || []),
      ...(componentData.kyivanRusArtData || []),
      ...(componentData.renaissanceArtData || []),
      ...(componentData.modernArtData || []),
      ...(componentData.contemporaryArtData || []),
    ];
  console.log('🎨 Об\'єднано дані мистецтва:', exportData.length);
}
    
    if (!Array.isArray(exportData) || exportData.length === 0) {
      showSnackbar('Немає даних для експорту', 'warning');
      return;
    }

    if (!material.pdfConfig) {
      showSnackbar(`Для матеріалу "${title}" не налаштовано експорт у PDF. Зверніться до адміністратора.`, 'warning');
      return;
    }

    setExporting(materialId);

    try {
      await exportTableToPDF(
        exportData, 
        disciplineName, 
        title,
        material.pdfConfig
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
      <Container 
        maxWidth={false} 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 }, 
          px: { xs: 2, sm: 3, md: 4 }, 
          textAlign: "center" 
        }}
      > 
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom
        >
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
    <Container 
      maxWidth={false} 
      sx={{ 
        py: { xs: 2, sm: 3, md: 4 }, 
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }
      }}
    >
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        📚 Корисні матеріали для підготовки
      </Typography>
      
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 }, 
          color: "primary.main",
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        {disciplineName}
      </Typography>

      {materials.length === 0 ? (
        <Box sx={{ textAlign: "center", py: { xs: 4, sm: 6, md: 8 } }}>
          <Typography variant="body1" color="text.secondary">
            На даний момент матеріали для цієї дисципліни відсутні.
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {materials.map((material) => (
            <ListItem 
              key={material.id} 
              disablePadding 
              sx={{ 
                display: 'block', 
                mb: { xs: 1.5, sm: 2 }
              }}
            >
              <Accordion
                expanded={expandedMaterial === material.id}
                onChange={handleAccordionChange(material.id)}
                sx={{ 
                  boxShadow: 1, 
                  '&:before': { display: 'none' }, 
                  borderRadius: { xs: 1, sm: 2 },
                  border: exporting === material.id ? '1px solid #1976d2' : 'none'
                }}
              >               
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: 'action.hover', 
                    borderRadius: { xs: 1, sm: 2 },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 0 }
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1.5, sm: 0 }
                  }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography 
                        variant={isMobile ? "subtitle2" : "subtitle1"} 
                        sx={{ fontWeight: 600 }}
                      >
                        {material.title}
                      </Typography>
                      {material.description && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          {material.description}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExport(material.id, material.title);
                      }}
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        minWidth: { xs: 'auto', sm: 64 },
                        padding: { xs: '4px 8px', sm: '4px 10px' },
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? '#5a9ad9' : '#81C3FF',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(90, 154, 217, 0.1)' : 'rgba(129, 195, 255, 0.1)',
                        transition: 'all 0.2s',
                        '& svg': {
                          color: theme.palette.mode === 'dark' ? '#5a9ad9' : '#81C3FF',
                          fontSize: { xs: '0.9rem', sm: '1.25rem' }
                        },
                        '& .MuiTypography-root': {
                          color: theme.palette.mode === 'dark' ? '#5a9ad9' : '#81C3FF',
                          fontSize: { xs: '0.7rem', sm: '0.875rem' }
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 193, 7, 0.2)'
                            : 'rgba(255, 193, 7, 0.3)',
                          borderColor: theme.palette.mode === 'dark' ? '#FFC107' : '#F4A460',
                        },
                        '&:hover svg': {
                          color: theme.palette.mode === 'dark' ? '#FFC107' : '#F4A460',
                        },
                        '&:hover .MuiTypography-root': {
                          color: theme.palette.mode === 'dark' ? '#FFC107' : '#F4A460',
                        }
                      }}
                    >
                      {exporting === material.id ? (
                        <CircularProgress size={isMobile ? 14 : 18} />
                      ) : (
                        <DownloadIcon fontSize="small" />
                      )}
                      <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {exporting === material.id ? 'Завантаження...' : 'Завантажити PDF'}
                      </Typography>
                      <Typography variant="body2" sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {exporting === material.id ? '...' : 'PDF'}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ 
                  p: { xs: 1, sm: 2 }, 
                  overflowX: 'auto', 
                  width: '100%' 
                }}>
                  <Suspense fallback={<CircularProgress size={24} />}>
                    {materialsData[material.id] ? (
                      <material.component data={materialsData[material.id]} />
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4, width: '100%' }}>
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
        anchorOrigin={{ 
          vertical: isMobile ? 'bottom' : 'bottom', 
          horizontal: isMobile ? 'center' : 'center' 
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UsefulMaterials;