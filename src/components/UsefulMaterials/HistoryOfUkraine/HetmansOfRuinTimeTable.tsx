// // Адаптация к различным экранам
// // components/UsefulMaterials/HistoryOfUkraine/HetmansOfRuinTimeTable.tsx

// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   InputAdornment,
//   Chip,
//   useTheme,
//   alpha,
//   Tooltip,
// } from '@mui/material';
// import { Search as SearchIcon, Info as InfoIcon } from '@mui/icons-material';

// interface Hetman {
//   id: number;
//   name: string;
//   rulingYears: string;
//   territory: string;
//   orientation: string;
//   keyTreaties: string;
//   description: string;
// }

// interface HetmansOfRuinTimeProps {
//   data: Hetman[];
// }

// const HetmansOfRuinTime: React.FC<HetmansOfRuinTimeProps> = ({ data }) => {
//   const theme = useTheme();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredData = useMemo(() => {
//     if (!data || !Array.isArray(data)) return [];
//     const searchLower = searchTerm.toLowerCase();
//     return data.filter(hetman => 
//       hetman.name.toLowerCase().includes(searchLower) ||
//       hetman.rulingYears.toLowerCase().includes(searchLower) ||
//       hetman.territory.toLowerCase().includes(searchLower) ||
//       hetman.orientation.toLowerCase().includes(searchLower) ||
//       (hetman.keyTreaties && hetman.keyTreaties.toLowerCase().includes(searchLower)) ||
//       hetman.description.toLowerCase().includes(searchLower)
//     );
//   }, [data, searchTerm]);

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const getTerritoryColor = (territory: string): string => {
//     if (territory.includes('Обидва')) return '#6A1B9A';
//     if (territory.includes('Лівобережжя')) return '#2E7D32';
//     if (territory.includes('Правобережжя')) return '#1565C0';
//     return '#37474F';
//   };

//   const getOrientationColor = (orientation: string): string => {
//     if (orientation.includes('Річ Посполита')) return '#E65100';
//     if (orientation.includes('Московське')) return '#C62828';
//     if (orientation.includes('Османська')) return '#00897B';
//     return '#FF8F00';
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%', overflowX: 'auto' }}>
//       <Box sx={{ mb: 3, textAlign: 'center' }}>
//         <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
//           🎖️ Гетьмани України періоду Руїни (1657–1687)
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Гетьмани Правобережжя, Лівобережжя та їхні протекторати
//         </Typography>
//       </Box>

//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="🔍 Пошук за іменем, роками правління, територією, орієнтацією або описом..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setPage(0);
//         }}
//         sx={{ mb: 3 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon color="action" />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
//         <Typography variant="body2" color="text.secondary">
//           📊 Всього гетьманів: {data.length ?? 0} | Знайдено: {filteredData.length}
//         </Typography>
//         {searchTerm && (
//           <Chip 
//             label={`Показано: ${filteredData.length ?? 0} з ${data.length ?? 0}`} 
//             size="small" 
//             color="primary" 
//             variant="outlined"
//           />
//         )}
//       </Box>

//       <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
//         <Table stickyHeader size="small" sx={{ minWidth: { xs: 800, sm: 900, md: 1000 }, tableLayout: 'fixed', width: '100%' }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 130, sm: 150, md: 170 } }}>🎖️ Гетьман</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 100, sm: 110, md: 120 } }}>⏳ Роки правління</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 130, sm: 140, md: 150 } }}>🌍 Територія</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 160, sm: 180, md: 200 } }}>🎌 Орієнтація</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 200, sm: 230, md: 260 } }}>📜 Ключові угоди</TableCell>
//               <TableCell sx={{ fontWeight: 700, minWidth: { xs: 250, sm: 300, md: 350 }, width: 'auto' }}>📝 Характеристика</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((hetman, index) => (
//               <TableRow
//                 key={hetman.id || index}
//                 sx={{
//                   '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
//                 }}
//               >
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {hetman.name}
//                   </Typography>
//                 </TableCell>
                
//                 <TableCell>
//                   <Chip label={hetman.rulingYears} size="small" variant="outlined" color="secondary" />
//                 </TableCell>
                
//                 <TableCell>
//                   <Chip 
//                     label={hetman.territory} 
//                     size="small" 
//                     sx={{ 
//                       backgroundColor: alpha(getTerritoryColor(hetman.territory), 0.15),
//                       color: getTerritoryColor(hetman.territory),
//                       fontWeight: 500,
//                       borderColor: getTerritoryColor(hetman.territory)
//                     }}
//                   />
//                 </TableCell>
                
//                 <TableCell>
//                   <Tooltip title={`Протекторат: ${hetman.orientation}`} arrow>
//                     <Chip 
//                       label={hetman.orientation.length > 25 ? hetman.orientation.substring(0, 22) + '...' : hetman.orientation}
//                       size="small"
//                       sx={{ 
//                         backgroundColor: alpha(getOrientationColor(hetman.orientation), 0.15),
//                         color: getOrientationColor(hetman.orientation),
//                         fontWeight: 500,
//                         borderColor: getOrientationColor(hetman.orientation),
//                         cursor: 'pointer',
//                         maxWidth: '100%'
//                       }}
//                     />
//                   </Tooltip>
//                 </TableCell>
                
//                 <TableCell>
//                   <Tooltip title={hetman.keyTreaties} arrow placement="top-start">
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <InfoIcon fontSize="small" sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem' }} />
//                       <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
//                         {hetman.keyTreaties.length > 120 
//                           ? hetman.keyTreaties.substring(0, 117) + '...' 
//                           : hetman.keyTreaties}
//                       </Typography>
//                     </Box>
//                   </Tooltip>
//                 </TableCell>
                
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
//                     {hetman.description}
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[15, 25, 50, 100]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         labelRowsPerPage="Рядків на сторінці:"
//         labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
//       />
//     </Paper>
//   );
// };

// export default HetmansOfRuinTime;



// Добавлено SEO для индексации
// components/UsefulMaterials/HistoryOfUkraine/HetmansOfRuinTimeTable.tsx


import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon, Info as InfoIcon } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

interface Hetman {
  id: number;
  name: string;
  rulingYears: string;
  territory: string;
  orientation: string;
  keyTreaties: string;
  description: string;
}

interface HetmansOfRuinTimeProps {
  data: Hetman[];
}

const HetmansOfRuinTime: React.FC<HetmansOfRuinTimeProps> = ({ data }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const searchLower = searchTerm.toLowerCase();
    return data.filter(hetman => 
      hetman.name.toLowerCase().includes(searchLower) ||
      hetman.rulingYears.toLowerCase().includes(searchLower) ||
      hetman.territory.toLowerCase().includes(searchLower) ||
      hetman.orientation.toLowerCase().includes(searchLower) ||
      (hetman.keyTreaties && hetman.keyTreaties.toLowerCase().includes(searchLower)) ||
      hetman.description.toLowerCase().includes(searchLower)
    );
  }, [data, searchTerm]);

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTerritoryColor = (territory: string): string => {
    if (territory.includes('Обидва')) return '#6A1B9A';
    if (territory.includes('Лівобережжя')) return '#2E7D32';
    if (territory.includes('Правобережжя')) return '#1565C0';
    return '#37474F';
  };

  const getOrientationColor = (orientation: string): string => {
    if (orientation.includes('Річ Посполита')) return '#E65100';
    if (orientation.includes('Московське')) return '#C62828';
    if (orientation.includes('Османська')) return '#00897B';
    return '#FF8F00';
  };

  // ============================================================================
// СТРУКТУРОВАНІ ДАНІ ДЛЯ ГЕТЬМАНІВ РУЇНИ (JSON-LD)
// ============================================================================

  const hetmansStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Гетьмани України періоду Руїни (1657–1687)",
    "description": "Гетьмани Правобережжя, Лівобережжя та їхні протекторати. Перелік гетьманів України періоду Руїни для підготовки до НМТ.",
    "numberOfItems": data.length,
    "itemListElement": data.slice(0, 50).map((hetman, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": hetman.name,
      "description": `${hetman.rulingYears} | ${hetman.territory} | ${hetman.orientation} | ${hetman.description.substring(0, 200)}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(hetmansStructuredData)}
        </script>
      </Helmet>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%', overflowX: 'auto' }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
            🎖️ Гетьмани України періоду Руїни (1657–1687)
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Гетьмани Правобережжя, Лівобережжя та їхні протекторати
          </Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="🔍 Пошук за іменем, роками правління, територією, орієнтацією або описом..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            📊 Всього гетьманів: {data.length ?? 0} | Знайдено: {filteredData.length}
          </Typography>
          {searchTerm && (
            <Chip 
              label={`Показано: ${filteredData.length ?? 0} з ${data.length ?? 0}`} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          )}
        </Box>

        <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader size="small" sx={{ minWidth: { xs: 800, sm: 900, md: 1000 }, tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 700, width: { xs: 130, sm: 150, md: 170 } }}>🎖️ Гетьман</TableCell>
                <TableCell sx={{ fontWeight: 700, width: { xs: 100, sm: 110, md: 120 } }}>⏳ Роки правління</TableCell>
                <TableCell sx={{ fontWeight: 700, width: { xs: 130, sm: 140, md: 150 } }}>🌍 Територія</TableCell>
                <TableCell sx={{ fontWeight: 700, width: { xs: 160, sm: 180, md: 200 } }}>🎌 Орієнтація</TableCell>
                <TableCell sx={{ fontWeight: 700, width: { xs: 200, sm: 230, md: 260 } }}>📜 Ключові угоди</TableCell>
                <TableCell sx={{ fontWeight: 700, minWidth: { xs: 250, sm: 300, md: 350 }, width: 'auto' }}>📝 Характеристика</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((hetman, index) => (
                <TableRow
                  key={hetman.id || index}
                  sx={{
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {hetman.name}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip label={hetman.rulingYears} size="small" variant="outlined" color="secondary" />
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={hetman.territory} 
                      size="small" 
                      sx={{ 
                        backgroundColor: alpha(getTerritoryColor(hetman.territory), 0.15),
                        color: getTerritoryColor(hetman.territory),
                        fontWeight: 500,
                        borderColor: getTerritoryColor(hetman.territory)
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Tooltip title={`Протекторат: ${hetman.orientation}`} arrow>
                      <Chip 
                        label={hetman.orientation.length > 25 ? hetman.orientation.substring(0, 22) + '...' : hetman.orientation}
                        size="small"
                        sx={{ 
                          backgroundColor: alpha(getOrientationColor(hetman.orientation), 0.15),
                          color: getOrientationColor(hetman.orientation),
                          fontWeight: 500,
                          borderColor: getOrientationColor(hetman.orientation),
                          cursor: 'pointer',
                          maxWidth: '100%'
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                  
                  <TableCell>
                    <Tooltip title={hetman.keyTreaties} arrow placement="top-start">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <InfoIcon fontSize="small" sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                          {hetman.keyTreaties.length > 120 
                            ? hetman.keyTreaties.substring(0, 117) + '...' 
                            : hetman.keyTreaties}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      {hetman.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[15, 25, 50, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Рядків на сторінці:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
        />
      </Paper>
    </>
  );
};

export default HetmansOfRuinTime;