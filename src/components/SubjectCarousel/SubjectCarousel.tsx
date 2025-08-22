// // SubjectCard с кликабельными областями и модальным окном. Все работает, только модальное окно самопроизвольно при смене карточек
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
//   cardRotationInterval = 15000,
//   imageRotationInterval = 5000,
//   basePath,
// }: SubjectsCarouselProps) {
//   const [index, setIndex] = useState(0);
//   const [forceUpdate, setForceUpdate] = useState(0); // Добавляем триггер синхронизации
//   const theme = useTheme();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % subjects.length);
//       setForceUpdate(prev => prev + 1); // Принудительное обновление
//     }, cardRotationInterval);
//     return () => clearInterval(timer);
//   }, [subjects.length, cardRotationInterval]);

//   // Дублируем массив для бесконечного скролла
//   const looped = [...subjects, ...subjects];

//   // Передаем общий ключ для синхронизации
//   const syncKey = `${index}-${forceUpdate}`;

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
//               key={`${syncKey}-${i}`} // Синхронизирующий ключ
//               title={subject.title}
//               images={subject.images.map((img) => basePath + img)}
//               description={subject.description}
//               detailedDescription={subject.detailedDescription}
//               imageRotationInterval={imageRotationInterval}
//               titleColor={theme.palette.custom.quizLabel}
//               bgColor={theme.palette.primary.main}
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


// SubjectCard с кликабельными областями и модальным окном. Все работает, только модальное окно не закрывается при смене карточек
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

  return (
    <Box sx={{ 
      overflow: "hidden",
      height: "85vh",
      width: "98vw",
      position: "relative",
      backgroundColor: theme.palette.custom.outcard
    }}>
      <Box sx={{
        display: "flex",
        height: "100%",
        transition: "transform 1000ms ease",
        transform: `translateX(-${index * (100 / 3)}%)`,
        gap: "1px",
        padding: "2px 2px",
        boxSizing: "border-box"
      }}>
        {looped.map((subject, i) => (
          <Box 
            key={`${subject.title}-${i}`}
            sx={{
              flex: "0 0 calc(100%/3 - 12px)",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
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
                height: "calc(100% - 16px)",
                margin: "8px 0"
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}



