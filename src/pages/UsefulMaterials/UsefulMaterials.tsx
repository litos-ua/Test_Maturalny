// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { TreatiesTable } from '../../components/UsefulMaterials/HistoryOfUkraine/TreatiesTable';
// import { treatiesData } from '../../constants/UsefulMaterials/HistoryOfUkraine/treatiesTable';
// import { disciplineMaterialsConfig, hasMaterials } from '../../constants';
// import { fetchDisciplines } from '../../api';

// // Компонент для отображения таблицы договоров
// const TreatiesTableWrapper = () => <TreatiesTable data={treatiesData} />;

// // Связываем ID материалов с компонентами
// const materialComponents: Record<string, React.ReactNode> = {
//   "treaties-table": <TreatiesTableWrapper />,
// };

// export const UsefulMaterials: React.FC = () => {
//   const { disciplineId } = useParams<{ disciplineId: string }>();
//   const [disciplineName, setDisciplineName] = useState<string>("");
//   const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);

//   const id = disciplineId ? parseInt(disciplineId) : null;
//   const materials = id ? disciplineMaterialsConfig[id] || [] : [];

//   // Загрузка списка дисциплин для получения названия
//   useEffect(() => {
//     fetchDisciplines()
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setDisciplines(data);
//           if (id) {
//             const found = data.find(d => d.id === id);
//             setDisciplineName(found?.name || "Невідома дисципліна");
//           }
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpandedMaterial(isExpanded ? materialId : false);
//   };

//   // Если нет disciplineId в URL — показываем сообщение
//   if (!id) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           📚 Корисні матеріали для підготовки
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Оберіть дисципліну з меню "Корисні матеріали" в заголовку
//         </Typography>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   // Дисциплина не найдена в списке
//   const disciplineExists = disciplines.some(d => d.id === id);
//   if (!disciplineExists) {
//     return (
//       <Container sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h5" color="error" gutterBottom>
//           Дисципліну не знайдено
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Будь ласка, оберіть дисципліну з меню "Корисні матеріали"
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         📚 Корисні матеріали для підготовки
//       </Typography>
      
//       <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
//         {disciplineName}
//       </Typography>

//       {materials.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             На даний момент матеріали для цієї дисципліни відсутні.
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             Слідкуйте за оновленнями!
//           </Typography>
//         </Box>
//       ) : (
//         <List>
//           {materials.map((material) => (
//             <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
//               <Accordion
//                 expanded={expandedMaterial === material.id}
//                 onChange={handleAccordionChange(material.id)}
//                 sx={{
//                   boxShadow: 1,
//                   '&:before': { display: 'none' },
//                   borderRadius: 2,
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   sx={{
//                     backgroundColor: 'action.hover',
//                     borderRadius: 2,
//                     '&:hover': {
//                       backgroundColor: 'action.selected',
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                       {material.title}
//                     </Typography>
//                     {material.description && (
//                       <Typography variant="caption" color="text.secondary">
//                         {material.description}
//                       </Typography>
//                     )}
//                   </Box>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
//                   {materialComponents[material.id] || (
//                     <Typography color="text.secondary">
//                       Матеріал знаходиться в розробці
//                     </Typography>
//                   )}
//                 </AccordionDetails>
//               </Accordion>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Container>
//   );
// };

// export default UsefulMaterials;

// import React, { useState, useEffect, Suspense } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
// import { fetchDisciplines } from '../../api';

// export const UsefulMaterials: React.FC = () => {
//   // ✅ Правильно: параметр называется disciplineId
//   const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  
//   const id = disciplineId ? parseInt(disciplineId) : null;
//   const [disciplineName, setDisciplineName] = useState<string>("");
//   const [disciplines, setDisciplines] = useState<{ id: number; name: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);

//   const materials = id ? disciplineMaterialsConfig[id] || [] : [];

//   // Загрузка списка дисциплин
//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }
    
//     fetchDisciplines()
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setDisciplines(data);
//           const found = data.find(d => d.id === id);
//           setDisciplineName(found?.name || "Невідома дисципліна");
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpandedMaterial(isExpanded ? materialId : false);
//   };

//   // Если нет disciplineId в URL
//   if (!id) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           📚 Корисні матеріали для підготовки
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Оберіть дисципліну з меню "Корисні матеріали" в заголовку
//         </Typography>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         📚 Корисні матеріали для підготовки
//       </Typography>
      
//       <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
//         {disciplineName}
//       </Typography>

//       {materials.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             На даний момент матеріали для цієї дисципліни відсутні.
//           </Typography>
//         </Box>
//       ) : (
//         <List>
//           {materials.map((material) => (
//             <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
//               <Accordion
//                 expanded={expandedMaterial === material.id}
//                 onChange={handleAccordionChange(material.id)}
//                 sx={{ boxShadow: 1, '&:before': { display: 'none' }, borderRadius: 2 }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'action.hover', borderRadius: 2 }}>
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                       {material.title}
//                     </Typography>
//                     {material.description && (
//                       <Typography variant="caption" color="text.secondary">
//                         {material.description}
//                       </Typography>
//                     )}
//                   </Box>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
//                   <Suspense fallback={<CircularProgress size={24} />}>
//                     <material.component data={null} />
//                   </Suspense>
//                 </AccordionDetails>
//               </Accordion>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Container>
//   );
// };

// export default UsefulMaterials;


import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { disciplineMaterialsConfig } from '../../constants/UsefulMaterials/disciplineMaterials';
import { fetchDisciplines } from '../../api';

export const UsefulMaterials: React.FC = () => {
  const { slug, disciplineId } = useParams<{ slug: string; disciplineId: string }>();
  
  const id = disciplineId ? parseInt(disciplineId) : null;
  const [disciplineName, setDisciplineName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [expandedMaterial, setExpandedMaterial] = useState<string | false>(false);
  const [materialsData, setMaterialsData] = useState<Record<string, any>>({});  // ← для хранения данных

  const materials = id ? disciplineMaterialsConfig[id] || [] : [];

  // Загрузка списка дисциплин
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    fetchDisciplines()
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find(d => d.id === id);
          setDisciplineName(found?.name || "Невідома дисципліна");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 🔥 Загрузка данных для материалов
  useEffect(() => {
    const loadMaterialsData = async () => {
      if (!id || materials.length === 0) return;

      const newData: Record<string, any> = {};

      for (const material of materials) {
        if (material.getData) {
          try {
            const data = await material.getData();
            newData[material.id] = data;
            console.log(`✅ Loaded data for ${material.id}:`, data?.length || 'no length');
          } catch (error) {
            console.error(`Failed to load data for ${material.id}:`, error);
          }
        }
      }

      setMaterialsData(newData);
    };

    loadMaterialsData();
  }, [id, materials]);

  const handleAccordionChange = (materialId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedMaterial(isExpanded ? materialId : false);
  };

  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          📚 Корисні матеріали для підготовки
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Оберіть дисципліну з меню "Корисні матеріали" в заголовку
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📚 Корисні матеріали для підготовки
      </Typography>
      
      <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
        {disciplineName}
      </Typography>

      {materials.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            На даний момент матеріали для цієї дисципліни відсутні.
          </Typography>
        </Box>
      ) : (
        <List>
          {materials.map((material) => (
            <ListItem key={material.id} disablePadding sx={{ display: 'block', mb: 2 }}>
              <Accordion
                expanded={expandedMaterial === material.id}
                onChange={handleAccordionChange(material.id)}
                sx={{ boxShadow: 1, '&:before': { display: 'none' }, borderRadius: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'action.hover', borderRadius: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {material.title}
                    </Typography>
                    {material.description && (
                      <Typography variant="caption" color="text.secondary">
                        {material.description}
                      </Typography>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2, overflowX: 'auto' }}>
                  <Suspense fallback={<CircularProgress size={24} />}>
                    {/* 🔥 Передаём данные в компонент */}
                    <material.component data={materialsData[material.id]} />
                  </Suspense>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UsefulMaterials;