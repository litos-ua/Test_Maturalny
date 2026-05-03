// components/UsefulMaterials/HistoryOfUkraine/CartoonsTable.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ZoomableImage } from '../../ZoomableImage';
import { Pagination, Stack } from '@mui/material';

// Імпорт типів
import type { Cartoon } from '../../../constants/UsefulMaterials/HistoryOfUkraine/Cartoons';

// Змінений інтерфейс - приймає об'єкт data
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
      <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
        {title}
      </Typography>
      
      <input
        type="text"
        placeholder="🔍 Пошук..."
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
        style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <Paper elevation={1} sx={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: theme.palette.mode === 'dark' ? '#2d2d3a' : '#f5f5f5' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Карикатура</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Країна</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Дата</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Об'єкт висміювання</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Пояснення</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <ZoomableImage src={item.imageUrl} alt="cartoon" maxHeight={80} maxWidth={120} />
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.country}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.date}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.target}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
      {/* Пагинация */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
          Попередня
        </button>
        <span style={{ margin: '0 10px' }}>Сторінка {page + 1} з {Math.ceil(filteredData.length / rowsPerPage)}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={(page + 1) * rowsPerPage >= filteredData.length}>
          Наступна
        </button>
      </Box> */}
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page + 1}
          onChange={(_event, value) => setPage(value - 1)}
          color="primary"
          size="small"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
        

    </Box>
  );
};

// Основний компонент - приймає data, а не окремі пропси
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

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
        🎭 Сатиричні карикатури
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
        Політична сатира в історії України (XVIII–XX ст.)
      </Typography>

      {/* 1. Дорадянські часи */}
      <Accordion expanded={expanded === 'preSoviet'} onChange={handleChange('preSoviet')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">📜 Дорадянський період (XVIII – початок XX ст.)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CartoonsSubTable data={preSovietData} title="Карикатури дорадянського часу" />
        </AccordionDetails>
      </Accordion>

      {/* 2. Міжвоєнний період */}
      <Accordion expanded={expanded === 'sovietEarly'} onChange={handleChange('sovietEarly')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">🔴 Радянські карикатури (1919–1939)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CartoonsSubTable data={sovietEarlyData} title="Радянські карикатури перших десятиліть" />
        </AccordionDetails>
      </Accordion>

      {/* 3. Друга світова війна */}
      <Accordion expanded={expanded === 'ww2'} onChange={handleChange('ww2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">⚔️ Карикатури часів Другої світової війни (1939–1945)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CartoonsSubTable data={ww2Data} title="Радянські та німецькі пропагандистські карикатури" />
        </AccordionDetails>
      </Accordion>

      {/* 4. Післявоєнний час та «відлига» */}
      <Accordion expanded={expanded === 'postWar'} onChange={handleChange('postWar')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🔵 Радянські карикатури післявоєнного часу та «відлиги» (1946–1964)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={postWarData} title="Карикатури післявоєнного часу та відлиги" />
          </AccordionDetails>
        </Accordion>

        {/* 5. Бюрократия. Номенклатура. */}
        <Accordion expanded={expanded === 'bureaucracy'} onChange={handleChange('bureaucracy')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">📋 Радянські карикатури: Бюрократизм та номенклатура </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={bureaucracyData} title="Карикатури післявоєнного часу та відлиги" />
          </AccordionDetails>
        </Accordion>

        {/* 6. Дефіцит */}
        <Accordion expanded={expanded === 'deficit'} onChange={handleChange('deficit')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">📦 Радянські карикатури часу «застою». Дефіцит (1965–1990)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={deficitData} title="Карикатури про дефіцит та «блат»" />
          </AccordionDetails>
        </Accordion>

        {/* 7. Сервіс */}
        <Accordion expanded={expanded === 'service'} onChange={handleChange('service')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🔧 Радянські карикатури часу «застою». Сервіс (1965–1990)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={serviceData} title="Карикатури про низьку якість сервісу" />
          </AccordionDetails>
        </Accordion>

        {/* 8. «Несуни» */}
        <Accordion expanded={expanded === 'nesuny'} onChange={handleChange('nesuny')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🥩 Радянські карикатури часу «застою». «Несуни» (1965–1990)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={nesunyData} title="Карикатури про дрібні крадіжки на роботі" />
          </AccordionDetails>
        </Accordion>

        {/* 9. Безгосподарність */}
        <Accordion expanded={expanded === 'bezhoz'} onChange={handleChange('bezhoz')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🏢 Радянські карикатури часу «застою». Безгосподарність (1965–1990)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={bezhozData} title="Карикатури про неефективність НДІ" />
          </AccordionDetails>
        </Accordion>

        {/* 10. Неліквідна продукція */}
        <Accordion expanded={expanded === 'nenuzhnaja'} onChange={handleChange('nenuzhnaja')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">👢 Радянські карикатури часу «застою». Неліквідна продукція (1965–1990)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={nenuzhnajaProdData} title="Карикатури про неякісні товари" />
          </AccordionDetails>
        </Accordion>

        {/* 11. Перебудова */}
        <Accordion expanded={expanded === 'perebudova'} onChange={handleChange('perebudova')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">📢 Радянські карикатури часу «перебудови» (1985–1991)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={perebudovaData} title="Карикатури про перебудову та чиновників" />
          </AccordionDetails>
        </Accordion>

        {/* 12. Незалежна Україна */}
        <Accordion expanded={expanded === 'ukraine'} onChange={handleChange('ukraine')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <Box component="span" sx={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#0057B8' }}>🇺</Box>
              <Box component="span" sx={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#FFD700' }}>🇦</Box>
              {' Карикатури часів незалежної України (1990-ті)'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CartoonsSubTable data={ukraineData} title="Карикатури про економічну кризу в Україні" />
          </AccordionDetails>
        </Accordion>

    </Paper>
  );
};

export default CartoonsTable;