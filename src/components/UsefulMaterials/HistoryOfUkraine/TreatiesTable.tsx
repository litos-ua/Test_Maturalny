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
//   alpha
// } from '@mui/material';

// // Тип даних для однієї угоди
// interface Treaty {
//   id: number;
//   section: string;
//   treaty: string;
//   year: string;
//   parties: string;
//   description: string;
// }

// // Тип пропсів компонента
// interface TreatiesTableProps {
//   data: Treaty[];
// }

// export const TreatiesTable: React.FC<TreatiesTableProps> = ({ data }) => {
//   const theme = useTheme();

//   // Кольори для різних розділів
//   const getSectionColor = (section: string): string => {
//     if (section.includes('КИЇВСЬКА')) return '#2E7D32';           // зелений
//     if (section.includes('ЛИТОВСЬКО-ПОЛЬСЬКА')) return '#6A1B9A'; // фіолетовий
//     if (section.includes('КОЗАЦЬКА')) return '#E65100';           // оранжевий
//     if (section.includes('РОСІЙСЬКО-ТУРЕЦЬКІ')) return '#1565C0'; // синій
//     if (section.includes('ПЕРША СВІТОВА')) return '#FF8F00';      // золотистий
//     if (section.includes('ДРУГА СВІТОВА')) return '#C62828';      // червоний
//     if (section.includes('НЕЗАЛЕЖНА')) return '#1B5E20';           // темно-зелений
//     return '#37474F'; // сірий за замовчуванням
//   };

//   return (
//     <Paper 
//       elevation={3} 
//       sx={{ 
//         p: 2, 
//         borderRadius: 3,
//         backgroundColor: theme.palette.mode === 'dark' ? '#1e1e2f' : '#ffffff'
//       }}
//     >
//       {/* ЗАГОЛОВОК */}
//       <Box sx={{ mb: 3, textAlign: 'center' }}>
//         <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
//           📜 Зведена таблиця історичних угод
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Від Київської Русі до Незалежної України (860 – 2015 рр.)
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           Всього угод: {data.length}
//         </Typography>
//       </Box>

//       {/* ТАБЛИЦЯ ЗІ СКРОЛІНГОМ */}
//       <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
//               <TableCell sx={{ fontWeight: 700, backgroundColor: 'inherit', minWidth: 250 }}>
//                 📜 Угода
//               </TableCell>
//               <TableCell sx={{ fontWeight: 700, backgroundColor: 'inherit', width: 100 }}>
//                 📅 Рік
//               </TableCell>
//               <TableCell sx={{ fontWeight: 700, backgroundColor: 'inherit', minWidth: 200 }}>
//                 🤝 Сторони
//               </TableCell>
//               <TableCell sx={{ fontWeight: 700, backgroundColor: 'inherit', minWidth: 350 }}>
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
//                     {/* {item.section.split(' ')[0]} {item.section.split(' ')[1]} */}
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

//       {/* ЛЕГЕНДА КОЛЬОРІВ */}
//       <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
//         <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//           <span>🎨 Легенда:</span>
//           <span>🟢 Київська Русь</span>
//           <span>🟣 Литовсько-польська доба</span>
//           <span>🟠 Козацька доба</span>
//           <span>🔵 Російсько-турецькі війни</span>
//           <span>🟡 Перша світова</span>
//           <span>🔴 Друга світова</span>
//           <span>✅ Незалежна Україна</span>
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// export default TreatiesTable;


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
  alpha
} from '@mui/material';

interface Treaty {
  id: number;
  section: string;
  treaty: string;
  year: string;
  parties: string;
  description: string;
}

interface TreatiesTableProps {
  data?: Treaty[];  // Данные передаются через пропс
}

export const TreatiesTable: React.FC<TreatiesTableProps> = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return <Typography>Нет данных для отображения</Typography>;
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

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          📜 Зведена таблиця історичних угод
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Від Київської Русі до Незалежної України (860 – 2015 рр.)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Всього угод: {data.length}
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, minWidth: 250 }}>📜 Угода</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 100 }}>📅 Рік</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 200 }}>🤝 Сторони</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 350 }}>📝 Коротка характеристика</TableCell>
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
                  <Typography variant="caption" color="text.secondary">
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
  );
};

export default TreatiesTable;