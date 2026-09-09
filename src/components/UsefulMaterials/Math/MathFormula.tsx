// // components/UsefulMaterials/Math/MathFormula.tsx
// import React from 'react';
// import 'katex/dist/katex.min.css';
// import katex from 'katex';

// interface MathFormulaProps {
//   formula: string;
//   displayMode?: boolean; // true для больших формул на отдельной строке
// }

// export const MathFormula: React.FC<MathFormulaProps> = ({ formula, displayMode = false }) => {
//   // console.log('MathFormula received:', formula);
//   const html = katex.renderToString(formula, {
//     throwOnError: false,
//     displayMode,
//   });

//   return <span dangerouslySetInnerHTML={{ __html: html }} />;
// };

// import React from 'react';
// import 'katex/dist/katex.min.css';
// import katex from 'katex';

// interface MathFormulaProps {
//   formula: string;
//   displayMode?: boolean;
// }

// export const MathFormula: React.FC<MathFormulaProps> = ({ formula, displayMode = false }) => {
//   // 🔑 Перевіряємо, чи це валідний LaTeX
//   const isValidLatex = (text: string): boolean => {
//     try {
//       katex.renderToString(text, { throwOnError: true });
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   // 🔑 Якщо це невалідний LaTeX - показуємо як звичайний текст
//   if (!isValidLatex(formula)) {
//     return <span>{formula}</span>;
//   }

//   try {
//     const html = katex.renderToString(formula, {
//       throwOnError: false,
//       displayMode,
//     });
//     return <span dangerouslySetInnerHTML={{ __html: html }} />;
//   } catch {
//     // 🔑 Якщо помилка - показуємо як звичайний текст
//     return <span>{formula}</span>;
//   }
// };

import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ formula, displayMode = false }) => {
  // 🔑 Перевіряємо, чи це валідний LaTeX
  const isValidLatex = (text: string): boolean => {
    try {
      katex.renderToString(text, { throwOnError: true });
      return true;
    } catch {
      return false;
    }
  };

  // 🔑 Якщо це невалідний LaTeX - показуємо як звичайний текст
  if (!isValidLatex(formula)) {
    return <span>{formula}</span>;
  }

  try {
    const html = katex.renderToString(formula, {
      throwOnError: false,
      displayMode,
    });
    // 🔑 Просто повертаємо HTML без додаткових обгорток
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    // 🔑 Якщо помилка - показуємо як звичайний текст
    return <span>{formula}</span>;
  }
};