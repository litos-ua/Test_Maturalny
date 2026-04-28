// components/UsefulMaterials/Math/MathFormula.tsx
import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean; // true для больших формул на отдельной строке
}

export const MathFormula: React.FC<MathFormulaProps> = ({ formula, displayMode = false }) => {
  const html = katex.renderToString(formula, {
    throwOnError: false,
    displayMode,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};