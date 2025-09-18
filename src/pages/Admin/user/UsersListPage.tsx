import { List, Datagrid, TextField, EmailField, BooleanField, SelectField } from "react-admin";
import { UserRoles } from "../../../types";

// 1. Тип для roleNames
const roleNames: Record<number, string> = {
  [UserRoles.Guest]: "Гость",
  [UserRoles.Student]: "Студент",
  [UserRoles.Teacher]: "Преподаватель",
  [UserRoles.Admin]: "Администратор",
};

// 2. Вариант с SelectField
export const UsersList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="username" label="Логин" />
      <EmailField source="email" label="Email" />
      
      <SelectField
        source="role"
        label="Роль"
        choices={Object.entries(roleNames).map(([id, name]) => ({
          id: Number(id),
          name,
        }))}
      />
      
      <BooleanField source="isLocked" label="Заблокирован" />
    </Datagrid>
  </List>
);