
// import { useState } from 'react';
// import { InputForm } from "../../../components";
// import type { CSSProperties } from 'react';

// type FormData = {
//   firstName: string;
//   lastName: string;
//   baseemail: string;
// };

// export function LoginPage() {
//   const [form, setForm] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     baseemail: '',
//   });

//   const handleSubmitLoginForm = () => {
//     console.log('LoginParams:', form); // 🔹 здесь доступны актуальные данные
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.formContainer}>
//         <h2 style={{ marginBottom: '1rem' }}>Login</h2>
        
//         <InputForm onFormChange={setForm} /> {/* 🔹 передаём callback */}

//         <button onClick={handleSubmitLoginForm} style={styles.button}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles: {
//   page: CSSProperties;
//   formContainer: CSSProperties;
//   button: CSSProperties;
// } = {
//   page: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: 'rgb(var(--input-phone-background-color), 0.9)',
//   },
//   formContainer: {
//     padding: '2rem',
//     borderRadius: '8px',
//     backgroundColor: 'var(--input-plate-background-color)',
//     opacity: 0.7,
//     //backgroundColor: 'rgba(var(--input-plate-background-color), 0.5)',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     width: '320px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//   },
//   button: {
//     padding: '0.75rem',
//     backgroundColor: '#1976d2',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//   },
// };

// // Без хука используем контекстный метод authService.login
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import { loginSchema } from "./loginSchema";
// import { authService } from "../../../services";
// import * as styles from "../authStyles";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export function LoginPage() {
//   const [submitError, setSubmitError] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//       setSubmitError("");

//       try {
//         await authService.login({     // Без хука вызова authService.login напрямую
//           email: values.email,
//           passwordHash: values.password,
//         });
//         // Редирект или сообщение об успехе
//         window.location.href = "/";
//       } catch (err: any) {
//         setSubmitError(err.message || "Помилка входу.");
//       }
//     },
//   });

//   return (
//     <Box sx={styles.formWrapper}>
//       <Box sx={styles.formContainer}>
//         <Typography variant="h5" sx={styles.formTitle}>
//           Вхід
//         </Typography>

//         {submitError && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {submitError}
//           </Typography>
//         )}

//         <form onSubmit={formik.handleSubmit}>
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//             sx={styles.inputField}
//           />

//           <TextField
//             fullWidth
//             label="Пароль"
//             name="password"
//             type="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//             sx={styles.inputField}
//           />

//           <Button
//             fullWidth
//             type="submit"
//             variant="contained"
//             sx={styles.submitButton}
//           >
//             Увійти
//           </Button>
//         </form>

//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Typography variant="body1">
//             Не маєте акаунту?{" "}
//             <a href="/register" style={{ color: "#1976d2" }}>
//               Зареєструватися
//             </a>
//           </Typography>
//         </Box>
//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Link to="/forgot-password">Забув пароль?</Link>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


// Без хука используем контекстный метод authService.login
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "./loginSchema";
import { useAuth } from "../../../context";
import * as styles from "../authStyles";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



export function LoginPage() {
  const [submitError, setSubmitError] = useState("");
  const { login } = useAuth();
  const { authUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setSubmitError("");

      try {
        await login(values.email, values.password) // Используем хук из контекста

        // Редирект или сообщение об успехе
        
        console.log("🔎 isAuthenticated (Login):", isAuthenticated);
        console.log("🔎 user(Login):", authUser);
        console.log("Логи перед редиректом...");
        
        //navigate("/");

        if (!authUser?.emailVerified) {
          navigate("/");  ///verify-email
        } else {
          navigate("/");
        }

      } catch (err: any) {
        setSubmitError(err.message || "Помилка входу.");
      }
    },
    
  });

  return (
    <Box sx={styles.formWrapper}>
      <Box sx={styles.formContainer}>
        <Typography variant="h5" sx={styles.formTitle}>
          Вхід
        </Typography>

        {submitError && (
          <Typography color="error" sx={{ mb: 2 }}>
            {submitError}
          </Typography>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={styles.inputField}
          />

          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={styles.inputField}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={styles.submitButton}
          >
            Увійти
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body1">
            Не маєте акаунту?{" "}
            <a href="/register" style={{ color: "#1976d2" }}>
              Зареєструватися
            </a>
          </Typography>
        </Box>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link to="/forgot-password">Забув пароль?</Link>
        </Box>
      </Box>
    </Box>
  );
}