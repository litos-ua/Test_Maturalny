import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import * as styles from "../authStyles";
import { useState } from "react";
import { authService } from "../../../services";
import { useParams } from "react-router-dom";

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
    <Box sx={{pt:"12vh", pl:"10vw", maxWidth:"50vw"}}>
      <Box sx={styles.pageContainer}>
        <Box sx={styles.formContainer}>
          <Typography variant="h5" sx={styles.formTitle}>
            Скидання пароля
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
              label="Новий пароль"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              sx={styles.inputField}
            />

            <TextField
              fullWidth
              label="Підтвердження нового пароля"
              name="confirmNewPassword"
              type="password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
              helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
              sx={styles.inputField}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={styles.submitButton}
            >
              Скинути пароль
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
