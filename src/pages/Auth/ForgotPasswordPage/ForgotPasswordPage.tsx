import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import * as styles from "../authStyles";
import { useState } from "react";
import { authService } from "../../../services";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Введіть коректний email")
    .required("Email є обов'язковим"),
});

export function ForgotPasswordPage() {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      setSubmitSuccess("");

      try {
        await authService.forgotPassword(values.email);
        setSubmitSuccess(
          "Якщо такий email існує, інструкція зі скидання пароля надіслана."
        );
        formik.resetForm();
      } catch (err: any) {
        setSubmitError(err.message || "Помилка під час запиту скидання.");
      }
    },
  });

  return (
    <Box sx={{flex: 1,display: "flex",alignItems: "center",justifyContent: "center", p:5}}>
      <Box sx={styles.pageContainer}>
        <Box sx={styles.formContainer}>
          <Typography variant="h5" sx={styles.formTitle}>
            Відновлення пароля
          </Typography>

          {submitError && (
            <Typography color="error" sx={styles.submitMessage}>
              {submitError}
            </Typography>
          )}
          {submitSuccess && (
            <Typography color="primary" sx={styles.submitMessage}>
              {submitSuccess}
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

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={styles.submitButton}
            >
              Надіслати посилання для скидання
            </Button>
          </form>
          <Box sx={{ mt: "5vh", textAlign: "center" }}>
            <Typography variant="body1">
              Для скидання пароля введіть email та кнопку відправлення форми
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPasswordPage;
