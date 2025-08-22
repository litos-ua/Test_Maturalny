import { List, Datagrid, TextField, EditButton } from "react-admin";

export const DisciplineList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название дисциплины" />
      <EditButton />
    </Datagrid>
  </List>
);