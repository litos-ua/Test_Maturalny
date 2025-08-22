
import { Box, Typography, Avatar, Chip, Divider } from "@mui/material";
// import { useTheme } from "@mui/material";
import { useAuth } from "../../context";
import { Email, Person, Phone, Home, VerifiedUser, Lock } from "@mui/icons-material";
import { getAvatarByRole } from "../../utils/avatarUtils";
import type { UserRole } from "../../types";
import * as styles from "./ProfileStyles";

export function ProfilePage() {
  const { userData, userOption } = useAuth();
//   const theme = useTheme();

  if (!userData) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Box sx={styles.pageWrapper}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={styles.sectionTitle}>
          Профіль користувача
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={styles.avatar}
            src={getAvatarByRole(userData.role as UserRole)}
          >
            {userData.username.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">{userData.username}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Chip
                label={userData.role}
                size="small"
                icon={<VerifiedUser fontSize="small" />}
                sx={{ mr: 1 }}
              />
              {userData.isLocked && (
                <Chip
                  label="Заблоковано"
                  color="error"
                  size="small"
                  icon={<Lock fontSize="small" />}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <InfoItem icon={<Person />} label="Ім'я" value={userData.fullname || "Не вказано"} />
          <InfoItem icon={<Email />} label="Email" value={userData.email} />
          <InfoItem icon={<Phone />} label="Телефон" value={userData.phoneNumber || "Не вказано"} />
          <InfoItem icon={<Home />} label="Адреса" value={userData.address || "Не вказано"} />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mt: 3 }}>
          Налаштування користувача
        </Typography>

        {userOption ? (
          <Box>
            <InfoItem icon={"🎨"} label="Тема" value={userOption.theme} />
            <InfoItem icon={"🌐"} label="Мова" value={userOption.language} />
            <InfoItem
              icon={"⭐"}
              label="Середній бал"
              value={userOption.averageScore.toFixed(2)}
            />
            {userOption.adminMessage && (
              <InfoItem
                icon={"📢"}
                label="Повідомлення від адміністратора"
                value={userOption.adminMessage}
              />
            )}
          </Box>
        ) : (
          <Typography>Налаштування не знайдено</Typography>
        )}




        </Box>
      </Box>
    </Box>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={styles.infoItem}>
      <Box sx={styles.infoIcon}>{icon}</Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
}
