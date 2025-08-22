
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getDisciplineById } from "../../api/disciplineClient";
// import {Box, Button} from "@mui/material";

// interface Discipline {
//   id: number;
//   name: string;
//   createdAt?: string;
//   updatedAt?: string | null;
// }
// const bannerMap: Record<number, { src: string; alt: string }> = {
//   1: { src: "/banners/history.jpg", alt: "Історія України" },
//   2: { src: "/banners/math.jpg", alt: "Математика" },
//   3: { src: "/banners/informatics.jpg", alt: "Інформатика" },
//   4: { src: "/banners/physics.jpg", alt: "Фізика" },
//   5: { src: "/banners/english.jpg", alt: "Англійська мова" },
//   6: { src: "/banners/ukrainian.jpg", alt: "Українська мова" },
//   7: { src: "/banners/polish.jpg", alt: "Польська мова" },
// };

// const disciplinesGenitive: Record<string, string> = {
//   "Історія України": "Історії України",
//   "Математика": "Математики",
//   "Інформатика": "Інформатики",
//   "Фізика": "Фізики",
//   "Англійська мова": "Англійської мови",
//   "Українська мова": "Української мови",
//   "Польська мова": "Польської мови",
// };

// export function TestPage() {
//   const { id } = useParams();
//   const [discipline, setDiscipline] = useState<Discipline | null>(null);

//   useEffect(() => {
//     if (id) {
//       getDisciplineById(Number(id)).then(setDiscipline);
//     }
//   }, [id]);

//   if (!discipline) return <p>Загрузка...</p>;

//   const banner = bannerMap[discipline.id];
//   const nameGenitive = disciplinesGenitive[discipline.name] || discipline.name
//   return (
//   <div style={{ padding: "2rem", textAlign: "center" }}>
//     <h1>Пробний онлайн-тест НМТ / ЗНО з {nameGenitive}</h1>
//     <p>Пройдіть тест і підготуйтеся до іспиту з {nameGenitive}.</p>

//     {banner && (
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           maxWidth: "180vh",
//           aspectRatio: "16/9",
//           margin: "2rem auto",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: 3,
//         }}
//       >
//         {/* Картинка */}
//         <Box
//           component="img"
//           src={banner.src}
//           alt={banner.alt}
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             objectPosition: "center",
//           }}
//         />

//         {/* Кнопка в верхнем левом углу */}
//         <Button
//           variant="contained"
//           color="secondary"
//           size="large"
//           sx={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             textTransform: "none",
//             fontSize: "1.1rem",
//             px: 4,
//             py: 1.5,
//             borderRadius: 2,
//           }}
//         >
//           Пройти тест
//         </Button>
//       </Box>
//     )}
//   </div>
// );
// }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getDisciplineById } from "../../api/disciplineClient";
// import { Box, Button, Typography} from "@mui/material";
// import { bannerMap, disciplinesGenitive } from "../../constants";
// import { TypographyAnimator} from "../../components/TypographyAnimator"

// interface Discipline {
//   id: number;
//   name: string;
//   createdAt?: string;
//   updatedAt?: string | null;
// }

// export function TestPage() {
//   const { id } = useParams();
//   const [discipline, setDiscipline] = useState<Discipline | null>(null);

//   useEffect(() => {
//     if (id) {
//       getDisciplineById(Number(id)).then(setDiscipline);
//     }
//   }, [id]);

//   if (!discipline) return <p>Загрузка...</p>;

//   const banner = bannerMap[discipline.id];
//   const nameGenitive = disciplinesGenitive[discipline.name] || discipline.name
//   return (
//   <Box
//         sx={{
//         p: 4, // padding: 4 * 8px = 32px ≈ 2rem
//         textAlign: "center",
//     }}
//     >
//     <Typography variant="h3" fontWeight="bold" gutterBottom  color= "text.secondary">
//         Пробний онлайн-тест НМТ / ЗНО з {nameGenitive}
//     </Typography>

//     {/* <Typography
//         variant="body1"
//         sx={{
//             fontSize: "1.25rem", // половина размера h4 (примерно)
//             mt: 2,
//             animation: "slideIn 1s ease forwards",
//             color: theme => theme.palette.secondary.main,
//         }}
//     >
//     Пройдіть тест і підготуйтеся до іспиту з {nameGenitive}.
//     </Typography> */}

//     <TypographyAnimator
//             texts={[
//                 `Пробний онлайн-тест НМТ / ЗНО з ${nameGenitive}`,
//                 `Перевір вже зараз свій рівень підготовки`
//             ]}
//             colors={[
//                 "#FFA07A", // светло-оранжевый
//                 "#ADD8E6", // светло-синий
//                 "#9c27b0", // фиолетовый
//                 "#F4A460", // светло-коричневый
//                 "#808000", // оливковый
//                 "#FFD700"  // темно-желтый (золотой)
//             ]}
//             interval={8000}
//             variant="h5"
//             fontWeight={700}
//     />


//     {banner && (
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           maxWidth: "180vh",
//           aspectRatio: "16/9",
//           margin: "2rem auto",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: 3,
//         }}
//       >
//         {/* Картинка */}
//         <Box
//           component="img"
//           src={banner.src}
//           alt={banner.alt}
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             objectPosition: "center",
//           }}
//         />

//         {/* Кнопка в верхнем левом углу */}
//         <Button
//           variant="contained"
//           color="secondary"
//           size="large"
//           sx={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             textTransform: "none",
//             fontSize: "1.1rem",
//             px: 4,
//             py: 1.5,
//             borderRadius: 2,
//           }}
//         >
//           Пройти тест
//         </Button>
//       </Box>
//     )}
//   </Box>
// );
// }




// import { useParams } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import { getDisciplineById } from "../../api/disciplineClient";
// import { Box, Button, Typography, List, ListItem, ListItemText, Tooltip } from "@mui/material";
// import { bannerMap, disciplinesGenitive } from "../../constants";
// import { TypographyDualAnimator} from "../../components/TypographyDualAnimator"
// import { getTopicsByDisciplineId } from "../../api/topicClient";
// import { useNavigate } from "react-router-dom";
// import { testButtonStyle, testDisciplineImagetyle } from "./testPageStyles";


// interface Discipline {
//   id: number;
//   name: string;
//   createdAt?: string;
//   updatedAt?: string | null;
// }

// export function TestPage() {
//   const { id } = useParams();
//   const [discipline, setDiscipline] = useState<Discipline | null>(null);
//   const [topics, setTopics] = useState<any[]>([]);
//   const [showTopics, setShowTopics] = useState(false);
//   const topicsRef = useRef<HTMLUListElement | null>(null);
//   const navigate = useNavigate();

//   const handleShowTopics = async () => {
//     if (!showTopics && discipline) {
//       console.log(`NumberOfDiscipline: ${discipline.id}`)
//       const data = await getTopicsByDisciplineId(discipline.id);
//       setTopics(data);
//     }
//     setShowTopics(!showTopics);
//   };

//   //автоматическая прокручиваем страницу к списку тем при ее появлении
//   useEffect(() => {
//   if (showTopics && topicsRef.current) {
//       topicsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [showTopics]);

//   useEffect(() => {
//     if (id) {
//       getDisciplineById(Number(id)).then(setDiscipline);
//     }
//   }, [id]);

//   if (!discipline) return <p>Загрузка...</p>;

//   const banner = bannerMap[discipline.id];
//   const nameGenitive = disciplinesGenitive[discipline.name] || discipline.name
//   return (
//   <Box
//         sx={{
//         p: 4, // padding: 4 * 8px = 32px ≈ 2rem
//         textAlign: "center",
//     }}
//     >
//     <Typography variant="h3" fontWeight="bold" gutterBottom  color= "text.secondary">
//         Пробний онлайн-тест НМТ / ЗНО з {nameGenitive}
//     </Typography>

//     <TypographyDualAnimator
//       texts={[
//         ["Пробний онлайн-тест НМТ / ЗНО з", "Історії України"],
//         ["Перевір вже зараз", "свій рівень підготовки"],
//       ]}
//       colorPairs={[
//         ["#FFA07A", "#ADD8E6"], // светло-оранжевый + светло-синий
//         ["#9c27b0", "#F4A460"], // фиолетовый + светло-коричневый
//         ["#808000", "#FFD700"], // оливковый + темно-желтый
//       ]}
//       interval={8000}
//       variant="h5"
//       fontWeight={700}
//     />


//     {banner && (
//       <Box
//         sx={{
//           ...testDisciplineImagetyle
//         }}
//       >
//         {/* Картинка */}
//         <Box
//           component="img"
//           src={banner.src}
//           alt={banner.alt}
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             objectPosition: "center",
//           }}
//         />

//         {/* Кнопка в верхнем левом углу */}
//         <Button
//           variant="contained"
//           color="secondary"
//           size="large"
//           sx={{
//             left: 16,
//             ...testButtonStyle,
//           }}
//           //onClick={() => navigate(`/test/session/${discipline.id}`)}
//           //onClick={() => navigate(`/test/session/${discipline.id}/${discipline.name}`)}
//           onClick={() => navigate(`/test/session/${encodeURIComponent(discipline.id)}/${encodeURIComponent(discipline.name)}`)}
//         >
//           Пройти тест
//         </Button>

//         {/* Кнопка в верхнем правом углу */}
//         <Button
//           variant="contained"
//           color="secondary"
//           size="large"
//           onClick={handleShowTopics}
//           sx={{
//             right: 16,
//             ...testButtonStyle,
//           }}
//         >
//           Перелік тем
//         </Button>
//       </Box>
//     )}
//     {/* список тем */}
//       {showTopics && topics.length > 0 && (
//   <List ref={topicsRef} sx={{ mt: 4 }}>
//     {topics.map((topic, index) => (
//       <Tooltip
//         key={topic.id}
//         title={
//           <span
//             style={{
//               maxWidth: "clamp(15rem, 30vw, 25rem)", //  ширина описания 
//               display: "block",
//               whiteSpace: "normal",
//               fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", //  шрифт описания
//             }}
//           >
//             {topic.description}
//           </span>
//         }
//         arrow
//         placement="top-end"
//         enterDelay={200}
//         leaveDelay={100}
//         PopperProps={{
//           modifiers: [
//             {
//               name: "offset",
//               options: {
//                 offset: [20, -10], // ⬅ 20px вправо, -10px вверх (смещает ближе к правому краю и чуть выше)
//               },
//             },
//           ],
//         }}
//         componentsProps={{
//           tooltip: {
//             sx: {
//               backgroundColor: "background.paper",
//               color: "text.primary",
//               boxShadow: 3,
//               p: { xs: 1, md: 2 }, //  padding адаптивный
//               borderRadius: "0.5rem",
//             },
//           },
//         }}
//       >
//         <ListItem
//           sx={{
//             transition: "color 0.3s",
//             "&:hover": {
//               color: "secondary.main",
//               cursor: "pointer",
//             },
//           }}
//         >
//           <ListItemText
//             primaryTypographyProps={{
//               fontSize: "clamp(1rem, 1.3vw, 1.5rem)", // адаптивный размер текста темы
//               fontWeight: 500,
//             }}
//             primary={`${index + 1}. ${topic.title}`} // нумерация тем
//           />
//         </ListItem>
//       </Tooltip>
//           ))}
//         </List>
//       )}
//   </Box>
// );
// }


// // Расширяем существующие стили

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Tooltip,
// } from "@mui/material";
// import { getDisciplineById } from "../../api/disciplineClient";
// import { getTopicsByDisciplineId } from "../../api/topicClient";
// import { bannerMap, disciplinesGenitive } from "../../constants";
// import { TypographyDualAnimator } from "../../components/TypographyDualAnimator";
// import * as styles from "./testPageStyles"; // ✅ импортируем все стили

// interface Discipline {
//   id: number;
//   name: string;
//   createdAt?: string;
//   updatedAt?: string | null;
// }

// export function TestPage() {
//   const { id } = useParams();
//   const [discipline, setDiscipline] = useState<Discipline | null>(null);
//   const [topics, setTopics] = useState<any[]>([]);
//   const [showTopics, setShowTopics] = useState(false);
//   const topicsRef = useRef<HTMLUListElement | null>(null);
//   const navigate = useNavigate();

//   const handleShowTopics = async () => {
//     if (!showTopics && discipline) {
//       console.log(`NumberOfDiscipline: ${discipline.id}`);
//       const data = await getTopicsByDisciplineId(discipline.id);
//       setTopics(data);
//     }
//     setShowTopics(!showTopics);
//   };

//   // автоматическая прокрутка к списку тем при появлении
//   useEffect(() => {
//     if (showTopics && topicsRef.current) {
//       topicsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [showTopics]);

//   useEffect(() => {
//     if (id) {
//       getDisciplineById(Number(id)).then(setDiscipline);
//     }
//   }, [id]);

//   if (!discipline) return <p>Загрузка...</p>;

//   const banner = bannerMap[discipline.id];
//   const nameGenitive = disciplinesGenitive[discipline.name] || discipline.name;

//   return (
//     <Box sx={styles.pageWrapper}>
//       <Typography variant="h3" sx={styles.title}>
//         Пробний онлайн-тест НМТ / ЗНО з {nameGenitive}
//       </Typography>

//       <TypographyDualAnimator
//         texts={[
//           ["Пробний онлайн-тест НМТ / ЗНО з", "Історії України"],
//           ["Перевір вже зараз", "свій рівень підготовки"],
//         ]}
//         colorPairs={[
//           ["#FFA07A", "#ADD8E6"], // светло-оранжевый + светло-синий
//           ["#9c27b0", "#F4A460"], // фиолетовый + светло-коричневый
//           ["#808000", "#FFD700"], // оливковый + темно-желтый
//         ]}
//         interval={8000}
//         variant="h5"
//         fontWeight={700}
//       />

//       {banner && (
//         <Box sx={styles.testDisciplineImagetyle}>
//           {/* Картинка */}
//           <Box
//             component="img"
//             src={banner.src}
//             alt={banner.alt}
//             sx={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               objectPosition: "center",
//             }}
//           />

//           {/* Кнопка "Пройти тест" */}
//           <Button
//             variant="contained"
//             color="secondary"
//             size="large"
//             sx={{ ...styles.testButtonStyle, left: 16 }}
//             onClick={() =>
//               navigate(
//                 `/test/session/${encodeURIComponent(
//                   discipline.id
//                 )}/${encodeURIComponent(discipline.name)}`
//               )
//             }
//           >
//             Пройти тест
//           </Button>

//           {/* Кнопка "Перелік тем" */}
//           <Button
//             variant="contained"
//             color="secondary"
//             size="large"
//             onClick={handleShowTopics}
//             sx={{ ...styles.testButtonStyle, right: 16 }}
//           >
//             Перелік тем
//           </Button>
//         </Box>
//       )}

//       {/* Список тем */}
//       {showTopics && topics.length > 0 && (
//         <List ref={topicsRef} sx={styles.topicsList}>
//           {topics.map((topic, index) => (
//             <Tooltip
//               key={topic.id}
//               title={
//                 <span
//                   style={{
//                     maxWidth: "clamp(15rem, 30vw, 25rem)",
//                     display: "block",
//                     whiteSpace: "normal",
//                     fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
//                   }}
//                 >
//                   {topic.description}
//                 </span>
//               }
//               arrow
//               placement="top-end"
//               enterDelay={200}
//               leaveDelay={100}
//               PopperProps={{
//                 modifiers: [
//                   {
//                     name: "offset",
//                     options: {
//                       offset: [20, -10],
//                     },
//                   },
//                 ],
//               }}
//               componentsProps={{
//                 tooltip: {
//                   sx: {
//                     backgroundColor: "background.paper",
//                     color: "text.primary",
//                     boxShadow: 3,
//                     p: { xs: 1, md: 2 },
//                     borderRadius: "0.5rem",
//                   },
//                 },
//               }}
//             >
//               <ListItem sx={styles.listItem}>
//                 <ListItemText
//                   primaryTypographyProps={{
//                     fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
//                     fontWeight: 500,
//                   }}
//                   primary={`${index + 1}. ${topic.title}`}
//                 />
//               </ListItem>
//             </Tooltip>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { getDisciplineById } from "../../api/disciplineClient";
import { getTopicsByDisciplineId } from "../../api/topicClient";
import { bannerMap, disciplinesGenitive } from "../../constants";
import { TypographyDualAnimator } from "../../components/TypographyDualAnimator";
import * as styles from "./testPageStyles";

interface Discipline {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string | null;
}

export function TestPage() {
  const { id } = useParams();
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [showTopics, setShowTopics] = useState(false);
  const [showTestOptions, setShowTestOptions] = useState(false);
  const topicsRef = useRef<HTMLUListElement | null>(null);
  const testOptionsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleShowTopics = async () => {
    if (!showTopics && discipline) {
      const data = await getTopicsByDisciplineId(discipline.id);
      setTopics(data);
    }
    setShowTopics(!showTopics);
  };

  const handleShowTestOptions = () => {
    setShowTestOptions(true);
  };

  // прокрутка к списку тем
  useEffect(() => {
    if (showTopics && topicsRef.current) {
      topicsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showTopics]);

  // прокрутка к кнопкам выбора теста
  useEffect(() => {
    if (showTestOptions && testOptionsRef.current) {
      testOptionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showTestOptions]);

  useEffect(() => {
    if (id) {
      getDisciplineById(Number(id)).then(setDiscipline);
    }
  }, [id]);

  if (!discipline) return <p>Загрузка...</p>;

  const banner = bannerMap[discipline.id];
  const nameGenitive = disciplinesGenitive[discipline.name] || discipline.name;

  return (
    <Box sx={styles.pageWrapper}>
      <Typography variant="h3" sx={styles.title}>
        Пробний онлайн-тест НМТ / ЗНО з {nameGenitive}
      </Typography>

      <TypographyDualAnimator
        texts={[
          ["Пробний онлайн-тест НМТ / ЗНО з", discipline.name],
          ["Перевір вже зараз", "свій рівень підготовки"],
        ]}
        colorPairs={[
          ["#FFA07A", "#ADD8E6"],
          ["#9c27b0", "#F4A460"],
          ["#808000", "#FFD700"],
        ]}
        interval={8000}
        variant="h5"
        fontWeight={700}
      />

      {banner && (
        <Box sx={styles.testDisciplineImagetyle}>
          <Box
            component="img"
            src={banner.src}
            alt={banner.alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Изменено: теперь показывает выбор теста */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ ...styles.testButtonStyle, left: 16 }}
            onClick={handleShowTestOptions}
          >
            Пройти тест
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleShowTopics}
            sx={{ ...styles.testButtonStyle, right: 16 }}
          >
            Перелік тем
          </Button>
        </Box>
      )}

      {showTopics && topics.length > 0 && (
        <List ref={topicsRef} sx={styles.topicsList}>
          {topics.map((topic, index) => (
            <Tooltip
              key={topic.id}
              title={
                <span
                  style={{
                    maxWidth: "clamp(15rem, 30vw, 25rem)",
                    display: "block",
                    whiteSpace: "normal",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  }}
                >
                  {topic.description}
                </span>
              }
              arrow
              placement="top-end"
            >
              <ListItem sx={styles.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                    fontWeight: 500,
                  }}
                  primary={`${index + 1}. ${topic.title}`}
                />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      )}

      {/* ✅ Блок выбора типа теста */}
      {showTestOptions && (
        <Box
          ref={testOptionsRef}
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {/* Учбовий тест */}
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/test/session/${encodeURIComponent(discipline.id)}/${encodeURIComponent(discipline.name)}?type=learn`)
            }

          >
            <Box
              component="img"
              src="/images/test-type/learn.jpg"
              alt="Учбовий тест"
              sx={{
                width: { xs: "150px", md: "200px" },
                height: "auto",
                mb: 1,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Typography variant="h6">Учбовий тест</Typography>
          </Box>

          {/* Реальний тест */}
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/test/session/${encodeURIComponent(discipline.id)}/${encodeURIComponent(discipline.name)}?type=real`)
            }
          >
            <Box
              component="img"
              src="/images/test-type/real.jpg"
              alt="Реальний тест"
              sx={{
                width: { xs: "150px", md: "200px" },
                height: "auto",
                mb: 1,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Typography variant="h6">Реальний тест</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
