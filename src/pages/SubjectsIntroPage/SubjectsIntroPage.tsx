

// import { Container } from "@mui/material";
// import { useEffect, useState } from "react";
// import { SubjectCard } from "../../components";
// import {subjects} from "../../constants"

// type SubjectInfo = {
//   title: string;
//   images: string[];
//   description: string;
// };

// const basePath: string = "images/teachers/";
// const CARD_SCROLL_INTERVAL = 15000; // мс
// const IMAGE_ROTATION_INTERVAL = 5000; // мс



// export function SubjectsIntroPage() {
//   const [index, setIndex] = useState<number>(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setIndex((prev) => (prev + 1) % subjects.length);
//     }, CARD_SCROLL_INTERVAL);
//     return () => clearInterval(id);
//   }, []);

//   // Дублируем для бесконечного скролла
//   const looped = [...subjects, ...subjects];

//   return (
//     <Container
//       sx={{
//         py: 0,
//         px: 0,
//         overflow: "hidden",
//         height: "100vh", // контейнер на всю высоту
//         maxWidth: "100% !important",
//         backgroundColor: "#E0FFFF"
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           height: "100%", // контейнер с карточками тоже на всю высоту
//           transition: "transform 1000ms ease",
//           transform: `translateX(-${index * (100 / 3)}%)`,
//         }}
//       >
//         {looped.map((s, i) => (
//           <div
//             key={`${s.title}-${i}`}
//             style={{
//               flex: "0 0 calc(100% / 3)", // ровно 3 карточки в ряду
//               height: "100%", // каждая карточка на всю высоту экрана
//               boxSizing: "border-box",
//             }}
//           >
//             <SubjectCard
//               title={s.title}
//               images={s.images.map((img) => basePath + img)}
//               description={s.description}
//               imageRotationInterval={IMAGE_ROTATION_INTERVAL}
//             />
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// }


// import { Container, useTheme } from "@mui/material";
// import { useEffect, useState } from "react";
// import { SubjectCard } from "../../components";
// import {subjects} from "../../constants"

// type SubjectInfo = {
//   title: string;
//   images: string[];
//   description: string;
// };

// const basePath: string = "images/teachers/";
// const CARD_SCROLL_INTERVAL = 15000; // мс
// const IMAGE_ROTATION_INTERVAL = 5000; // мс



// export function SubjectsIntroPage() {
//   const [index, setIndex] = useState<number>(0);
//   const theme = useTheme();

//   useEffect(() => {
//     const id = setInterval(() => {
//       setIndex((prev) => (prev + 1) % subjects.length);
//     }, CARD_SCROLL_INTERVAL);
//     return () => clearInterval(id);
//   }, []);

//   // Дублируем для бесконечного скролла
//   const looped = [...subjects, ...subjects];

//   return (
//     <Container
//       sx={{
//         py: 0,
//         px: 0,
//         overflow: "hidden",
//         height: "100vh", // контейнер на всю высоту
//         maxWidth: "100% !important",
//         backgroundColor: theme.palette.custom.outcard
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           height: "100%", // контейнер с карточками тоже на всю высоту
//           transition: "transform 1000ms ease",
//           transform: `translateX(-${index * (100 / 3)}%)`,
//         }}
//       >
//         {looped.map((s, i) => (
//           <div
//             key={`${s.title}-${i}`}
//             style={{
//               flex: "0 0 calc(100% / 3)", // ровно 3 карточки в ряду
//               height: "100%", // каждая карточка на всю высоту экрана
//               boxSizing: "border-box",
//             }}
//           >
//             <SubjectCard
//               title={s.title}
//               images={s.images.map((img) => basePath + img)}
//               description={s.description}
//               imageRotationInterval={IMAGE_ROTATION_INTERVAL}
//               titleColor={theme.palette.custom.quizLabel}
//               bgColor = {theme.palette.primary.main}
//             />
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// }

// Механизм сдвига карт перенесли в карусель
// pages/SubjectsPage.tsx
import { Container, useTheme } from "@mui/material";
import { SubjectsCarousel } from "../../components";
import { subjects } from "../../constants";

const basePath = "images/teachers/";

export function SubjectsIntroPage() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        pt: "1vh",
        pr:"2vw",
        overflow: "hidden",
        height: "88vh",
        maxWidth: "100% !important",
        backgroundColor: theme.palette.custom.outcard
      }}
    >
      <SubjectsCarousel
        subjects={subjects}
        basePath={basePath}
      />
    </Container>
  );
}