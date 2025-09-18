import { SimpleForm, TextInput, SelectInput, Create, PasswordInput } from "react-admin";
import { UserRoles } from "../../../types";

// Преобразуем UserRoles в массив для SelectInput
const roleChoices = Object.entries(UserRoles)
  .filter(([key]) => isNaN(Number(key))) 
  .map(([key, value]) => ({
    id: value,
    name: key, // "Guest", "Student"...
  }));


const roleChoicesWithLabels = [
  { id: UserRoles.Guest, name: "Гость" },
  { id: UserRoles.Student, name: "Студент" },
  { id: UserRoles.Teacher, name: "Преподаватель" },
  { id: UserRoles.Admin, name: "Администратор" },
];

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" label="Логин" required />
      <TextInput source="email" label="Email" required />
      <PasswordInput source="password" label="Пароль" required />
      <TextInput source="fullname" label="ФИО" />
      <TextInput source="phoneNumber" label="Телефон" />
      <TextInput source="address" label="Адрес" />
      <SelectInput 
        source="role" 
        label="Роль" 
        choices={roleChoices} 
        optionText="name" 
        optionValue="id" 
        defaultValue={UserRoles.Student} 
      />
    </SimpleForm>
  </Create>
);