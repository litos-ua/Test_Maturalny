// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   InputAdornment,
//   Chip,
//   useTheme,
//   alpha,
//   Collapse,
//   IconButton,
//   CircularProgress,
// } from '@mui/material';
// import { Search as SearchIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
// import { MathFormula } from './MathFormula';

// interface Formula {
//   id: number;
//   section: string;
//   sectionIcon: string;
//   title: string;
//   formula: string;
//   description?: string;
// }

// interface FormulasTableProps {
//   data: Formula[];
// }

// const FormulasTable: React.FC<FormulasTableProps> = ({ data }) => {
//   const theme = useTheme();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

//   // Группировка по разделам
//   const groupedData = useMemo(() => {
//     if (!data || !Array.isArray(data)) return []
//     const groups: Record<string, Formula[]> = {};
//     data.forEach((formula) => {
//       if (!groups[formula.section]) {
//         groups[formula.section] = [];
//       }
//       groups[formula.section].push(formula);
//     });
//     return groups;
//   }, [data]);

//   // Фильтрация
//   const filteredGroups = useMemo(() => {
//     if (!searchTerm) return groupedData;

//     const filtered: Record<string, Formula[]> = {};
//     Object.entries(groupedData).forEach(([section, formulas]) => {
//       const matchedFormulas = formulas.filter(
//         (f) =>
//           f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           f.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (f.description && f.description.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       if (matchedFormulas.length > 0) {
//         filtered[section] = matchedFormulas;
//       }
//     });
//     return filtered;
//   }, [groupedData, searchTerm]);

//   const toggleSection = (section: string) => {
//     setExpandedSections((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(section)) {
//         newSet.delete(section);
//       } else {
//         newSet.add(section);
//       }
//       return newSet;
//     });
//   };

//   const totalFormulas = data.length;
//   const visibleFormulas = Object.values(filteredGroups).flat().length;

//   return (
//     <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//       {/* Заголовок */}
//       <Box sx={{ mb: 3, textAlign: 'center' }}>
//         <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
//           📐 Основні математичні формули
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Для підготовки до НМТ з математики
//         </Typography>
//       </Box>

//       {/* Пошук */}
//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="🔍 Пошук формул за назвою, формулою або описом..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 3 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon color="action" />
//             </InputAdornment>
//           ),
//         }}
//       />

//       {/* Інформація */}
//       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="body2" color="text.secondary">
//           📊 Всього формул: {totalFormulas} | Знайдено: {visibleFormulas}
//         </Typography>
//       </Box>

//       {/* Секции с формулами */}
//       {Object.entries(filteredGroups).map(([section, formulas]) => (
//         <Paper
//           key={section}
//           sx={{
//             mb: 2,
//             borderLeft: `4px solid ${theme.palette.primary.main}`,
//             overflow: 'hidden',
//           }}
//         >
//           {/* Заголовок секции (кликабельный) */}
//           <Box
//             onClick={() => toggleSection(section)}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               p: 2,
//               backgroundColor: alpha(theme.palette.primary.main, 0.05),
//               cursor: 'pointer',
//               '&:hover': {
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               },
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 600 }}>
//               {section}
//             </Typography>
//             <IconButton size="small">
//               {expandedSections.has(section) ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           </Box>

//           {/* Формулы в секции */}
//           <Collapse in={expandedSections.has(section) || !!searchTerm}>
//             <TableContainer>
//               <Table size="small">
//                 <TableBody>
//                   {formulas.map((formula) => (
//                     <TableRow
//                       key={formula.id}
//                       sx={{
//                         '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
//                       }}
//                     >
//                       <TableCell sx={{ width: '30%', verticalAlign: 'top' }}>
//                         <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
//                           {formula.title}
//                         </Typography>
//                         {formula.description && (
//                           <Typography variant="caption" color="text.secondary">
//                             {formula.description}
//                           </Typography>
//                         )}
//                       </TableCell>
//                       <TableCell sx={{ verticalAlign: 'top' }}>
//                         <Box sx={{ fontFamily: 'monospace', fontSize: '1rem' }}>
//                           <MathFormula formula={formula.formula} />
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Collapse>
//         </Paper>
//       ))}
//     </Paper>
//   );
// };

// export default FormulasTable;



// Добавлено SEO для индексации
// components/UsefulMaterials/Math/FormulasTable.tsx

// components/UsefulMaterials/Math/FormulasTable.tsx

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  alpha,
  Collapse,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { Search as SearchIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { MathFormula } from './MathFormula';

interface Formula {
  id: number;
  section: string;
  sectionIcon: string;
  title: string;
  formula: string;
  description?: string;
}

interface FormulasTableProps {
  data: Formula[];
}

const FormulasTable: React.FC<FormulasTableProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // ==========================================================================
  // СТРУКТУРОВАНІ ДАНІ ДЛЯ МАТЕМАТИЧНИХ ФОРМУЛ (JSON-LD)
  // ==========================================================================
  const formulasStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Основні математичні формули",
    "description": "Повний збірник формул з алгебри, геометрії, тригонометрії та математичного аналізу для підготовки до НМТ з математики.",
    "numberOfItems": data.length,
    "itemListElement": data.slice(0, 50).map((formula, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": formula.title,
      "description": `${formula.section} | ${formula.formula.substring(0, 100)}${formula.formula.length > 100 ? '...' : ''} | ${formula.description || ''}`
    }))
  };

  // Группировка по разделам
  const groupedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return {};
    const groups: Record<string, Formula[]> = {};
    data.forEach((formula) => {
      if (!groups[formula.section]) {
        groups[formula.section] = [];
      }
      groups[formula.section].push(formula);
    });
    return groups;
  }, [data]);

  // Фильтрация
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groupedData;

    const filtered: Record<string, Formula[]> = {};
    Object.entries(groupedData).forEach(([section, formulas]) => {
      const matchedFormulas = formulas.filter(
        (f) =>
          f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (f.description && f.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      if (matchedFormulas.length > 0) {
        filtered[section] = matchedFormulas;
      }
    });
    return filtered;
  }, [groupedData, searchTerm]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const totalFormulas = data.length;
  const visibleFormulas = Object.values(filteredGroups).flat().length;

  // Адаптивний розмір шрифту для заголовків
  const titleVariant = isMobile ? "h5" : "h4";
  const sectionVariant = isMobile ? "subtitle1" : "h6";

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(formulasStructuredData)}
        </script>
      </Helmet>

      <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 3 }}>
        {/* ====================================================================
            SEO: ГОЛОВНИЙ ЗАГОЛОВОК СТОРІНКИ
            ==================================================================== */}
        <Box sx={{ mb: { xs: 2, sm: 3 }, textAlign: 'center' }}>
          <Typography 
            variant={titleVariant} 
            component="h2"
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.125rem' }
            }}
          >
            📐 Основні математичні формули
          </Typography>
          <Typography 
            variant={isMobile ? "subtitle2" : "subtitle1"} 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' } }}
          >
            Для підготовки до НМТ з математики
          </Typography>
        </Box>

        {/* ====================================================================
            АДАПТИВНИЙ ПОШУК
            ==================================================================== */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="🔍 Пошук формул за назвою, формулою або описом..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: { xs: 2, sm: 3 } }}
          size={isMobile ? "small" : "medium"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
              </InputAdornment>
            ),
            sx: { fontSize: { xs: '0.875rem', sm: '1rem' } }
          }}
        />

        {/* ====================================================================
            ІНФОРМАЦІЯ ПРО КІЛЬКІСТЬ ФОРМУЛ
            ==================================================================== */}
        <Box sx={{ 
          mb: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' } }}>
            📊 Всього формул: {totalFormulas} | Знайдено: {visibleFormulas}
          </Typography>
          {searchTerm && (
            <Chip 
              label={`Показано: ${visibleFormulas} з ${totalFormulas}`}
              size="small"
              onDelete={() => setSearchTerm('')}
              sx={{ height: { xs: 24, sm: 32 } }}
            />
          )}
        </Box>

        {/* ====================================================================
            СЕКЦІЇ З ФОРМУЛАМИ (АДАПТИВНІ)
            ==================================================================== */}
        {Object.entries(filteredGroups).map(([section, formulas]) => (
          <Paper
            key={section}
            sx={{
              mb: { xs: 1.5, sm: 2 },
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              overflow: 'hidden',
            }}
          >
            {/* Заголовок секції (клікабельний) */}
            <Box
              onClick={() => toggleSection(section)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: { xs: 1, sm: 1.5, md: 2 },
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Typography 
                variant={sectionVariant} 
                component="h3"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' }
                }}
              >
                {section}
              </Typography>
              <IconButton size={isMobile ? "small" : "medium"}>
                {expandedSections.has(section) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {/* Формули в секції */}
            <Collapse in={expandedSections.has(section) || !!searchTerm}>
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: { xs: 500, sm: 600, md: 700 } }}>
                  <TableBody>
                    {formulas.map((formula) => (
                      <TableRow
                        key={formula.id}
                        sx={{
                          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
                        }}
                      >
                        {/* Ліва колонка: назва та опис */}
                        <TableCell sx={{ 
                          width: { xs: '40%', sm: '35%', md: '30%' },
                          verticalAlign: 'top',
                          p: { xs: 1, sm: 1.5 }
                        }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 500,
                              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                            }}
                          >
                            {formula.title}
                          </Typography>
                          {formula.description && (
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                                display: 'block',
                                mt: 0.5
                              }}
                            >
                              {formula.description}
                            </Typography>
                          )}
                        </TableCell>
                        
                        {/* Права колонка: формула */}
                        <TableCell sx={{ 
                          verticalAlign: 'top',
                          p: { xs: 1, sm: 1.5 }
                        }}>
                          <Box sx={{ 
                            fontFamily: 'monospace', 
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                            overflowX: 'auto'
                          }}>
                            <MathFormula formula={formula.formula} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </Paper>
        ))}

        {/* ====================================================================
            ПОВІДОМЛЕННЯ ПРИ ВІДСУТНОСТІ ДАНИХ
            ==================================================================== */}
        {!data || data.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
            <CircularProgress size={isMobile ? 32 : 40} />
            <Typography sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Завантаження даних...
            </Typography>
          </Box>
        ) : null}
      </Paper>
    </>
  );
};

export default FormulasTable;

