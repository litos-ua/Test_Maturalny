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
} from '@mui/material';
import { Search as SearchIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  //   // Перевірка на наявність даних
  // if (!data || !Array.isArray(data)) {
  //   return (
  //     <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
  //       <CircularProgress />
  //       <Typography sx={{ mt: 2 }}>Завантаження даних...</Typography>
  //     </Paper>
  //   );
  // }

  // if (data.length === 0) {
  //   return (
  //     <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
  //       <Typography variant="h6">📭 Немає даних для відображення</Typography>
  //     </Paper>
  //   );
  // }

  // Группировка по разделам
  const groupedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return []
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

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      {/* Заголовок */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          📐 Основні математичні формули
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Для підготовки до НМТ з математики
        </Typography>
      </Box>

      {/* Пошук */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Пошук формул за назвою, формулою або описом..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Інформація */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          📊 Всього формул: {totalFormulas} | Знайдено: {visibleFormulas}
        </Typography>
      </Box>

      {/* Секции с формулами */}
      {Object.entries(filteredGroups).map(([section, formulas]) => (
        <Paper
          key={section}
          sx={{
            mb: 2,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            overflow: 'hidden',
          }}
        >
          {/* Заголовок секции (кликабельный) */}
          <Box
            onClick={() => toggleSection(section)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {section}
            </Typography>
            <IconButton size="small">
              {expandedSections.has(section) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>

          {/* Формулы в секции */}
          <Collapse in={expandedSections.has(section) || !!searchTerm}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {formulas.map((formula) => (
                    <TableRow
                      key={formula.id}
                      sx={{
                        '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
                      }}
                    >
                      <TableCell sx={{ width: '30%', verticalAlign: 'top' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                          {formula.title}
                        </Typography>
                        {formula.description && (
                          <Typography variant="caption" color="text.secondary">
                            {formula.description}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'top' }}>
                        <Box sx={{ fontFamily: 'monospace', fontSize: '1rem' }}>
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
    </Paper>
  );
};

export default FormulasTable;