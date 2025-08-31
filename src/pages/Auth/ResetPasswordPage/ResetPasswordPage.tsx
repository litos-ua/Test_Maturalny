import { Box, Button, TextField, Typography, useTheme, useMediaQuery, Paper, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { authService } from "../../../services";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as styles from "../authStyles";
import { ROUTE } from "../../../router";
import { storage } from "../../../utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // Получение email при загрузке
    useEffect(() => {
      const savedEmail = storage.get<string>('resetEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        storage.remove('resetEmail');
      }
    }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      setSubmitSuccess("");
      setIsLoading(true);

      try {
        if (!token) {
          throw new Error("Токен відсутній");
        }

        await authService.resetPassword(token, values.newPassword);
        setSubmitSuccess("Пароль успішно скинуто!");
        
        // Через 2 секунды переходим на страницу логина
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err: any) {
        setSubmitError(err.message || "Помилка під час скидання пароля");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const toggleNewPassword = () => {
    setShowNewPassword(prev => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <Box
      sx={{
        ...styles.pageContainer,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        py:'2vh'
      }}
    >
      {/* Левая часть с заголовком */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          pt: { xs: "5vh", md: "12vh" },
          px: { xs: "5vw", md: "10vw" },
          textAlign: { xs: "center", md: "left" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: (theme) => theme.palette.primary.main
        }}
      >
        <Typography
          sx={{
            ...styles.headline,
            mb: { xs: "3vh", md: "5vh" },
            fontSize: { xs: "1.5rem", md: "2rem" },
            background:
              "linear-gradient(45deg, hsla(32, 86%, 48%, 1.00), rgba(206, 245, 66, 1))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontWeight: "bold",
          }}
        >
          Встановіть новий пароль
        </Typography>
      </Box>

      {/* Правая часть */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, md: 0 },
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "400px", md: "500px", lg: "600px" }, // ← УВЕЛИЧИВАЕМ МАКС. ШИРИНУ
            p: { xs: 2, sm: 3, md: 4 },
            mx: "auto",
          }}
        >
          {/* Блок с email имитацией */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 3 }, 
              mb: { xs: 3, md: 4 }, 
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              maxWidth: { xs: '100%', md: '500px' }, 
              mx: 'auto' 
            }}
          >
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1rem' } }}>
              📧 Email від системи безпеки
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
              <strong>Тема:</strong> Запит на скидання пароля
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
              <strong>Отримувач:</strong> {email ||'ваша_email@адреса.com'} {/* Реальный email */}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
              Натисніть кнопку нижче, щоб продовжити скидання пароля...
            </Typography>
          </Paper>

          {/* Форма сброса пароля */}
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              bgcolor: theme.palette.primary.main
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "1.75rem", lg: "2rem" },
                mb: { xs: 3, md: 4 },
                textAlign: "center",
                color: (theme) => theme.palette.primary.main
              }}
            >
              Встановіть новий пароль
            </Typography>

            {submitError && (
              <Typography color="error" sx={{ mb: 3, textAlign: "center" }}>
                {submitError}
              </Typography>
            )}

            {submitSuccess && (
              <Typography color="primary" sx={{ mb: 3, textAlign: "center" }}>
                {submitSuccess}
              </Typography>
            )}

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Новий пароль"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
                size={isMobile ? "small" : "medium"}
                slotProps={{
                  input: {    
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                      ),
                    },
                }}
                disabled={isLoading}
              />

              <TextField
                fullWidth
                label="Підтвердження пароля"
                name="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"} 
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.default,
                  },
                }}
                size={isMobile ? "small" : "medium"}
                slotProps={{
                input: {    
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    ),
                  },
                }}
                disabled={isLoading}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                {isLoading ? "Обробка..." : "Скинути пароль"}
              </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2">
                Повернутися до{" "}
                <Link 
                    to={ROUTE.LOGIN}
                    style={{ 
                  color: theme.palette.secondary.main, 
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.8rem' : '1.1rem'
                }}>
                    входу
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}