import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Пароль обов'язковий"),
});
