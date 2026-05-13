// components/UsefulMaterials/HistoryOfUkraine/ArtsTable.tsx

import React, { useState } from 'react';
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
  Chip,
  alpha,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Search as SearchIcon } from '@mui/icons-material';
import { ZoomableImage } from '../../ZoomableImage';
import type { Artwork } from '../../../constants/UsefulMaterials/HistoryOfUkraine/Art/artTypes';

interface ArtsTableProps {
  data: {
    ancientArtData: Artwork[];
    kyivanRusArtData: Artwork[];
    renaissanceArtData: Artwork[];
    modernArtData: Artwork[];
    contemporaryArtData: Artwork[];
  };
}

// Компонент для відображення однієї таблиці творів мистецтва
const ArtSubTable: React.FC<{ data: Artwork[]; title: string }> = ({ data, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
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
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        placeholder="🔍 Пошук за назвою, автором, датою, стилем..."
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
        <Table size="small" stickyHeader sx={{ 
          tableLayout: 'fixed', 
          width: '100%',
          minWidth: { xs: 650, sm: 750, md: 850, lg: 950 }
        }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: 700, 
                width: { xs: 40, sm: 50, md: 60 },
                p: { xs: 1, sm: 1.5 }
              }}>
                №
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                width: { xs: 80, sm: 100, md: 120 },
                p: { xs: 1, sm: 1.5 }
              }}>
                🖼️ Зображення
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                width: { xs: '25%', sm: '20%', md: '18%' },
                minWidth: { xs: 120, sm: 150, md: 180 },
                p: { xs: 1, sm: 1.5 }
              }}>
                🎨 Назва та автор
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                width: { xs: 100, sm: 110, md: 120 },
                minWidth: { xs: 90, sm: 100, md: 110 },
                p: { xs: 1, sm: 1.5 }
              }}>
                📅 Дата
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 700, 
                width: { xs: '35%', sm: '40%', md: '45%' },
                minWidth: { xs: 200, sm: 250, md: 300 },
                p: { xs: 1, sm: 1.5 }
              }}>
                📝 Опис / Стиль
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, idx) => (
              <TableRow key={item.id} hover>
                <TableCell align="center" sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Typography variant="body2">
                    {(page * rowsPerPage) + idx + 1}
                  </Typography>
                </TableCell>
                
                {/* Колонка зображення */}
                <TableCell align="center" sx={{ p: { xs: 1, sm: 1.5 } }}>
                  {item.imageUrl ? (
                    <ZoomableImage 
                      src={item.imageUrl} 
                      alt={item.title} 
                      maxHeight={isMobile ? 60 : 80} 
                      maxWidth={isMobile ? 80 : 100}
                    />
                  ) : (
                    <Box 
                      sx={{ 
                        width: { xs: 60, sm: 70, md: 80 }, 
                        height: { xs: 60, sm: 70, md: 80 }, 
                        bgcolor: 'action.hover', 
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="h5">🎨</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Немає фото
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                
                {/* Назва та автор - звужена колонка */}
                <TableCell sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    {item.author}
                  </Typography>
                </TableCell>
                
                {/* Дата - розширена колонка */}
                <TableCell align="center" sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Chip 
                    label={item.date} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      height: { xs: 22, sm: 24 },
                      '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } }
                    }}
                  />
                </TableCell>
                
                {/* Опис / Стиль - розширена колонка */}
                <TableCell sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' } }}>
                    <Box 
                      component="span" 
                      sx={{ 
                        fontWeight: 500, 
                        color: theme.palette.primary.main,
                        display: 'inline-block',
                        mb: 0.5
                      }}
                    >
                      {item.style}
                    </Box>
                    <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
                      {` | ${item.description}`}
                    </Box>
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
const ArtsTable: React.FC<ArtsTableProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {
    ancientArtData,
    kyivanRusArtData,
    renaissanceArtData,
    modernArtData,
    contemporaryArtData
  } = data;
  const [expanded, setExpanded] = useState<string | false>('ancient');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const hasAncientData = ancientArtData && ancientArtData.length > 0;
  const hasKyivanRusData = kyivanRusArtData && kyivanRusArtData.length > 0;
  const hasRenaissanceData = renaissanceArtData && renaissanceArtData.length > 0;
  const hasModernData = modernArtData && modernArtData.length > 0;
  const hasContemporaryData = contemporaryArtData && contemporaryArtData.length > 0;

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 3 }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}
      >
        🎨 Твори образотворчого мистецтва України
      </Typography>
      <Typography 
        variant={isMobile ? "subtitle2" : "subtitle1"} 
        sx={{ textAlign: 'center', mb: 3 }}
      >
        Від найдавніших часів до сучасності
      </Typography>

      {/* РОЗДІЛ 1. Найдавніше мистецтво */}
      {hasAncientData && (
        <Accordion expanded={expanded === 'ancient'} onChange={handleChange('ancient')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>🏺 Найдавніше мистецтво (первісна доба, античність)</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 1, sm: 2 } }}>
            <ArtSubTable data={ancientArtData} title="Найдавніше мистецтво" />
          </AccordionDetails>
        </Accordion>
      )}

      {/* РОЗДІЛ 2. Київська Русь */}
      {hasKyivanRusData && (
        <Accordion expanded={expanded === 'kyivanRus'} onChange={handleChange('kyivanRus')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>⛪ Мистецтво Київської Русі та Галицько-Волинського князівства</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 1, sm: 2 } }}>
            <ArtSubTable data={kyivanRusArtData} title="Мистецтво Київської Русі" />
          </AccordionDetails>
        </Accordion>
      )}

      {/* РОЗДІЛ 3. XIV–XVII ст. */}
      {hasRenaissanceData && (
        <Accordion expanded={expanded === 'renaissance'} onChange={handleChange('renaissance')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>🎨 Мистецтво XIV–XVII ст. (Відродження, Козацька доба)</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 1, sm: 2 } }}>
            <ArtSubTable data={renaissanceArtData} title="Мистецтво XIV–XVII ст." />
          </AccordionDetails>
        </Accordion>
      )}

      {/* РОЗДІЛ 4. Новий час */}
      {hasModernData && (
        <Accordion expanded={expanded === 'modern'} onChange={handleChange('modern')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>🖼️ Мистецтво Нового часу (XVIII–XIX ст.)</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 1, sm: 2 } }}>
            <ArtSubTable data={modernArtData} title="Мистецтво Нового часу" />
          </AccordionDetails>
        </Accordion>
      )}

      {/* РОЗДІЛ 5. XX ст. */}
      {hasContemporaryData && (
        <Accordion expanded={expanded === 'contemporary'} onChange={handleChange('contemporary')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant={isMobile ? "subtitle1" : "h6"}>🎭 Українське мистецтво XX ст. (авангард, соцреалізм, шістдесятники)</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 1, sm: 2 } }}>
            <ArtSubTable data={contemporaryArtData} title="Українське мистецтво XX ст." />
          </AccordionDetails>
        </Accordion>
      )}
    </Paper>
  );
};

export default ArtsTable;