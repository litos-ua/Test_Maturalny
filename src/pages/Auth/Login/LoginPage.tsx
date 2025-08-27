// // Без хука используем контекстный метод authService.login
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import { loginSchema } from "./loginSchema";
// import { useAuth } from "../../../context";
// import * as styles from "../authStyles";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";



// export function LoginPage() {
//   const [submitError, setSubmitError] = useState("");
//   const { login } = useAuth();
//   const { authUser, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//       setSubmitError("");

//       try {
//         await login(values.email, values.password) // Используем хук из контекста

//         // Редирект или сообщение об успехе
        
//         console.log("🔎 isAuthenticated (Login):", isAuthenticated);
//         console.log("🔎 user(Login):", authUser);
//         console.log("Логи перед редиректом...");
        
//         //navigate("/");

//         if (!authUser?.emailVerified) {
//           navigate("/");  ///verify-email
//         } else {
//           navigate("/");
//         }

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


// Вносим адаптивные изменения

import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));


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
      <Box sx={{
      ...(typeof styles.formContainer === 'function' ? styles.formContainer(theme) : styles.formContainer),
      maxWidth: { 
        xs: '90%', 
        sm: '70%', 
        md: '40%', 
        lg: '30vw' 
      },
      p: { xs: 3, sm: 4, md: 4 },
      mx: { xs: 2, sm: 3 }
    }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{
            ...styles.formTitle,
            fontSize: { 
              xs: '1.3rem', 
              sm: '1.4rem', 
              md: '1.5rem' 
            },
            mb: { xs: 1.5, sm: 2 }
          }}
        >
          Вхід
        </Typography>

        {submitError && (
          <Typography 
            color="error" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
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
            sx={{
              ...styles.inputField,
              mb: { xs: 1.5, sm: 2 }
            }}
            size={isMobile ? "small" : "medium"}
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
            sx={{
              ...styles.inputField,
              mb: { xs: 1.5, sm: 2 }
            }}
            size={isMobile ? "small" : "medium"}
          />

          <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%' 
            }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  ...styles.submitButton,
                  mt: { xs: 1.5, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  width: '100%', 
                      maxWidth: {
                    xs: 'min(280px, 85vw)',  
                    sm: 'min(300px, 70vw)',
                    md: 'min(320px, 50vw)',
                    lg: 'min(340px, 40vw)'
                  }
                }}
                size={isMobile ? "small" : "medium"}
              >
                Увійти
              </Button>
            </Box>
        </form>

        <Box sx={{ 
          mt: { xs: 1.5, sm: 2 }, 
          textAlign: "center" 
        }}>
          <Typography 
            variant="body2" 
            sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
          >
            Не маєте акаунту?{" "}
            <a 
              href="/register" 
              style={{ 
                color: "#1976d2",
                fontSize: isMobile ? '0.8rem' : '0.9rem'
              }}
            >
              Зареєструватися
            </a>
          </Typography>
        </Box>
        
        <Box sx={{ 
          mt: { xs: 1, sm: 2 }, 
          textAlign: "center" 
        }}>
          <Link 
            to="/forgot-password" 
            style={{ 
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}
          >
            Забув пароль?
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
