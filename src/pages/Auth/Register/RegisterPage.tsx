// import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import { registerSchema } from "./registerSchema";
// import { authService } from "../../../services";
// import * as styles from "../authStyles";
// import { useState } from "react";
// import type { RegisterUserDto } from "../../../types";

// export function RegisterPage() {
//   const [submitError, setSubmitError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       fullname: "",
//       address: "",
//       phoneNumber: "",
//       agree: false,
//     },
//     validationSchema: registerSchema,
//     onSubmit: async (values) => {
//       setSubmitError("");
//       setSubmitSuccess("");

//       const dto: RegisterUserDto = {
//         username: values.username,
//         email: values.email,
//         password: values.password,
//         fullname: values.fullname || undefined,
//         address: values.address || undefined,
//         phoneNumber: values.phoneNumber || undefined,
//       };

//       try {
//         await authService.register(dto);
//         setSubmitSuccess("Реєстрація успішна. Тепер ви можете увійти.");
//         formik.resetForm();
//       } catch (err: any) {
//         setSubmitError(err.message || "Помилка реєстрації.");
//       }
//     },
//   });

//   return (
//     <Box sx={styles.formContainer}>
//       <Typography variant="h5" sx={styles.formTitle}>
//         Реєстрація
//       </Typography>

//       {submitError && <Typography color="error">{submitError}</Typography>}
//       {submitSuccess && <Typography color="primary">{submitSuccess}</Typography>}

//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           label="Ім'я"
//           name="username"
//           value={formik.values.username}
//           onChange={formik.handleChange}
//           error={formik.touched.username && Boolean(formik.errors.username)}
//           helperText={formik.touched.username && formik.errors.username}
//           sx={styles.inputField}
//         />

//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           type="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//           sx={styles.inputField}
//         />

//         <TextField
//           fullWidth
//           label="Пароль"
//           name="password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//           sx={styles.inputField}
//         />

//         <TextField
//           fullWidth
//           label="Підтвердження пароля"
//           name="confirmPassword"
//           type="password"
//           value={formik.values.confirmPassword}
//           onChange={formik.handleChange}
//           error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
//           helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
//           sx={styles.inputField}
//         />

//         <TextField
//           fullWidth
//           label="Повне ім'я (необов'язково)"
//           name="fullname"
//           value={formik.values.fullname}
//           onChange={formik.handleChange}
//           error={formik.touched.fullname && Boolean(formik.errors.fullname)}
//           helperText={formik.touched.fullname && formik.errors.fullname}
//           sx={styles.inputField}
//         />

//         <TextField
//           fullWidth
//           label="Адреса (необов'язково)"
//           name="address"
//           value={formik.values.address}
//           onChange={formik.handleChange}
//           error={formik.touched.address && Boolean(formik.errors.address)}
//           helperText={formik.touched.address && formik.errors.address}
//           sx={styles.inputField}
//         />

//         <TextField
//           fullWidth
//           label="Телефон (необов'язково)"
//           name="phoneNumber"
//           value={formik.values.phoneNumber}
//           onChange={formik.handleChange}
//           error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
//           helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
//           sx={styles.inputField}
//         />

//         <FormControlLabel
//           control={
//             <Checkbox
//               name="agree"
//               checked={formik.values.agree}
//               onChange={formik.handleChange}
//               sx={styles.checkbox}
//             />
//           }
//           label={
//             <Typography variant="body2">
//               Реєструючись, ви погоджуєтесь з{" "}
//               <a href="/privacy" style={{ color: "#1976d2" }}>
//                 політикою конфіденційності
//               </a>{" "}
//               та{" "}
//               <a href="/terms" style={{ color: "#1976d2" }}>
//                 умовами використання
//               </a>.
//             </Typography>
//           }
//         />

//         {formik.touched.agree && formik.errors.agree && (
//           <Typography color="error" variant="body2">
//             {formik.errors.agree}
//           </Typography>
//         )}

//         <Button
//           fullWidth
//           type="submit"
//           variant="contained"
//           sx={styles.submitButton}
//         >
//           Зареєструватися
//         </Button>
//       </form>
//     </Box>
//   );
// }


import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "./registerSchema";
import { authService } from "../../../services";
import { RotatingImage } from "../../../components";
import { TeacherImages } from "../../../constants";
import * as styles from "../authStyles";
import { useState } from "react";
import type { RegisterUserDto } from "../../../types";

export function RegisterPage() {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      address: "",
      phoneNumber: "",
      agree: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      setSubmitSuccess("");

      const dto: RegisterUserDto = {
        username: values.username,
        email: values.email,
        passwordHash: values.password,
        fullname: values.fullname || undefined,
        address: values.address || undefined,
        phoneNumber: values.phoneNumber || undefined,
      };

      try {
        await authService.register(dto);
        setSubmitSuccess("Реєстрація успішна. Тепер ви можете увійти.");
        formik.resetForm();
      } catch (err: any) {
        setSubmitError(err.message || "Помилка реєстрації.");
      }
    },
  });

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={{pt:"12vh", pl:"10vw", maxWidth:"50vw"}}>
        <Typography sx={{ ...styles.headline, mb: "5vh" }}>
            Отримайте доступ до безкоштовних відеокурсів та екзаменаційних завданнь!
        </Typography>

        <Box sx={styles.imageContainer}>
            <RotatingImage images={TeacherImages}/>
        </Box>
      </Box>      
      {/* Правая форма */}
      <Box sx={styles.formWrapper}>
        <Box sx={styles.formContainer}>
    
          <Typography variant="h5" sx={styles.formTitle}>
            Реєстрація
          </Typography>

          {submitError && <Typography color="error">{submitError}</Typography>}
          {submitSuccess && (
            <Typography color="primary">{submitSuccess}</Typography>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Ім'я"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={styles.inputField}
            />

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

            <TextField
              fullWidth
              label="Підтвердження пароля"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              sx={styles.inputField}
            />

            <TextField
              fullWidth
              label="Повне ім'я (необов'язково)"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              sx={styles.inputField}
            />

            <TextField
              fullWidth
              label="Адреса (необов'язково)"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              sx={styles.inputField}
            />

            <TextField
              fullWidth
              label="Телефон (необов'язково)"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              sx={styles.inputField}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agree"
                  checked={formik.values.agree}
                  onChange={formik.handleChange}
                  sx={styles.checkbox}
                />
              }
              label={
                <Typography variant="body2">
                  Реєструючись, ви погоджуєтесь з{" "}
                  <a href="/privacy" style={{ color: "#1976d2" }}>
                    політикою конфіденційності
                  </a>{" "}
                  та{" "}
                  <a href="/terms" style={{ color: "#1976d2" }}>
                    умовами використання
                  </a>.
                </Typography>
              }
            />

            {formik.touched.agree && formik.errors.agree && (
              <Typography color="error" variant="body2">
                {formik.errors.agree}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={styles.submitButton}
            >
              Зареєструватися
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
