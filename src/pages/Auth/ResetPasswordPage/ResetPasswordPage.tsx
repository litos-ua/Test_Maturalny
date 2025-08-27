// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import * as styles from "../authStyles";
// import { useState } from "react";
// import { authService } from "../../../services";
// import { useParams } from "react-router-dom";

// const resetPasswordSchema = yup.object({
//   newPassword: yup
//     .string()
//     .min(8, "Пароль має містити щонайменше 8 символів")
//     .required("Новий пароль є обов'язковим"),
//   confirmNewPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword")], "Паролі не співпадають")
//     .required("Підтвердження пароля є обов'язковим"),
// });

// export function ResetPasswordPage() {
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");
//   const { token } = useParams<{ token: string }>();

//   const formik = useFormik({
//     initialValues: {
//       newPassword: "",
//       confirmNewPassword: "",
//     },
//     validationSchema: resetPasswordSchema,
//     onSubmit: async (values) => {
//       setSubmitError("");
//       setSubmitSuccess("");

//       if (!token) {
//         setSubmitError("Токен відсутній або недійсний.");
//         return;
//       }

//       try {
//         await authService.resetPassword(token, values.newPassword);
//         setSubmitSuccess("Пароль успішно скинуто. Тепер ви можете увійти.");
//         formik.resetForm();
//       } catch (err: any) {
//         setSubmitError(err.message || "Помилка під час скидання пароля.");
//       }
//     },
//   });

//   return (
//     <Box sx={{pt:"12vh", pl:"10vw", maxWidth:"50vw"}}>
//       <Box sx={styles.pageContainer}>
//         <Box sx={styles.formContainer}>
//           <Typography variant="h5" sx={styles.formTitle}>
//             Скидання пароля
//           </Typography>

//           {submitError && (
//             <Typography color="error" sx={styles.submitMessage}>
//               {submitError}
//             </Typography>
//           )}
//           {submitSuccess && (
//             <Typography color="primary" sx={styles.submitMessage}>
//               {submitSuccess}
//             </Typography>
//           )}

//           <form onSubmit={formik.handleSubmit}>
//             <TextField
//               fullWidth
//               label="Новий пароль"
//               name="newPassword"
//               type="password"
//               value={formik.values.newPassword}
//               onChange={formik.handleChange}
//               error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
//               helperText={formik.touched.newPassword && formik.errors.newPassword}
//               sx={styles.inputField}
//             />

//             <TextField
//               fullWidth
//               label="Підтвердження нового пароля"
//               name="confirmNewPassword"
//               type="password"
//               value={formik.values.confirmNewPassword}
//               onChange={formik.handleChange}
//               error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
//               helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
//               sx={styles.inputField}
//             />

//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               sx={styles.submitButton}
//             >
//               Скинути пароль
//             </Button>
//           </form>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import * as styles from "../authStyles";
import { useState } from "react";
import { authService } from "../../../services";
import { useParams, Link } from "react-router-dom";

const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Новий пароль є обов'язковим"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Паролі не співпадають")
    .required("Підтвердження пароля є обов'язковим"),
});

export function ResetPasswordPage() {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const { token } = useParams<{ token: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      setSubmitSuccess("");

      if (!token) {
        setSubmitError("Токен відсутній або недійсний.");
        return;
      }

      try {
        await authService.resetPassword(token, values.newPassword);
        setSubmitSuccess("Пароль успішно скинуто. Тепер ви можете увійти.");
        formik.resetForm();
      } catch (err: any) {
        setSubmitError(err.message || "Помилка під час скидання пароля.");
      }
    },
  });

  return (
    <Box sx={{
      ...styles.pageContainer,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      minHeight: '100vh',
      backgroundColor: (theme) => theme.palette.primary.light,
    }}>
      {/* Левая часть с заголовком */}
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        pt: { xs: "5vh", md: "12vh" },
        px: { xs: "5vw", md: "10vw" },
        textAlign: { xs: "center", md: "left" },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Typography sx={{ 
          ...styles.headline, 
          mb: { xs: "3vh", md: "5vh" },
          fontSize: { xs: "1.5rem", md: "2rem" },
          background: "linear-gradient(45deg, hsla(32, 86%, 48%, 1.00), rgba(206, 245, 66, 1))",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          fontWeight: "bold",
        }}>
          Встановіть новий пароль для вашого акаунту
        </Typography>
      </Box>      
      
      {/* Правая форма */}
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 0 }
      }}>
        <Box sx={{
          ...(typeof styles.formContainer === 'function' ? styles.formContainer(theme) : styles.formContainer),
          width: { xs: "90%", sm: "80%", md: "90%" },
          maxWidth: { xs: "400px", md: "none" },
          p: { xs: 3, sm: 4 },
          mx: "auto"
        }}>
          <Typography variant="h5" sx={{
            ...styles.formTitle,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            mb: { xs: 2, md: 3 }
          }}>
            Скидання пароля
          </Typography>

          {submitError && (
            <Typography color="error" sx={{ 
              mb: 2, 
              fontSize: { xs: "0.9rem", md: "1rem" } 
            }}>
              {submitError}
            </Typography>
          )}
          {submitSuccess && (
            <Typography color="primary" sx={{ 
              mb: 2, 
              fontSize: { xs: "0.9rem", md: "1rem" } 
            }}>
              {submitSuccess}
            </Typography>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Новий пароль"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              sx={styles.inputField}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              label="Підтвердження нового пароля"
              name="confirmNewPassword"
              type="password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
              helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
              sx={styles.inputField}
              size={isMobile ? "small" : "medium"}
            />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%' 
            }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  ...styles.submitButton,
                  mt: 2,
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: "0.9rem", md: "1rem" }
                }}
                size={isMobile ? "small" : "medium"}
              >
                Скинути пароль
              </Button>
            </Box>

            <Box sx={{ 
              mt: 2, 
              textAlign: "center" 
            }}>
              <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                Повернутися до{" "}
                <Link to="/login" style={{ color: "#1976d2" }}>
                  входу
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
