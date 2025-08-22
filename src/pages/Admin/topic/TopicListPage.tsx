import { List, Datagrid, TextField, ReferenceField, NumberField, EditButton } from "react-admin";

export const TopicList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название темы" />
      <ReferenceField 
        source="disciplineId" 
        reference="disciplines" 
        label="Дисциплина"
      >
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="level" label="Уровень сложности" />
      <EditButton />
    </Datagrid>
  </List>
);