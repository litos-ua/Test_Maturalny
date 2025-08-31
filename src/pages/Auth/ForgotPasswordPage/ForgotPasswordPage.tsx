
import { Box, Button, TextField, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";
import { useState } from "react";
import { authService } from "../../../services";
import { Link, useNavigate } from "react-router-dom";
import * as styles from "../authStyles";
import { ROUTE } from "../../../router";
import { storage } from "../../../utils";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitSuccess("");
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      
      if (response && response.success && response.resetToken) {
        setSubmitSuccess("Інструкція зі скидання пароля надіслана на вашу email адресу");
        storage.set('resetEmail', email);
        navigate(`${ROUTE.RESETPASSWORD.replace(':token', response.resetToken)}`);
      } else {
        setSubmitError(response?.message || "Не вдалося відправити запит на скидання");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Помилка при відправці запиту");
    } finally {
      setIsLoading(false);
    }
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
        backgroundColor: (theme) => 
        theme.palette.mode === "light"
          ? "rgba(255,255,255,0.9)"  
          : "rgba(30,30,30,0.9)",    
          p: { xs: 2, md: 4 }
      }}
    >
      {/* Заголовок сверху */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: { xs: 0, md: 0, lg: 1, xl: 1 }
        }}
      >
        <Typography
          sx={{
            ...styles.headline,
            mb: { 
              xs: 1,    
              sm: 1,  
              md: 1,    
              lg: 1.5,  
              xl: 2    
            },
            fontSize: { 
              xs: "1.8rem", 
              sm: "2rem",
              md: "2.2rem", 
              lg: "2.5rem",
              xl: "2.8rem"
            },
            background:
              "linear-gradient(45deg, hsla(32, 86%, 48%, 1.00), rgba(206, 245, 66, 1))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontWeight: "bold",
            lineHeight: 1.2
          }}
        >
          Відновлення пароля
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: "white", 
            fontSize: { xs: "1rem", md: "1.2rem" },
            opacity: 0.9
          }}
        >
          Введіть вашу email адресу для відновлення пароля
        </Typography>
      </Box>

      {/* Форма на отдельной плите */}
      <Box
        sx={{
          ...styles.formWrapper,
          width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' }, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, md: 6 } 
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
            bgcolor: (theme) => theme.palette.primary.main
          }}
        >
          <Typography
            variant="h5"
            sx={{
              ...styles.formTitle,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              mb: { xs: 3, md: 4 },
              textAlign: "center",
              color: theme.palette.primary.main
            }}
          >
            Введіть ваш Email
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

          {submitSuccess && (
            <Typography 
              color="primary" 
              sx={{ 
                mb: 3, 
                textAlign: "center",
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              {submitSuccess}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Email адреса"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              ...styles.inputField,
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: (theme) => 
                theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.9)"  // КАК ОБЩИЙ ФОН
                  : "rgba(30,30,30,0.9)",    // КАК ОБЩИЙ ФОН
                }
            }}
            size={isMobile ? "small" : "medium"}
            disabled={isLoading}
            placeholder="your@email.com"
          />
          <Button
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading || !email}
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
            {isLoading ? "Відправка..." : "Надіслати посилання"}
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: (theme) => theme.palette.text.primary
              }}
            >
              Повернутися до{" "}
              <Box 
                component={Link}
                to="/login" 
                sx={{ 
                  background: (theme) => theme.palette.gradients?.secondary, // Градиент из темы
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textDecoration: "none",
                  fontWeight: "bold",
                  '&:hover': {
                    opacity: 0.8,
                  }
                }}
              >
                сторінки входу
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Дополнительный декоративный элемент */}
      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "white", 
            opacity: 0.7,
            fontSize: { xs: "0.75rem", md: "0.85rem" }
          }}
        >
          Система безпеки вашого акаунту
        </Typography>
      </Box>
    </Box>
  );
}