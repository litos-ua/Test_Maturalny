// components/UsefulMaterials/HistoryOfUkraine/HetmansOfRuinTime.tsx

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
import { Search as SearchIcon, Info as InfoIcon } from '@mui/icons-material';

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



  // Фільтрація
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return []
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

  // Кольори для територій та орієнтації
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

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3, width: '100%' }}>
      {/* Заголовок */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          🎖️ Гетьмани України періоду Руїни (1657–1687)
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Гетьмани Правобережжя, Лівобережжя та їхні протекторати
        </Typography>
      </Box>

      {/* Пошук */}
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

      {/* Інформація про кількість записів */}
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

      {/* Таблиця */}
      <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 700, minWidth: 180 }}>🎖️ Гетьман</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>⏳ Роки правління</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 140 }}>🌍 Територія</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 160 }}>🎌 Орієнтація / Протекторат</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 250 }}>📜 Ключові угоди</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 350 }}>📝 Коротка характеристика</TableCell>
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
                {/* Гетьман */}
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {hetman.name}
                  </Typography>
                </TableCell>
                
                {/* Роки правління */}
                <TableCell>
                  <Chip label={hetman.rulingYears} size="small" variant="outlined" color="secondary" />
                </TableCell>
                
                {/* Територія */}
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
                
                {/* Орієнтація / Протекторат */}
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
                
                {/* Ключові угоди */}
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
                
                {/* Коротка характеристика */}
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

export default HetmansOfRuinTime;