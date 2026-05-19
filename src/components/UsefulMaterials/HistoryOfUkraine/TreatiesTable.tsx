// // Адаптация к различным экранам
// import React from 'react';
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
//   useTheme,
//   alpha,
//   CircularProgress,
// } from '@mui/material';

// interface Treaty {
//   id: number;
//   section: string;
//   treaty: string;
//   year: string;
//   parties: string;
//   description: string;
// }

// interface TreatiesTableProps {
//   data?: Treaty[];
// }

// export const TreatiesTable: React.FC<TreatiesTableProps> = ({ data }) => {
//   const theme = useTheme();

//   if (!data || !Array.isArray(data)) {
//     return (
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
//         <CircularProgress />
//         <Typography sx={{ mt: 2 }}>Завантаження даних...</Typography>
//       </Paper>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
//         <Typography variant="h6">📭 Немає даних для відображення</Typography>
//       </Paper>
//     );
//   }

//   const getSectionColor = (section: string): string => {
//     if (section.includes('КИЇВСЬКА')) return '#2E7D32';
//     if (section.includes('ЛИТОВСЬКО-ПОЛЬСЬКА')) return '#6A1B9A';
//     if (section.includes('КОЗАЦЬКА')) return '#E65100';
//     if (section.includes('РОСІЙСЬКО-ТУРЕЦЬКІ')) return '#1565C0';
//     if (section.includes('ПЕРША СВІТОВА')) return '#FF8F00';
//     if (section.includes('ДРУГА СВІТОВА')) return '#C62828';
//     if (section.includes('НЕЗАЛЕЖНА')) return '#1B5E20';
//     return '#37474F';
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%', overflowX: 'auto' }}>
//       <Box sx={{ mb: 3, textAlign: 'center' }}>
//         <Typography 
//           variant="h4" 
//           component="h2" 
//           gutterBottom 
//           sx={{ 
//             fontWeight: 600, 
//             fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
//           }}
//         >
//           📜 Зведена таблиця історичних угод
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Від Київської Русі до Незалежної України (860 – 2015 рр.)
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           Всього угод: {data.length ?? 0}
//         </Typography>
//       </Box>

//       <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
//         <Table stickyHeader size="small" sx={{ minWidth: { xs: 600, sm: 700, md: 800 }, tableLayout: 'fixed', width: '100%' }}>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ 
//                 fontWeight: 700, 
//                 width: { xs: '25%', sm: '25%', md: '25%' },
//                 minWidth: 180
//               }}>
//                 📜 Угода
//               </TableCell>
//               <TableCell sx={{ 
//                 fontWeight: 700, 
//                 width: { xs: '10%', sm: '10%', md: '10%' },
//                 minWidth: 80
//               }}>
//                 📅 Рік
//               </TableCell>
//               <TableCell sx={{ 
//                 fontWeight: 700, 
//                 width: { xs: '25%', sm: '25%', md: '25%' },
//                 minWidth: 160
//               }}>
//                 🤝 Сторони
//               </TableCell>
//               <TableCell sx={{ 
//                 fontWeight: 700, 
//                 width: { xs: '40%', sm: '40%', md: '40%' },
//                 minWidth: 200
//               }}>
//                 📝 Коротка характеристика
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item) => (
//               <TableRow 
//                 key={item.id}
//                 sx={{ 
//                   '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
//                   borderLeft: `4px solid ${getSectionColor(item.section)}`
//                 }}
//               >
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {item.treaty}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//                     {item.section.split(' ').slice(0, 6).join(' ')}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {item.year}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
//                     {item.parties}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
//                     {item.description}
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// export default TreatiesTable;


// Добавлено SEO для индексации
// components/UsefulMaterials/HistoryOfUkraine/TreatiesTable.tsx

import React from 'react';
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
  useTheme,
  alpha,
  CircularProgress,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

interface Treaty {
  id: number;
  section: string;
  treaty: string;
  year: string;
  parties: string;
  description: string;
}

interface TreatiesTableProps {
  data?: Treaty[];
}

export const TreatiesTable: React.FC<TreatiesTableProps> = ({ data }) => {
  const theme = useTheme();

  if (!data || !Array.isArray(data)) {
    return (
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Завантаження даних...</Typography>
      </Paper>
    );
  }

  if (data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h6">📭 Немає даних для відображення</Typography>
      </Paper>
    );
  }

  const getSectionColor = (section: string): string => {
    if (section.includes('КИЇВСЬКА')) return '#2E7D32';
    if (section.includes('ЛИТОВСЬКО-ПОЛЬСЬКА')) return '#6A1B9A';
    if (section.includes('КОЗАЦЬКА')) return '#E65100';
    if (section.includes('РОСІЙСЬКО-ТУРЕЦЬКІ')) return '#1565C0';
    if (section.includes('ПЕРША СВІТОВА')) return '#FF8F00';
    if (section.includes('ДРУГА СВІТОВА')) return '#C62828';
    if (section.includes('НЕЗАЛЕЖНА')) return '#1B5E20';
    return '#37474F';
  };

// ============================================================================
// СТРУКТУРОВАНІ ДАНІ ДЛЯ ІСТОРИЧНИХ УГОД (JSON-LD)
// ============================================================================

  const treatiesStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Зведена таблиця історичних угод України",
    "description": "Повний перелік міжнародних договорів, уній та конференцій від 860 до 2015 року. Для підготовки до НМТ з історії України.",
    "numberOfItems": data.length,
    "itemListElement": data.slice(0, 50).map((treaty, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": treaty.treaty,
      "description": `${treaty.year} | ${treaty.parties} | ${treaty.description.substring(0, 200)}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(treatiesStructuredData)}
        </script>
      </Helmet>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%', overflowX: 'auto' }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            📜 Зведена таблиця історичних угод
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Від Київської Русі до Незалежної України (860 – 2015 рр.)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Всього угод: {data.length ?? 0}
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader size="small" sx={{ minWidth: { xs: 600, sm: 700, md: 800 }, tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 700, 
                  width: { xs: '25%', sm: '25%', md: '25%' },
                  minWidth: 180
                }}>
                  📜 Угода
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700, 
                  width: { xs: '10%', sm: '10%', md: '10%' },
                  minWidth: 80
                }}>
                  📅 Рік
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700, 
                  width: { xs: '25%', sm: '25%', md: '25%' },
                  minWidth: 160
                }}>
                  🤝 Сторони
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 700, 
                  width: { xs: '40%', sm: '40%', md: '40%' },
                  minWidth: 200
                }}>
                  📝 Коротка характеристика
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow 
                  key={item.id}
                  sx={{ 
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                    borderLeft: `4px solid ${getSectionColor(item.section)}`
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.treaty}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {item.section.split(' ').slice(0, 6).join(' ')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.year}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      {item.parties}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      {item.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TreatiesTable;