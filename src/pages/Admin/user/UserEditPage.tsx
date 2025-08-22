import { Edit, SimpleForm, TextInput, SelectInput } from "react-admin";
import { UserRoles, type UserRole } from "../../../types"; // Импортируем константу и тип

// Преобразуем UserRoles в массив для SelectInput
const roleChoices = Object.entries(UserRoles)
  .filter(([key]) => isNaN(Number(key))) // Игнорируем обратные числовые ключи (для TS)
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

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" label="Логин" disabled />
      <SelectInput 
        source="role" 
        label="Роль"
        choices={roleChoicesWithLabels} 
        optionText="name"
        optionValue="id"
      />
    </SimpleForm>
  </Edit>
);