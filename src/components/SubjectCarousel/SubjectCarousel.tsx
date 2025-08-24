// // SubjectCard с кликабельными областями и модальным окном. Все работает, только модальное окно не закрывается при смене карточек
// import { Box, useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
// import { SubjectCard } from "../../components";
// import { type Subject } from "../../types";

// interface SubjectsCarouselProps {
//   subjects: Subject[];
//   cardRotationInterval?: number;
//   imageRotationInterval?: number;
//   basePath: string;
// }

// export function SubjectsCarousel({
//   subjects,
//   cardRotationInterval = 25000,
//   imageRotationInterval = 6000,
//   basePath,
// }: SubjectsCarouselProps) {
//   const [index, setIndex] = useState(0);
//   const [forceUpdate, setForceUpdate] = useState(0);
//   const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
//   const theme = useTheme();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       // Не меняем индекс, если открыто модальное окно
//       if (openModalIndex === null) {
//         setIndex((prev) => (prev + 1) % subjects.length);
//         setForceUpdate(prev => prev + 1);
//       }
//     }, cardRotationInterval);
//     return () => clearInterval(timer);
//   }, [subjects.length, cardRotationInterval, openModalIndex]);

//   const looped = [...subjects, ...subjects];
//   const syncKey = `${index}-${forceUpdate}`;

//   const handleOpenModal = (idx: number) => {
//     setOpenModalIndex(idx);
//   };

//   const handleCloseModal = () => {
//     setOpenModalIndex(null);
//   };

//   return (
//     <Box sx={{ 
//       overflow: "hidden",
//       height: "85vh",
//       width: "98vw",
//       position: "relative",
//       backgroundColor: theme.palette.custom.outcard
//     }}>
//       <Box sx={{
//         display: "flex",
//         height: "100%",
//         transition: "transform 1000ms ease",
//         transform: `translateX(-${index * (100 / 3)}%)`,
//         gap: "1px",
//         padding: "2px 2px",
//         boxSizing: "border-box"
//       }}>
//         {looped.map((subject, i) => (
//           <Box 
//             key={`${subject.title}-${i}`}
//             sx={{
//               flex: "0 0 calc(100%/3 - 12px)",
//               height: "100%",
//               boxSizing: "border-box",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <SubjectCard
//               key={`${syncKey}-${i}`}
//               title={subject.title}
//               images={subject.images.map((img) => basePath + img)}
//               description={subject.description}
//               detailedDescription={subject.detailedDescription}
//               imageRotationInterval={imageRotationInterval}
//               titleColor={theme.palette.custom.quizLabel}
//               bgColor={theme.palette.primary.main}
//               isModalOpen={openModalIndex === i}
//               onOpenModal={() => handleOpenModal(i)}
//               onCloseModal={handleCloseModal}
//               sx={{ 
//                 height: "calc(100% - 16px)",
//                 margin: "8px 0"
//               }}
//             />
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }



// Адаптация к разним єкранам
import { Box, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { SubjectCard } from "../../components";
import { type Subject } from "../../types";

interface SubjectsCarouselProps {
  subjects: Subject[];
  cardRotationInterval?: number;
  imageRotationInterval?: number;
  basePath: string;
}

export function SubjectsCarousel({
  subjects,
  cardRotationInterval = 25000,
  imageRotationInterval = 6000,
  basePath,
}: SubjectsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      // Не меняем индекс, если открыто модальное окно
      if (openModalIndex === null) {
        setIndex((prev) => (prev + 1) % subjects.length);
        setForceUpdate(prev => prev + 1);
      }
    }, cardRotationInterval);
    return () => clearInterval(timer);
  }, [subjects.length, cardRotationInterval, openModalIndex]);

  const looped = [...subjects, ...subjects];
  const syncKey = `${index}-${forceUpdate}`;

  const handleOpenModal = (idx: number) => {
    setOpenModalIndex(idx);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  // Функция для расчета количества видимых карточек
  const getVisibleCardsCount = () => {
    return {
      xs: 1,  // мобильные - 1 карточка
      sm: 2,  // планшеты - 2 карточки
      md: 3,  // десктопы - 3 карточки
      lg: 3   // большие экраны - 3 карточки
    };
  };

  // Функция для расчета смещения трансформации
  const getTransformValue = () => {
    return {
      xs: `translateX(-${index * 100}%)`,      // 100% на карточку
      sm: `translateX(-${index * 50}%)`,       // 50% на карточку (2 карточки)
      md: `translateX(-${index * (100 / 3)}%)`, // 33.33% на карточку
      lg: `translateX(-${index * (100 / 3)}%)`  // 33.33% на карточку
    };
  };

  return (
    <Box sx={{ 
      overflow: "hidden",
      height: { xs: "75vh", sm: "80vh", md: "85vh" },
      width: { xs: "100vw", sm: "98vw", md: "98vw" },
      position: "relative",
      backgroundColor: theme.palette.custom.outcard,
      mx: "auto"
    }}>
      <Box sx={{
        display: "flex",
        height: "100%",
        transition: "transform 1000ms ease",
        transform: getTransformValue(),
        gap: { xs: "4px", sm: "6px", md: "8px" },
        padding: { xs: "4px", sm: "6px", md: "8px" },
        boxSizing: "border-box"
      }}>
        {looped.map((subject, i) => (
          <Box 
            key={`${subject.title}-${i}`}
            sx={{
              flex: {
                xs: "0 0 calc(100% - 8px)",      // 1 карточка
                sm: "0 0 calc(50% - 12px)",     // 2 карточки
                md: "0 0 calc(33.33% - 16px)",  // 3 карточки
                lg: "0 0 calc(33.33% - 16px)"   // 3 карточки
              },
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              minWidth: 0 // предотвращает переполнение
            }}
          >
            <SubjectCard
              key={`${syncKey}-${i}`}
              title={subject.title}
              images={subject.images.map((img) => basePath + img)}
              description={subject.description}
              detailedDescription={subject.detailedDescription}
              imageRotationInterval={imageRotationInterval}
              titleColor={theme.palette.custom.quizLabel}
              bgColor={theme.palette.primary.main}
              isModalOpen={openModalIndex === i}
              onOpenModal={() => handleOpenModal(i)}
              onCloseModal={handleCloseModal}
              sx={{ 
                height: { xs: "calc(100% - 8px)", sm: "calc(100% - 12px)", md: "calc(100% - 16px)" },
                margin: { xs: "4px 0", sm: "6px 0", md: "8px 0" }
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}