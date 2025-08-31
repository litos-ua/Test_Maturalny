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


// // Вносим адаптивные изменения

// import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
// import { useFormik } from "formik";
// import { loginSchema } from "./loginSchema";
// import { useAuth } from "../../../context";
// import * as styles from "../authStyles";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {ROUTE} from "../../../router"



// export function LoginPage() {
//   const [submitError, setSubmitError] = useState("");
//   const { login } = useAuth();
//   const { authUser, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));


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
//           navigate(ROUTE.HOME);  ///verify-email
//         } else {
//           navigate(ROUTE.HOME);
//         }

//       } catch (err: any) {
//         setSubmitError(err.message || "Помилка входу.");
//       }
//     },
    
//   });

//   return (
//     <Box sx={styles.formWrapper}>
//       <Box sx={{
//       ...(typeof styles.formContainer === 'function' ? styles.formContainer(theme) : styles.formContainer),
//       maxWidth: { 
//         xs: '90%', 
//         sm: '70%', 
//         md: '40%', 
//         lg: '30vw' 
//       },
//       p: { xs: 3, sm: 4, md: 4 },
//       mx: { xs: 2, sm: 3 }
//     }}>
//         <Typography 
//           variant={isMobile ? "h6" : "h5"} 
//           sx={{
//             ...styles.formTitle,
//             fontSize: { 
//               xs: '1.3rem', 
//               sm: '1.4rem', 
//               md: '1.5rem' 
//             },
//             mb: { xs: 1.5, sm: 2 }
//           }}
//         >
//           Вхід
//         </Typography>

//         {submitError && (
//           <Typography 
//             color="error" 
//             sx={{ 
//               mb: 2,
//               fontSize: { xs: '0.9rem', sm: '1rem' }
//             }}
//           >
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
//             sx={{
//               ...styles.inputField,
//               mb: { xs: 1.5, sm: 2 }
//             }}
//             size={isMobile ? "small" : "medium"}
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
//             sx={{
//               ...styles.inputField,
//               mb: { xs: 1.5, sm: 2 }
//             }}
//             size={isMobile ? "small" : "medium"}
//           />

//           <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               width: '100%' 
//             }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   ...styles.submitButton,
//                   mt: { xs: 1.5, sm: 2 },
//                   py: { xs: 1, sm: 1.5 },
//                   fontSize: { xs: '0.9rem', sm: '1rem' },
//                   width: '100%', 
//                       maxWidth: {
//                     xs: 'min(280px, 85vw)',  
//                     sm: 'min(300px, 70vw)',
//                     md: 'min(320px, 50vw)',
//                     lg: 'min(340px, 40vw)'
//                   }
//                 }}
//                 size={isMobile ? "small" : "medium"}
//               >
//                 Увійти
//               </Button>
//             </Box>
//         </form>

//         <Box sx={{ 
//           mt: { xs: 1.5, sm: 2 }, 
//           textAlign: "center" 
//         }}>
//           <Typography 
//             variant="body2" 
//             sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
//           >
//             Не маєте акаунту?{" "}
//             <a 
//               href="/register" 
//               style={{ 
//                 color: "#1976d2",
//                 fontSize: isMobile ? '0.8rem' : '0.9rem'
//               }}
//             >
//               Зареєструватися
//             </a>
//           </Typography>
//         </Box>
        
//         <Box sx={{ 
//           mt: { xs: 1, sm: 2 }, 
//           textAlign: "center" 
//         }}>
//           <Link 
//             to="/forgot-password" 
//             style={{ 
//               fontSize: isMobile ? '0.8rem' : '0.9rem',
//             }}
//           >
//             Забув пароль?
//           </Link>
//           <Box sx={{ width: isMobile ? 3 : 6 }} />
//           <Link 
//             to="/" 
//             style={{ 
//               fontSize: isMobile ? '0.8rem' : '0.9rem'
//             }}
//           >
//             Головна
//           </Link>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


import { Box, Button, TextField, Typography, useTheme, useMediaQuery, Paper, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "./loginSchema";
import { useAuth } from "../../../context";
import * as styles from "../authStyles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function LoginPage() {
  const [submitError, setSubmitError] = useState("");
  const { login } = useAuth();
  const { authUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      try {
        await login(values.email, values.password);
        if (!authUser?.emailVerified) {
          navigate(ROUTE.HOME);
        } else {
          navigate(ROUTE.HOME);
        }
      } catch (err: any) {
        setSubmitError(err.message || "Помилка входу.");
      }
    },
  });

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };


  return (
    <Box
      sx={{
        ...styles.pageContainer,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) => theme.palette.primary.main, // ← ОБЩИЙ ФОН как в ForgotPassword
        p: { xs: 2, md: 4 }
      }}
    >
      {/* Форма на отдельной плите */}
      <Box
        sx={{
          ...styles.formWrapper,
          width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' }, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, md: 6 },
          backgroundColor: (theme) =>  // ← ЦВЕТ ВОКРУГ ФОРМЫ как в ForgotPassword
            theme.palette.mode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            ...styles.formContainer,
            width: "100%",
            maxWidth: { xs: "400px", md: "450px" },
            p: { xs: 3, sm: 4, md: 5 },
            mx: "auto",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.1)",
            bgcolor: (theme) =>  // ← ФОН ВНУТРИ ФОРМЫ
              theme.palette.mode === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,30,30,0.9)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              ...styles.formTitle,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              mb: { xs: 3, md: 4 },
              textAlign: "center",
              color: (theme) => theme.palette.primary.main
            }}
          >
            Вхід
          </Typography>

          {submitError && (
            <Typography 
              color="error" 
              sx={{ 
                mb: 3, 
                textAlign: "center",
                fontSize: { xs: "0.9rem", md: "1rem" }
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
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                ...styles.inputField,
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'transparent', // ← ПРОЗРАЧНЫЙ ФОН инпута
                  color: (theme) => theme.palette.text.primary,
                  '& fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.dark,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: (theme) => theme.palette.text.secondary,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                ...styles.inputField,
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'transparent', // ← ПРОЗРАЧНЫЙ ФОН инпута
                  color: (theme) => theme.palette.text.primary,
                  '& fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => theme.palette.primary.dark,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: (theme) => theme.palette.text.secondary,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              size={isMobile ? "small" : "medium"}
              slotProps={{
                input: {    
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    ),
                  },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                ...styles.submitButton,
                mt: 2,
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "1rem", md: "1.1rem" },
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.getContrastText(theme.palette.secondary.main),
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.secondary.dark,
                }
              }}
            >
              Увійти
            </Button>
          </form>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: (theme) => theme.palette.text.primary
              }}
            >
              Не маєте акаунту?{" "}
              <Link 
                to="/register" 
                style={{ 
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Зареєструватися
              </Link>
            </Typography>
          </Box>
          
          <Box sx={{ 
            mt: 3, 
            textAlign: "center",
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}>
            <Link 
              to="/forgot-password" 
              style={{ 
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Забув пароль?
            </Link>
            <Link 
              to={ROUTE.HOME} 
              style={{ 
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Головна
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}