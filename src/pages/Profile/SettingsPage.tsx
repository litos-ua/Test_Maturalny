
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Alert, Stack } from "@mui/material";
import { useAuth } from "../../context";
import { useFormik } from "formik";
import * as yup from "yup";
import type { UserRole } from "../../types";
import * as styles from "./ProfileStyles";

const validationSchema = yup.object({
  username: yup.string().required("Обов'язкове поле"),
  email: yup.string().email("Невірний email").required("Обов'язкове поле"),
  fullname: yup.string(),
  phoneNumber: yup.string(),
  address: yup.string(),
  theme: yup.string().required("Обов'язкове поле"),
  language: yup.string().required("Обов'язкове поле"),
  questionPreferencesJson: yup.string(),
});

export function ProfileSettingsPage() {
  const { userData, userOption, updateUserData, fetchUserOption, updateUserOption } = useAuth();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userData?.id && !userOption) {
      fetchUserOption();
    }
  }, [userData, userOption, fetchUserOption]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userData?.username || "",
      email: userData?.email || "",
      fullname: userData?.fullname || "",
      phoneNumber: userData?.phoneNumber || "",
      address: userData?.address || "",
      theme: userOption?.theme || "light",
      language: userOption?.language || "uk",
      questionPreferencesJson: userOption?.questionPreferencesJson || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!userData || !userOption) return;

      try {
        // Обновляем User
        await updateUserData({
          id: userData.id,
          username: values.username,
          email: values.email,
          fullname: values.fullname,
          phoneNumber: values.phoneNumber,
          address: values.address,
          role: userData.role as UserRole,
          emailVerified: userData.emailVerified,
          isLocked: userData.isLocked,
        });

        // Обновляем UserOption
        await updateUserOption({
          id: userOption.id,
          userId: userData.id,
          theme: values.theme,
          language: values.language,
          questionPreferencesJson: values.questionPreferencesJson,
          adminMessage: userOption.adminMessage || "",
          averageScore: userOption.averageScore,
        });

        setSuccess(true);
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
  });

  if (!userData) {
    return <Typography>Loading settings...</Typography>;
  }

  return (
    <Box sx={styles.pageWrapper}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={styles.sectionTitle}>
          Налаштування профілю
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Дані успішно оновлено!
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Ім'я користувача"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              InputProps={{
                readOnly: true,
              }}
              // onChange={formik.handleChange}
              // error={formik.touched.email && Boolean(formik.errors.email)}
              // helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              label="Повне ім'я"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Телефон"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Адреса"
              name="address"
              multiline
              rows={2}
              value={formik.values.address}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Тема (light/dark)"
              name="theme"
              value={formik.values.theme}
              onChange={formik.handleChange}
              error={formik.touched.theme && Boolean(formik.errors.theme)}
              helperText={formik.touched.theme && formik.errors.theme}
            />

            <TextField
              fullWidth
              label="Мова (uk/en)"
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              error={formik.touched.language && Boolean(formik.errors.language)}
              helperText={formik.touched.language && formik.errors.language}
            />

            {/* <TextField
              fullWidth
              label="Налаштування питань (JSON)"
              name="questionPreferencesJson"
              multiline
              rows={2}
              value={formik.values.questionPreferencesJson}
              onChange={formik.handleChange}
            /> */}

            <TextField
              fullWidth
              label="Повідомлення від адміністрації"
              name="adminMessage"
              value={userOption?.adminMessage || ""}
              InputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              label="Середній бал"
              name="averageScore"
              value={userOption?.averageScore ?? 0}
              InputProps={{ readOnly: true }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={formik.isSubmitting}
                sx={styles.submitButton}
              >
                Зберегти зміни
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
