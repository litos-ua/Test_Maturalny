// Адаптация для всех типов устройств
import { 
  Box, 
  Typography, 
  Avatar, 
  Chip, 
  Divider, 
  Grid,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import { 
  Email, 
  Person, 
  Phone, 
  Home, 
  VerifiedUser, 
  Lock,
  Palette,
  Language,
  Star,
  Campaign
} from "@mui/icons-material";
import { useAuth } from "../../context";
import { getAvatarByRole } from "../../utils/avatarUtils";
import type { UserRole } from "../../types";
import * as styles from "./ProfileStyles";

export function ProfilePage() {
  const { userData, userOption } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  

  if (!userData) {
    return (
      <Box sx={styles.pageWrapper}>
        <Typography variant="h6" textAlign="center">
          Завантаження профілю...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageWrapper}>
      <Box sx={{
        ...(styles.container as any)(theme), // ← ЯВНОЕ ПРЕОБРАЗОВАНИЕ ТИПА
        maxWidth: { xs: '95%', sm: '90%', md: 800, lg: 1000 },
        p: { xs: 3, sm: 3, md: 4 },
        mx: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={styles.sectionTitleAdaptive}
        >
          Профіль користувача
        </Typography>

        {/* Заголовок с аватаром */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          mb: { xs: 2, md: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' },
          gap: { xs: 2, sm: 3 }
        }}>
          <Avatar
            sx={styles.avatarAdaptive}
            src={getAvatarByRole(userData.role as UserRole)}
          >
            {userData.username.charAt(0)}
          </Avatar>
          <Box>
            <Typography 
              variant={isMobile ? "h6" : "h5"}
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                color: 'inherit'
              }}
            >
              {userData.username}
            </Typography>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              mt: 1,
              justifyContent: { xs: 'center', sm: 'flex-start' },
              flexWrap: 'wrap',
              gap: 1
            }}>
              <Chip
                label={userData.role}
                size="small"
                icon={<VerifiedUser fontSize="small" />}
                sx={{ 
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  height: { xs: 24, sm: 32 },
                  color: 'inherit'
                }}
              />
              {userData.isLocked && (
                <Chip
                  label="Заблоковано"
                  color="error"
                  size="small"
                  icon={<Lock fontSize="small" />}
                  sx={{ 
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    height: { xs: 24, sm: 32 }
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ 
          my: { xs: 2, md: 3 },
          borderColor: 'divider'
        }} />

        {/* Основная информация */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size = {{ xs:12, md:6}}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                color: 'inherit'
              }}
            >
              Основна інформація
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <InfoItem 
                icon={<Person />} 
                label="Ім'я" 
                value={userData.fullname || "Не вказано"} 
              />
              <InfoItem 
                icon={<Email />} 
                label="Email" 
                value={userData.email} 
              />
              <InfoItem 
                icon={<Phone />} 
                label="Телефон" 
                value={userData.phoneNumber || "Не вказано"} 
              />
              <InfoItem 
                icon={<Home />} 
                label="Адреса" 
                value={userData.address || "Не вказано"} 
              />
            </Box>
          </Grid>

          <Grid size = {{ xs:12, md:6}}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                color: 'inherit'
              }}
            >
              Налаштування користувача
            </Typography>

            {userOption ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InfoItem 
                  icon={<Palette />} 
                  label="Тема" 
                  value={userOption.theme} 
                />
                <InfoItem 
                  icon={<Language />} 
                  label="Мова" 
                  value={userOption.language} 
                />
                <InfoItem 
                  icon={<Star />} 
                  label="Середній бал" 
                  value={userOption.averageScore.toFixed(2)} 
                />
                {userOption.adminMessage && (
                  <InfoItem 
                    icon={<Campaign />} 
                    label="Повідомлення від адміністратора" 
                    value={userOption.adminMessage} 
                  />
                )}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Налаштування не знайдено
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Сообщение администратора (полная ширина) */}
        {userOption?.adminMessage && (
          <>
            <Divider sx={{ 
              my: { xs: 2, md: 3 },
              borderColor: 'divider'
            }} />
            <Box sx={{ 
              bgcolor: 'warning.light', 
              p: { xs: 2, md: 3 }, 
              borderRadius: 2,
              mt: { xs: 2, md: 3 }
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 1,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: 'warning.contrastText'
                }}
              >
                <Campaign /> Важливе повідомлення
              </Typography>
              <Typography variant="body2" color="warning.contrastText">
                {userOption.adminMessage}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      </Box>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      mb: 2,
      p: 2,
      borderRadius: 2,
      bgcolor: 'rgba(255,255,255,0.1)' // ← легкий фон для каждого элемента
    } as any}>
      <Box sx={{ color: 'text.secondary', mr: 2 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
}