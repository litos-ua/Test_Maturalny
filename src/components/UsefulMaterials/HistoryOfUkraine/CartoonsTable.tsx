// //Адаптация к различным экранам
// // components/UsefulMaterials/HistoryOfUkraine/CartoonsTable.tsx

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Paper,
//   useTheme,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   InputAdornment,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { ZoomableImage } from '../../ZoomableImage';
// import { Search as SearchIcon } from '@mui/icons-material';

// import type { Cartoon } from '../../../constants/UsefulMaterials/HistoryOfUkraine/Cartoons';

// interface CartoonsTableProps {
//   data: {
//     preSovietData: Cartoon[];
//     sovietEarlyData: Cartoon[];
//     ww2Data: Cartoon[];
//     postWarData: Cartoon[];
//     bureaucracyData: Cartoon[];
//     deficitData: Cartoon[];
//     serviceData: Cartoon[];
//     nesunyData: Cartoon[];
//     bezhozData: Cartoon[];
//     nenuzhnajaProdData: Cartoon[];
//     perebudovaData: Cartoon[];
//     ukraineData: Cartoon[];
//   };
// }

// // Компонент для відображення однієї таблиці карикатур
// const CartoonsSubTable: React.FC<{ data: Cartoon[]; title: string }> = ({ data, title }) => {
//   const theme = useTheme();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 10;

//   if (!data || !Array.isArray(data)) {
//     return (
//       <Box sx={{ p: 2, textAlign: 'center' }}>
//         <Typography color="error">Дані не завантажено або відсутні</Typography>
//       </Box>
//     );
//   }

//   const filteredData = data.filter(item =>
//     item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.explanation.toLowerCase().includes(searchTerm.toLowerCase())
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
//         placeholder="🔍 Пошук..."
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

//       <TableContainer sx={{ overflowX: 'auto' }}>
//         <Table size="small" stickyHeader sx={{ minWidth: { xs: 600, sm: 700, md: 900 }, tableLayout: 'fixed', width: '100%' }}>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 80, sm: 90, md: 100 } }}>🖼️ Карикатура</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 100, sm: 120, md: 140 } }}>🌍 Країна</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 100, sm: 110, md: 120 } }}>📅 Дата</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 150, sm: 180, md: 220 } }}>🎯 Об'єкт висміювання</TableCell>
//               <TableCell sx={{ fontWeight: 700, minWidth: { xs: 200, sm: 250, md: 300 }, width: 'auto' }}>📝 Пояснення</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((item) => (
//               <TableRow key={item.id} hover>
//                 <TableCell>
//                   <ZoomableImage src={item.imageUrl} alt="cartoon" maxHeight={80} maxWidth={120} />
//                 </TableCell>
//                 <TableCell>{item.country}</TableCell>
//                 <TableCell>{item.date}</TableCell>
//                 <TableCell>{item.target}</TableCell>
//                 <TableCell>{item.explanation}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(_e, p) => setPage(p)}
//         onRowsPerPageChange={(e) => {
//           // rowsPerPage не змінюється, залишається 10
//           setPage(0);
//         }}
//         labelRowsPerPage="Рядків на сторінці:"
//         labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
//         sx={{
//           '.MuiTablePagination-select': { display: 'none' },
//           '.MuiTablePagination-selectLabel': { display: 'none' }
//         }}
//       />
//     </Box>
//   );
// };

// // Основний компонент - без змін, залишається як у вас
// const CartoonsTable: React.FC<CartoonsTableProps> = ({ data }) => {
//   const { 
//     preSovietData, 
//     sovietEarlyData, 
//     ww2Data, 
//     postWarData, 
//     bureaucracyData,
//     deficitData,
//     serviceData,
//     nesunyData,
//     bezhozData,
//     nenuzhnajaProdData,
//     perebudovaData,
//     ukraineData
//   } = data;
//   const [expanded, setExpanded] = useState<string | false>('preSoviet');

//   const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//       <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
//         🎭 Сатиричні карикатури
//       </Typography>
//       <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
//         Політична сатира в історії України (XVIII–XX ст.)
//       </Typography>

//       <Accordion expanded={expanded === 'preSoviet'} onChange={handleChange('preSoviet')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">📜 Дорадянський період (XVIII – початок XX ст.)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={preSovietData} title="Карикатури дорадянського часу" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'sovietEarly'} onChange={handleChange('sovietEarly')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🔴 Радянські карикатури (1919–1939)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={sovietEarlyData} title="Радянські карикатури перших десятиліть" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'ww2'} onChange={handleChange('ww2')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">⚔️ Карикатури часів Другої світової війни (1939–1945)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={ww2Data} title="Радянські та німецькі пропагандистські карикатури" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'postWar'} onChange={handleChange('postWar')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🔵 Радянські карикатури післявоєнного часу та «відлиги» (1946–1964)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={postWarData} title="Карикатури післявоєнного часу та відлиги" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'bureaucracy'} onChange={handleChange('bureaucracy')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">📋 Радянські карикатури: Бюрократизм та номенклатура</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={bureaucracyData} title="Карикатури післявоєнного часу та відлиги" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'deficit'} onChange={handleChange('deficit')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">📦 Радянські карикатури часу «застою». Дефіцит (1965–1990)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={deficitData} title="Карикатури про дефіцит та «блат»" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'service'} onChange={handleChange('service')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🔧 Радянські карикатури часу «застою». Сервіс (1965–1990)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={serviceData} title="Карикатури про низьку якість сервісу" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'nesuny'} onChange={handleChange('nesuny')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🥩 Радянські карикатури часу «застою». «Несуни» (1965–1990)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={nesunyData} title="Карикатури про дрібні крадіжки на роботі" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'bezhoz'} onChange={handleChange('bezhoz')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🏢 Радянські карикатури часу «застою». Безгосподарність (1965–1990)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={bezhozData} title="Карикатури про неефективність НДІ" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'nenuzhnaja'} onChange={handleChange('nenuzhnaja')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">👢 Радянські карикатури часу «застою». Неліквідна продукція (1965–1990)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={nenuzhnajaProdData} title="Карикатури про неякісні товари" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'perebudova'} onChange={handleChange('perebudova')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">📢 Радянські карикатури часу «перебудови» (1985–1991)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={perebudovaData} title="Карикатури про перебудову та чиновників" />
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'ukraine'} onChange={handleChange('ukraine')}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">🇺🇦 Карикатури часів незалежної України (1990-ті)</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <CartoonsSubTable data={ukraineData} title="Карикатури про економічну кризу в Україні" />
//         </AccordionDetails>
//       </Accordion>
//     </Paper>
//   );
// };

// export default CartoonsTable;




// components/UsefulMaterials/HistoryOfUkraine/CartoonsTable.tsx
// ============================================================================
// КОМПОНЕНТ ТАБЛИЦІ ТВОРІВ РАДЯНСЬКИХ КАРИКАТУР ТА ПЛАКАТІВ
// ============================================================================
// 

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ZoomableImage } from '../../ZoomableImage';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon } from '@mui/icons-material';

import type { Cartoon } from '../../../constants/UsefulMaterials/HistoryOfUkraine/Cartoons';

interface CartoonsTableProps {
  data: {
    preSovietData: Cartoon[];
    sovietEarlyData: Cartoon[];
    ww2Data: Cartoon[];
    postWarData: Cartoon[];
    bureaucracyData: Cartoon[];
    deficitData: Cartoon[];
    serviceData: Cartoon[];
    nesunyData: Cartoon[];
    bezhozData: Cartoon[];
    nenuzhnajaProdData: Cartoon[];
    perebudovaData: Cartoon[];
    ukraineData: Cartoon[];
  };
}

// Компонент для відображення однієї таблиці карикатур
const CartoonsSubTable: React.FC<{ data: Cartoon[]; title: string }> = ({ data, title }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  if (!data || !Array.isArray(data)) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">Дані не завантажено або відсутні</Typography>
      </Box>
    );
  }

  const filteredData = data.filter(item =>
    item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.explanation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2, color: theme.palette.primary.main }}>
        {title}
      </Typography>
      
      <TextField
        fullWidth
        size="small"
        placeholder="🔍 Пошук..."
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

      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small" stickyHeader sx={{ minWidth: { xs: 600, sm: 700, md: 900 }, tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: { xs: 80, sm: 90, md: 100 } }}>🖼️ Карикатура</TableCell>
              <TableCell sx={{ fontWeight: 700, width: { xs: 100, sm: 120, md: 140 } }}>🌍 Країна</TableCell>
              <TableCell sx={{ fontWeight: 700, width: { xs: 100, sm: 110, md: 120 } }}>📅 Дата</TableCell>
              <TableCell sx={{ fontWeight: 700, width: { xs: 150, sm: 180, md: 220 } }}>🎯 Об'єкт висміювання</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: { xs: 200, sm: 250, md: 300 }, width: 'auto' }}>📝 Пояснення</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <ZoomableImage src={item.imageUrl} alt="cartoon" maxHeight={80} maxWidth={120} />
                </TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell>{item.explanation}</TableCell>
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
          // rowsPerPage не змінюється, залишається 10
          setPage(0);
        }}
        labelRowsPerPage="Рядків на сторінці:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
        sx={{
          '.MuiTablePagination-select': { display: 'none' },
          '.MuiTablePagination-selectLabel': { display: 'none' }
        }}
      />
    </Box>
  );
};

// Основний компонент - без змін, залишається як у вас
const CartoonsTable: React.FC<CartoonsTableProps> = ({ data }) => {
  const { 
    preSovietData, 
    sovietEarlyData, 
    ww2Data, 
    postWarData, 
    bureaucracyData,
    deficitData,
    serviceData,
    nesunyData,
    bezhozData,
    nenuzhnajaProdData,
    perebudovaData,
    ukraineData
  } = data;
  const [expanded, setExpanded] = useState<string | false>('preSoviet');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // ==========================================================================
  // SEO: СТРУКТУРОВАНІ ДАНІ JSON-LD
  // ==========================================================================

    const allCartoonsData = useMemo(() => [
    ...(preSovietData || []),
    ...(sovietEarlyData || []),
    ...(ww2Data || []),
    ...(postWarData || []),
    ...(bureaucracyData || []),
    ...(deficitData || []),
    ...(serviceData || []),
    ...(nesunyData || []),
    ...(bezhozData || []),
    ...(nenuzhnajaProdData || []),
    ...(perebudovaData || []),
    ...(ukraineData || [])
  ], [
    preSovietData, sovietEarlyData, ww2Data, postWarData, bureaucracyData,
    deficitData, serviceData, nesunyData, bezhozData, nenuzhnajaProdData,
    perebudovaData, ukraineData
  ]);

  const cartoonsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Сатиричні карикатури України",
    "description": "Політична сатира в історії України (XVIII–XX ст.). Збірка карикатур різних періодів: від дорадянських часів до незалежної України.",
    "numberOfItems": allCartoonsData.length,
    "itemListElement": allCartoonsData.slice(0, 50).map((cartoon, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `Карикатура: ${cartoon.target?.substring(0, 60) || 'Без назви'}`,
      "description": `${cartoon.country || ''} | ${cartoon.date || ''} | ${cartoon.target?.substring(0, 100) || ''} | ${cartoon.explanation?.substring(0, 150) || ''}`
    }))
  };



  return (
    <>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(cartoonsStructuredData)}
          </script>
        </Helmet>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
            🎭 Сатиричні карикатури
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
            Політична сатира в історії України (XVIII–XX ст.)
          </Typography>

          <Accordion expanded={expanded === 'preSoviet'} onChange={handleChange('preSoviet')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">📜 Дорадянський період (XVIII – початок XX ст.)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={preSovietData} title="Карикатури дорадянського часу" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'sovietEarly'} onChange={handleChange('sovietEarly')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">🔴 Радянські карикатури (1919–1939)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={sovietEarlyData} title="Радянські карикатури перших десятиліть" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'ww2'} onChange={handleChange('ww2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">⚔️ Карикатури часів Другої світової війни (1939–1945)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={ww2Data} title="Радянські та німецькі пропагандистські карикатури" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'postWar'} onChange={handleChange('postWar')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">🔵 Радянські карикатури післявоєнного часу та «відлиги» (1946–1964)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={postWarData} title="Карикатури післявоєнного часу та відлиги" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'bureaucracy'} onChange={handleChange('bureaucracy')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">📋 Радянські карикатури: Бюрократизм та номенклатура</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={bureaucracyData} title="Карикатури післявоєнного часу та відлиги" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'deficit'} onChange={handleChange('deficit')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">📦 Радянські карикатури часу «застою». Дефіцит (1965–1990)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={deficitData} title="Карикатури про дефіцит та «блат»" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'service'} onChange={handleChange('service')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">🔧 Радянські карикатури часу «застою». Сервіс (1965–1990)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={serviceData} title="Карикатури про низьку якість сервісу" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'nesuny'} onChange={handleChange('nesuny')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">🥩 Радянські карикатури часу «застою». «Несуни» (1965–1990)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={nesunyData} title="Карикатури про дрібні крадіжки на роботі" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'bezhoz'} onChange={handleChange('bezhoz')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">🏢 Радянські карикатури часу «застою». Безгосподарність (1965–1990)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={bezhozData} title="Карикатури про неефективність НДІ" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'nenuzhnaja'} onChange={handleChange('nenuzhnaja')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">👢 Радянські карикатури часу «застою». Неліквідна продукція (1965–1990)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={nenuzhnajaProdData} title="Карикатури про неякісні товари" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'perebudova'} onChange={handleChange('perebudova')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">📢 Радянські карикатури часу «перебудови» (1985–1991)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={perebudovaData} title="Карикатури про перебудову та чиновників" />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'ukraine'} onChange={handleChange('ukraine')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">🇺🇦 Карикатури часів незалежної України (1990-ті)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CartoonsSubTable data={ukraineData} title="Карикатури про економічну кризу в Україні" />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </>
  );
};

export default CartoonsTable;