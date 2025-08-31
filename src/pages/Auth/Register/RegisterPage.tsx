
import { 
  Box, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  TextField, 
  Paper, 
  Typography, 
  InputAdornment, 
  IconButton,
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "./registerSchema";
import { authService } from "../../../services";
import { RotatingImage } from "../../../components";
import { TeacherImages } from "../../../constants";
import * as styles from "../authStyles";
import { useState } from "react";
import type { RegisterUserDto } from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function RegisterPage() {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        navigate(ROUTE.HOME);
      } catch (err: any) {
        setSubmitError(err.message || "Помилка реєстрації.");
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
    <Box sx={{
      ...styles.pageContainer,
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      minHeight: '100vh',
      py: '5vh',
      backgroundColor: (theme) => theme.palette.primary.light,
    }}>
      {/* Левая часть с изображением и заголовком */}
      <Box sx={{
        width: { xs: '100%', md: '50%' }, 
        pt: { xs: "1vh", md: "2vh" },
        pl: { xs: "5vw", md: "10vw" },
        pr: { xs: "5vw", md: 0 }, 
        textAlign: { xs: "center", md: "left" }
      }}>
        <Typography sx={{ 
          ...styles.headline, 
          mb: { xs: "3vh", md: "5vh" },
          fontSize: { xs: "1.5rem", md: "2rem" },
          background: "linear-gradient(45deg, hsla(32, 86%, 48%, 1.00), rgba(206, 245, 66, 1))",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}>
          Отримайте доступ до безкоштовних відеокурсів та екзаменаційних завданнь!
        </Typography>

        <Box sx={{
          ...styles.imageContainer,
          display: { xs: "none", md: "flex" }
        }}>
          <RotatingImage images={TeacherImages}/>
        </Box>
      </Box>      
        
      {/* Правая форма */}
      <Box sx={{
        ...styles.formWrapper,
        width: { xs: '100%', md: '50%' }, 
        display: 'flex',
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.primary.light,
        justifyContent: 'center',
        py: { xs: 4, md: 0 } 
      }}>
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
            bgcolor: (theme) => theme.palette.primary.main // ← ФОН ВНУТРИ ФОРМЫ
          }}
        >
          <Typography variant="h5" sx={{
            ...styles.formTitle,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            mb: { xs: 2, md: 3 }
          }}>
            Реєстрація
          </Typography>

          {submitError && (
            <Typography color="error" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              {submitError}
            </Typography>
          )}
          {submitSuccess && (
            <Typography color="primary" sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              {submitSuccess}
            </Typography>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Логін"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{
                ...styles.inputField,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              size={isMobile ? "small" : "medium"}
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
              sx={{
                ...styles.inputField,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              label="Пароль"
              name="password"   
              type={showNewPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                ...styles.inputField,
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
            />

            <TextField
              fullWidth
              label="Підтвердження пароля"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} 
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              sx={{
                ...styles.inputField,
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
            />

            <TextField
              fullWidth
              label="Повне ім'я (необов'язково)"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              sx={{
                ...styles.inputField,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              label="Адреса (необов'язково)"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              sx={{
                ...styles.inputField,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              size={isMobile ? "small" : "medium"}
            />

            <TextField
              fullWidth
              label="Телефон (необов'язково)"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              sx={{
                ...styles.inputField,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              size={isMobile ? "small" : "medium"}
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
                <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
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
              <Typography color="error" variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                {formik.errors.agree}
              </Typography>
            )}
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
                  fontSize: { xs: "0.9rem", md: "1rem" },
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
                Зареєструватися
              </Button>
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                Вже маєте акаунт?{" "}
                <Link to={ROUTE.LOGIN} style={{ color: "#1976d2" }}>
                  Увійти
                </Link>
              </Typography>
              
              <Box sx={{ 
                mt: 1, 
                textAlign: "center"
              }}>
                <Link to={ROUTE.HOME} style={{ color: "#1976d2" }}>
                  На Головну
                </Link>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

