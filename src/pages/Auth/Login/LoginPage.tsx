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