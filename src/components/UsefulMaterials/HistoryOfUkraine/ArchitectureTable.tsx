// // components/UsefulMaterials/ArchitectureTable.tsx

// import React, { useState } from 'react';
// import {
//   Box, Typography, Accordion, AccordionSummary, AccordionDetails,
//   Paper, useTheme, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TablePagination, TextField, InputAdornment,
//   Chip
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Search as SearchIcon } from '@mui/icons-material';
// import type { ArchitecturalSite } from '../../../constants';
// import { ZoomableImage } from '../../ZoomableImage';

// interface ArchitectureTableProps {
//   data: {
//     ancientMedievalData: ArchitecturalSite[];
//     earlyModernData: ArchitecturalSite[];
//     modernData: ArchitecturalSite[];
//     contemporaryData: ArchitecturalSite[];
//   };
// }

// // Компонент для однієї таблиці
// const ArchitectureSubTable: React.FC<{ data: ArchitecturalSite[]; title: string }> = ({ data, title }) => {
//   const theme = useTheme();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   if (!data || data.length === 0) {
//     return (
//       <Box sx={{ p: 2, textAlign: 'center' }}>
//         <Typography color="text.secondary">Немає даних</Typography>
//       </Box>
//     );
//   }

//   const filteredData = data.filter(item =>
//     item.name_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.yearBuilt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
//         {title}
//       </Typography>
      
//       <TextField
//         fullWidth
//         size="small"
//         placeholder="🔍 Пошук за назвою, місцем, стилем, територією..."
//         value={searchTerm}
//         onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
//         sx={{ mb: 2 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon color="action" />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
//         {/* 'fixed' - важно для регулировки ширини колонок*/}
//         <Table size="small" stickyHeader sx={{ minWidth: { xs: 600, sm: 700, md: 800 }, tableLayout: 'fixed', width: '100%'}}> 
//             <TableHead>
//                 <TableRow>
//                     <TableCell sx={{ fontWeight: 700, width: { xs: 40, sm: 50, md: 60 } }}>№</TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 700,
//                       //  width: { xs: 80, sm: 100, md: 120 } }}
//                       minWidth: { xs: 90, sm: 100, md: 110 },
//                       width: { xs: '15%', sm: '15%', md: '20%'} }}
//                        >
//                         🖼️ Зображення
//                         </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 700, 
//                       minWidth: { xs: 90, sm: 100, md: 110 },
//                       width: { xs: '12%', sm: '12%', md: '16%' }
//                     }}>
//                     📍 Назва та місце
//                     </TableCell>
//                     <TableCell sx={{ 
//                     fontWeight: 700, 
//                     minWidth: { xs: 80, sm: 90, md: 100 },
//                     width: { xs: '12%', sm: '12%', md: '16%' },
//                     }}>
//                     🏛️ Стиль
//                     </TableCell>
//                     <TableCell sx={{ 
//                     fontWeight: 700, 
//                     minWidth: { xs: 200, sm: 300, md: 450 },
//                     width: 'auto'
//                     }}>
//                     📝 Опис
//                     </TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//             {paginatedData.map((item, idx) => (
//                 <TableRow key={item.id} hover>
//                 <TableCell align="center">
//                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {(page * rowsPerPage) + idx + 1}
//                     </Typography>
//                 </TableCell>
                
//                 {/* Колонка зображення */}
//                 <TableCell align="center">
//                     {item.imageUrl ? (
//                     <ZoomableImage 
//                         src={item.imageUrl} 
//                         alt={item.name_location} 
//                         maxHeight={80} 
//                         maxWidth="100%"
//                     />
//                     ) : (
//                     <Box 
//                         sx={{ 
//                         width: 100, 
//                         height: 80, 
//                         bgcolor: 'action.hover', 
//                         borderRadius: 1,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flexDirection: 'column',
//                         gap: 0.5
//                         }}
//                     >
//                         <Typography variant="h5">🏛️</Typography>
//                         <Typography variant="caption" color="text.secondary">Немає фото</Typography>
//                     </Box>
//                     )}
//                 </TableCell>
                
//                 {/* Назва та місце (об'єднано) */}
//                 <TableCell>
//                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {item.name_location}
//                     </Typography>
//                 </TableCell>
                
//                 {/* Стиль */}
//                 <TableCell sx={{ 
//                   whiteSpace: 'normal', 
//                   wordBreak: 'break-word',
//                   verticalAlign: 'top'
//                 }}>
//                   <Chip 
//                     label={item.style} 
//                     size="small" 
//                     variant="outlined"
//                     sx={{ 
//                       whiteSpace: 'normal',
//                       height: 'auto',
//                       minHeight: '32px',
//                       alignItems: 'flex-start',
//                       '& .MuiChip-label': { 
//                         whiteSpace: 'normal',
//                         display: 'block',
//                         padding: '8px',
//                         lineHeight: 1.3
//                       }
//                     }}
//                   />
//                 </TableCell>
                
//                 {/* Опис (з роком та територією) */}
//                 <TableCell>
//                     <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
//                     📅 {item.yearBuilt} | {item.description}
//                     </Typography>
//                 </TableCell>
//                 </TableRow>
//             ))}
//             </TableBody>
//         </Table>
//         </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(_e, p) => setPage(p)}
//         onRowsPerPageChange={(e) => { 
//           setRowsPerPage(parseInt(e.target.value, 10)); 
//           setPage(0); 
//         }}
//         labelRowsPerPage="Рядків на сторінці:"
//         labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
//       />
//     </Box>
//   );
// };

// // Основний компонент - обгортка з акордеонами
// const ArchitectureTable: React.FC<ArchitectureTableProps> = ({ data }) => {
//   const { ancientMedievalData, earlyModernData, modernData, contemporaryData } = data;
//   const [expanded, setExpanded] = useState<string | false>('ancientMedieval');

//   const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//       <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}>
//         🏛️ Пам'ятки архітектури України
//       </Typography>
//       <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 3 }}>
//         Від античності до сучасності
//       </Typography>

//       <Accordion expanded={expanded === 'ancientMedieval'} onChange={handleChange('ancientMedieval')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🏛️ СТАРОДАВНІЙ СВІТ ТА СЕРЕДНЬОВІЧЧЯ (III–V ст. н.е. – XV ст.)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <ArchitectureSubTable data={ancientMedievalData} title="Стародавній світ та Середньовіччя" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'earlyModern'} onChange={handleChange('earlyModern')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🎨 РАННІЙ НОВИЙ ЧАС (XVI – XVIII ст.)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <ArchitectureSubTable data={earlyModernData} title="Ранній новий час" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'modern'} onChange={handleChange('modern')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🏛️ НОВИЙ ЧАС (XIX – початок XX ст.)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <ArchitectureSubTable data={modernData} title="Новий час" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'contemporary'} onChange={handleChange('contemporary')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🏗️ НОВІТНІЙ ЧАС (1914 – дотепер)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <ArchitectureSubTable data={contemporaryData} title="Новітній час" />
//         </AccordionDetails>
//       </Accordion>
//     </Paper>
//   );
// };

// export default ArchitectureTable;

// Добавлено SEO для индексации
// components/UsefulMaterials/ArchitectureTable.tsx

import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  Paper, useTheme, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, TextField, InputAdornment,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Search as SearchIcon } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import type { ArchitecturalSite } from '../../../constants';
import { ZoomableImage } from '../../ZoomableImage';

interface ArchitectureTableProps {
  data: {
    ancientMedievalData: ArchitecturalSite[];
    earlyModernData: ArchitecturalSite[];
    modernData: ArchitecturalSite[];
    contemporaryData: ArchitecturalSite[];
  };
}

// Компонент для однієї таблиці
const ArchitectureSubTable: React.FC<{ data: ArchitecturalSite[]; title: string }> = ({ data, title }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">Немає даних</Typography>
      </Box>
    );
  }

  const filteredData = data.filter(item =>
    item.name_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.yearBuilt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
        {title}
      </Typography>
      
      <TextField
        fullWidth
        size="small"
        placeholder="🔍 Пошук за назвою, місцем, стилем..."
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="small" stickyHeader sx={{ minWidth: { xs: 600, sm: 700, md: 800 }, tableLayout: 'fixed', width: '100%'}}> 
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: { xs: 40, sm: 50, md: 60 } }}>№</TableCell>
              <TableCell sx={{ 
                fontWeight: 700,
                minWidth: { xs: 90, sm: 100, md: 110 },
                width: { xs: '15%', sm: '15%', md: '20%'} }}
              >
                🖼️ Зображення
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                minWidth: { xs: 90, sm: 100, md: 110 },
                width: { xs: '12%', sm: '12%', md: '16%' }
              }}>
                📍 Назва та місце
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                minWidth: { xs: 80, sm: 90, md: 100 },
                width: { xs: '12%', sm: '12%', md: '16%' },
              }}>
                🏛️ Стиль
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                minWidth: { xs: 200, sm: 300, md: 450 },
                width: 'auto'
              }}>
                📝 Опис
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, idx) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {(page * rowsPerPage) + idx + 1}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {item.imageUrl ? (
                    <ZoomableImage 
                      src={item.imageUrl} 
                      alt={item.name_location} 
                      maxHeight={80} 
                      maxWidth="100%"
                    />
                  ) : (
                    <Box sx={{ width: 100, height: 80, bgcolor: 'action.hover', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="h5">🏛️</Typography>
                      <Typography variant="caption" color="text.secondary">Немає фото</Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.name_location}
                  </Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', verticalAlign: 'top' }}>
                  <Chip 
                    label={item.style} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      whiteSpace: 'normal',
                      height: 'auto',
                      minHeight: '32px',
                      alignItems: 'flex-start',
                      '& .MuiChip-label': { whiteSpace: 'normal', display: 'block', padding: '8px', lineHeight: 1.3 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    📅 {item.yearBuilt} | {item.description}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_e, p) => setPage(p)}
        onRowsPerPageChange={(e) => { 
          setRowsPerPage(parseInt(e.target.value, 10)); 
          setPage(0); 
        }}
        labelRowsPerPage="Рядків на сторінці:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
      />
    </Box>
  );
};

// Основний компонент - обгортка з акордеонами
const ArchitectureTable: React.FC<ArchitectureTableProps> = ({ data }) => {
  const { ancientMedievalData, earlyModernData, modernData, contemporaryData } = data;
  const [expanded, setExpanded] = useState<string | false>('ancientMedieval');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // 👇 СТРУКТУРОВАНІ ДАНІ ДЛЯ АРХІТЕКТУРИ
  const allArchitectureData = [
    ...(ancientMedievalData || []),
    ...(earlyModernData || []),
    ...(modernData || []),
    ...(contemporaryData || [])
  ];

  const architectureStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Пам'ятки архітектури України",
    "description": "Від античності до сучасності. Пам'ятки архітектури України за історичними періодами.",
    "numberOfItems": allArchitectureData.length,
    "itemListElement": allArchitectureData.slice(0, 50).map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name_location,
      "description": `${item.style} | 📅 ${item.yearBuilt} | ${item.description.substring(0, 200)}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(architectureStructuredData)}
        </script>
      </Helmet>
      
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}>
          🏛️ Пам'ятки архітектури України
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 3 }}>
          Від античності до сучасності
        </Typography>

        <Accordion expanded={expanded === 'ancientMedieval'} onChange={handleChange('ancientMedieval')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🏛️ СТАРОДАВНІЙ СВІТ ТА СЕРЕДНЬОВІЧЧЯ (III–V ст. н.е. – XV ст.)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ArchitectureSubTable data={ancientMedievalData} title="Стародавній світ та Середньовіччя" />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'earlyModern'} onChange={handleChange('earlyModern')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🎨 РАННІЙ НОВИЙ ЧАС (XVI – XVIII ст.)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ArchitectureSubTable data={earlyModernData} title="Ранній новий час" />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'modern'} onChange={handleChange('modern')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🏛️ НОВИЙ ЧАС (XIX – початок XX ст.)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ArchitectureSubTable data={modernData} title="Новий час" />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'contemporary'} onChange={handleChange('contemporary')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🏗️ НОВІТНІЙ ЧАС (1914 – дотепер)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ArchitectureSubTable data={contemporaryData} title="Новітній час" />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
};

export default ArchitectureTable;