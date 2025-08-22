import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string()
    .max(50, "Максимум 50 символів")
    .required("Логін обов'язковий"),
  email: Yup.string()
    .email("Невірний формат email")
    .max(100, "Максимум 100 символів")
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Пароль обов'язковий"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Паролі не співпадають")
    .required("Підтвердження пароля обов'язкове"),
  fullname: Yup.string().max(100, "Максимум 100 символів"),
  address: Yup.string().max(200, "Максимум 200 символів"),
  phoneNumber: Yup.string()
    .max(20, "Максимум 20 символів")
    .nullable(),
  agree: Yup.boolean()
    .oneOf([true], "Необхідно погодитися з умовами"),
});
