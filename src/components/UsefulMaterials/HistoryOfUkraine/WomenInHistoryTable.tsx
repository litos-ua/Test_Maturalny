// components/UsefulMaterials/HistoryOfUkraine/WomenInHistoryTable.tsx

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
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface Woman {
  id: number;
  icons: string;           // Система графічних позначок (👑📚🏫 тощо)
  name: string;
  years: string;
  period: string;
  activity: string;
  category: string;        // Категорія для фільтрації
}

interface WomenInHistoryTableProps {
  data: Woman[];
}

// Кольори для категорій
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Монархиня': return '#9C27B0';
    case 'Культура та мистецтво': return '#E65100';
    case 'Освіта': return '#1565C0';
    case 'Визвольна боротьба': return '#C62828';
    case 'Радянський період': return '#B71C1C';
    case 'Негативний вплив': return '#424242';
    case 'Військова сфера': return '#2E7D32';
    case 'Сучасна політика': return '#1B5E20';
    default: return '#37474F';
  }
};

const getCategoryDisplay = (category: string): string => {
  const fullNames: Record<string, string> = {
    'Монархиня': '👑 Владні постаті',
    'Культура та мистецтво': '📚 Культура та мистецтво',
    'Освіта': '🏫 Освіта',
    'Визвольна боротьба': '🛡️ Визвольна боротьба',
    'Радянський період': '🔴 Радянський період',
    'Негативний вплив': '⚠️ Негативний вплив',
    'Військова сфера': '⚔️ Військова сфера',
    'Сучасна політика': '🏛️ Сучасна політика',
  };
  return fullNames[category] || category;
};

const WomenInHistoryTable: React.FC<WomenInHistoryTableProps> = ({ data }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

    

  // Унікальні категорії для фільтрації
  const categories = useMemo(() => {
    if (!data || !Array.isArray(data)) return []
    const cats = new Set(data.map(w => w.category));
    return Array.from(cats).sort();
  }, [data]);

  // Фільтрація
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return []
    let filtered = data;
    const searchLower = searchTerm.toLowerCase();
    
    if (searchTerm) {
      filtered = filtered.filter(woman => 
        woman.name.toLowerCase().includes(searchLower) ||
        woman.years.toLowerCase().includes(searchLower) ||
        woman.period.toLowerCase().includes(searchLower) ||
        woman.activity.toLowerCase().includes(searchLower)
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(woman => woman.category === categoryFilter);
    }
    
    return filtered;
  }, [data, searchTerm, categoryFilter]);

  // Пагінація
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

  // Легенда позначок
  const iconLegend = [
    { icon: '👑', label: 'Монархиня (княгиня, королева, імператриця)', color: '#9C27B0' },
    { icon: '📚', label: 'Діячка культури (письменниця, художниця, актриса, співачка)', color: '#E65100' },
    { icon: '🏫', label: 'Просвітителька (педагогиня, засновниця шкіл, меценатка)', color: '#1565C0' },
    { icon: '🛡️', label: 'Рух опору (ОУН, УПА, УВО, дисидентство)', color: '#C62828' },
    { icon: '🔴', label: 'У лавах Червоної армії / радянська діячка', color: '#B71C1C' },
    { icon: '⚠️', label: '«Червона фурія» (активна учасниця репресій)', color: '#424242' },
    { icon: '⚔️', label: 'Військова діячка (учасниця бойових дій)', color: '#2E7D32' },
    { icon: '🏛️', label: 'Політична діячка (незалежна Україна)', color: '#1B5E20' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      {/* Заголовок */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          👩 Жінки, які вплинули на історію України
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Від княжої доби до незалежної України
        </Typography>
      </Box>

      {/* Пошук та фільтри */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          sx={{ flexGrow: 1 }}
          variant="outlined"
          placeholder="🔍 Пошук за іменем, роками, періодом або діяльністю..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Фільтр за категорією */}
        <TextField
          select
          label="Категорія"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(0);
          }}
          SelectProps={{
            native: true,
          }}
          sx={{ minWidth: 200 }}
        >
          <option value="">Всі категорії</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{getCategoryDisplay(cat)}</option>
          ))}
        </TextField>
      </Box>

      {/* Легенда */}
      <Box sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: alpha(theme.palette.primary.main, 0.05), 
        borderRadius: 2,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, minWidth: 120 }}>
          🎨 Система позначок:
        </Typography>
        {iconLegend.map((item, idx) => (
          <Tooltip key={idx} title={item.label} arrow>
            <Chip
              icon={<span>{item.icon}</span>}
              label={item.icon}
              size="small"
              sx={{ 
                '& .MuiChip-icon': { margin: 0 },
                minWidth: 40,
                backgroundColor: alpha(item.color, 0.1),
                borderColor: item.color,
                fontWeight: 'bold'
              }}
              variant="outlined"
            />
          </Tooltip>
        ))}
      </Box>

      {/* Інформація про кількість записів */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          📊 Всього персоналій: {data.length} | Знайдено: {filteredData.length}
        </Typography>
        {(searchTerm || categoryFilter) && (
          <Chip 
            label={`Показано: ${filteredData.length} з ${data.length}`} 
            size="small" 
            color="primary" 
            variant="outlined"
            onDelete={() => {
              setSearchTerm('');
              setCategoryFilter('');
            }}
          />
        )}
      </Box>

      {/* Таблиця */}
      <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 700, width: 80, textAlign: 'center' }}>№</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 100, textAlign: 'center' }}>Позначки</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 180 }}>Ім'я</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Роки життя</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 150 }}>Період</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 350 }}>Діяльність / Результати</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((woman, idx) => (
              <TableRow
                key={woman.id}
                sx={{
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                  borderLeft: `4px solid ${getCategoryColor(woman.category)}`
                }}
              >
                <TableCell align="center">
                  <Typography variant="body2">{idx + 1 + page * rowsPerPage}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>
                    {woman.icons}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {woman.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={woman.years} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    {woman.period}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {woman.activity}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Пагінація */}
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
  );
};

export default WomenInHistoryTable;