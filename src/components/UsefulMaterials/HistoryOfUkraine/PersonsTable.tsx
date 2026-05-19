// // Адаптация к различным экранам
// // components/PersonsTable/PersonsTable.tsx

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
// } from '@mui/material';
// import { Search as SearchIcon } from '@mui/icons-material';

// interface Person {
//   id: number;
//   name: string;
//   years: string;
//   category: string;
//   categoryIcon: string;
//   description: string;
//   image?: string;
// }

// interface PersonsTableProps {
//   data: Person[];
// }

// const PersonsTable: React.FC<PersonsTableProps> = ({ data }) => {
//   const theme = useTheme();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredData = useMemo(() => {
//     if (!data || !Array.isArray(data)) return [];
//     const searchLower = searchTerm.toLowerCase();
//     return data.filter(person => 
//       person.name.toLowerCase().includes(searchLower) ||
//       person.years.toLowerCase().includes(searchLower) ||
//       person.category.toLowerCase().includes(searchLower) ||
//       person.description.toLowerCase().includes(searchLower)
//     );
//   }, [data, searchTerm]);

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const getCategoryColor = (category: string): string => {
//     if (category.includes('КИЇВСЬКА')) return '#2E7D32';
//     if (category.includes('ЛИТОВСЬКО-ПОЛЬСЬКА')) return '#6A1B9A';
//     if (category.includes('КОЗАЦЬКА')) return '#E65100';
//     if (category.includes('КУЛЬТУРА')) return '#1565C0';
//     if (category.includes('УНР')) return '#FF8F00';
//     if (category.includes('РУХ ОПОРУ')) return '#C62828';
//     if (category.includes('ШІСТДЕСЯТНИКИ')) return '#9C27B0';
//     if (category.includes('НЕЗАЛЕЖНА')) return '#1B5E20';
//     if (category.includes('НАУКА')) return '#00796B';
//     if (category.includes('ДРУГА СВІТОВА')) return '#F57C00';
//     if (category.includes('КРИМСЬКО-ТАТАРСЬКІ')) return '#00897B';
//     if (category.includes('МОНАРХИ')) return '#AFB42B';
//     if (category.includes('РАДЯНСЬКІ')) return '#B71C1C';
//     if (category.includes('БОРОТЬБА')) return '#D84315';
//     if (category.includes('ПОЛІТИЧНІ')) return '#AD1457';
//     return '#37474F';
//   };

//   const getCategoryDisplay = (category: string, icon: string): string => {
//     const fullNames: Record<string, string> = {
//       'КИЇВСЬКА РУСЬ': `${icon} Київська Русь (860–1240)`,
//       'ЛИТОВСЬКО-ПОЛЬСЬКА ДОБА': `${icon} Литовсько-польська доба (XIV–XVI ст.)`,
//       'КОЗАЦЬКА ДОБА': `${icon} Козацька доба (XVI–XVIII ст.)`,
//       'КУЛЬТУРА ТА ОСВІТА': `${icon} Культура та освіта`,
//       'БОРОТЬБА ПРОТИ ГНІТУ': `${icon} Боротьба проти гніту`,
//       'КРИМСЬКО-ТАТАРСЬКА КУЛЬТУРА': `${icon} Кримсько-татарські діячі`,
//       'КРИМСЬКО-ТАТАРСЬКІ ДІЯЧІ': `${icon} Кримсько-татарські діячі`,
//       'ПОЛІТИЧНІ ДІЯЧІ': `${icon} Політичні діячі`,
//       'МОНАРХИ': `${icon} Імператори та монархи`,
//       'РАДЯНСЬКІ ДІЯЧІ': `${icon} Радянські діячі`,
//       'НАУКА ТА ТЕХНІКА': `${icon} Наука та техніка`,
//       'РУХ ОПОРУ': `${icon} Визвольний рух (УВО/ОУН/УПА)`,
//       'УНР': `${icon} Українська Народна Республіка`,
//       'ШІСТДЕСЯТНИКИ': `${icon} Шістдесятники`,
//       'НЕЗАЛЕЖНА УКРАЇНА': `${icon} Незалежна Україна`,
//       'ДРУГА СВІТОВА': `${icon} Друга світова війна`,
//     };
//     return fullNames[category] || `${icon} ${category}`;
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%', overflowX: 'auto' }}>
//       <Box sx={{ mb: 3, textAlign: 'center' }}>
//         <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
//           👤 Історичні персоналії України
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Для підготовки до НМТ з історії України
//         </Typography>
//       </Box>

//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="🔍 Пошук за іменем, роками, категорією або описом..."
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

//       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="body2" color="text.secondary">
//           📊 Загалом персоналій: {data.length ?? 0} | Знайдено: {filteredData.length}
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
//         <Table stickyHeader size="small" sx={{ minWidth: { xs: 600, sm: 700, md: 800 }, tableLayout: 'fixed', width: '100%' }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 140, sm: 160, md: 180 } }}>👤 Персоналія</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 95, sm: 100, md: 105 } }}>📅 Роки життя</TableCell>
//               <TableCell sx={{ fontWeight: 700, width: { xs: 180, sm: 200, md: 220 } }}>🏷️ Категорія</TableCell>
//               <TableCell sx={{ fontWeight: 700, minWidth: { xs: 250, sm: 300, md: 350 }, width: 'auto' }}>📜 Основна діяльність / Внесок</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((person) => (
//               <TableRow
//                 key={person.id}
//                 sx={{
//                   '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
//                   borderLeft: `4px solid ${getCategoryColor(person.category)}`
//                 }}
//               >
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {person.name}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Chip label={person.years} size="small" variant="outlined" />
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
//                     {getCategoryDisplay(person.category, person.categoryIcon)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
//                     {person.description}
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

// export default PersonsTable;



// components/UsefulMaterials/HistoryOfUkraine/PersonTable.tsx
// ============================================================================
// КОМПОНЕНТ ТАБЛИЦІ ІСТОРИЧНИХ ПЕРСОНАЛІЙ УКРАЇНИ
// ============================================================================
// 

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
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

interface Person {
  id: number;
  name: string;
  years: string;
  category: string;
  categoryIcon: string;
  description: string;
  image?: string;
}

interface PersonsTableProps {
  data: Person[];
}

const PersonsTable: React.FC<PersonsTableProps> = ({ data }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const searchLower = searchTerm.toLowerCase();
    return data.filter(person => 
      person.name.toLowerCase().includes(searchLower) ||
      person.years.toLowerCase().includes(searchLower) ||
      person.category.toLowerCase().includes(searchLower) ||
      person.description.toLowerCase().includes(searchLower)
    );
  }, [data, searchTerm]);

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCategoryColor = (category: string): string => {
    if (category.includes('КИЇВСЬКА')) return '#2E7D32';
    if (category.includes('ЛИТОВСЬКО-ПОЛЬСЬКА')) return '#6A1B9A';
    if (category.includes('КОЗАЦЬКА')) return '#E65100';
    if (category.includes('КУЛЬТУРА')) return '#1565C0';
    if (category.includes('УНР')) return '#FF8F00';
    if (category.includes('РУХ ОПОРУ')) return '#C62828';
    if (category.includes('ШІСТДЕСЯТНИКИ')) return '#9C27B0';
    if (category.includes('НЕЗАЛЕЖНА')) return '#1B5E20';
    if (category.includes('НАУКА')) return '#00796B';
    if (category.includes('ДРУГА СВІТОВА')) return '#F57C00';
    if (category.includes('КРИМСЬКО-ТАТАРСЬКІ')) return '#00897B';
    if (category.includes('МОНАРХИ')) return '#AFB42B';
    if (category.includes('РАДЯНСЬКІ')) return '#B71C1C';
    if (category.includes('БОРОТЬБА')) return '#D84315';
    if (category.includes('ПОЛІТИЧНІ')) return '#AD1457';
    return '#37474F';
  };

  const getCategoryDisplay = (category: string, icon: string): string => {
    const fullNames: Record<string, string> = {
      'КИЇВСЬКА РУСЬ': `${icon} Київська Русь (860–1240)`,
      'ЛИТОВСЬКО-ПОЛЬСЬКА ДОБА': `${icon} Литовсько-польська доба (XIV–XVI ст.)`,
      'КОЗАЦЬКА ДОБА': `${icon} Козацька доба (XVI–XVIII ст.)`,
      'КУЛЬТУРА ТА ОСВІТА': `${icon} Культура та освіта`,
      'БОРОТЬБА ПРОТИ ГНІТУ': `${icon} Боротьба проти гніту`,
      'КРИМСЬКО-ТАТАРСЬКА КУЛЬТУРА': `${icon} Кримсько-татарські діячі`,
      'КРИМСЬКО-ТАТАРСЬКІ ДІЯЧІ': `${icon} Кримсько-татарські діячі`,
      'ПОЛІТИЧНІ ДІЯЧІ': `${icon} Політичні діячі`,
      'МОНАРХИ': `${icon} Імператори та монархи`,
      'РАДЯНСЬКІ ДІЯЧІ': `${icon} Радянські діячі`,
      'НАУКА ТА ТЕХНІКА': `${icon} Наука та техніка`,
      'РУХ ОПОРУ': `${icon} Визвольний рух (УВО/ОУН/УПА)`,
      'УНР': `${icon} Українська Народна Республіка`,
      'ШІСТДЕСЯТНИКИ': `${icon} Шістдесятники`,
      'НЕЗАЛЕЖНА УКРАЇНА': `${icon} Незалежна Україна`,
      'ДРУГА СВІТОВА': `${icon} Друга світова війна`,
    };
    return fullNames[category] || `${icon} ${category}`;
  };

  // 👇 СТРУКТУРОВАНІ ДАНІ ДЛЯ ІСТОРИЧНИХ ПЕРСОНАЛІЙ.

  const personsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Історичні персоналії України",
  "description": "Повний перелік видатних історичних персоналій України для підготовки до НМТ.",
  "numberOfItems": data.length,
  "itemListElement": data.slice(0, 50).map((person, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "name": person.name,
    "description": `${person.years} | ${person.category} | ${person.description.substring(0, 200)}`
  }))
};

  return (
    <>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(personsStructuredData)}
          </script>
        </Helmet>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%', overflowX: 'auto' }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
              👤 Історичні персоналії України
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Для підготовки до НМТ з історії України
            </Typography>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="🔍 Пошук за іменем, роками, категорією або описом..."
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

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              📊 Загалом персоналій: {data.length ?? 0} | Знайдено: {filteredData.length}
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
            <Table stickyHeader size="small" sx={{ minWidth: { xs: 600, sm: 700, md: 800 }, tableLayout: 'fixed', width: '100%' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 700, width: { xs: 140, sm: 160, md: 180 } }}>👤 Персоналія</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: { xs: 95, sm: 100, md: 105 } }}>📅 Роки життя</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: { xs: 180, sm: 200, md: 220 } }}>🏷️ Категорія</TableCell>
                  <TableCell sx={{ fontWeight: 700, minWidth: { xs: 250, sm: 300, md: 350 }, width: 'auto' }}>📜 Основна діяльність / Внесок</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((person) => (
                  <TableRow
                    key={person.id}
                    sx={{
                      '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                      borderLeft: `4px solid ${getCategoryColor(person.category)}`
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {person.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={person.years} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {getCategoryDisplay(person.category, person.categoryIcon)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                        {person.description}
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

export default PersonsTable;