
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
// import "./index.css";
// import { AuthProvider } from "./context/AuthContext"; // импортируем AuthProvider

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <AuthProvider> 
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>
// );



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
// import "./index.css";
// import { AuthProvider } from "./context/AuthContext"; 
// import { HelmetProvider } from "react-helmet-async";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <AuthProvider> 
//         <RouterProvider router={router} />
//       </AuthProvider>
//     </HelmetProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; 
import { HelmetProvider } from "react-helmet-async";
import { useApiFallback } from "./hooks/useApiFallback"; // 🔥 импорт хука

// 🔥 Компонент-обёртка для инициализации fallback
const ApiFallbackInitializer = () => {
    useApiFallback();
    return null;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ApiFallbackInitializer />  {/* 🔥 добавьте эту строку */}
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);