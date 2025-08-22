import { List, Datagrid, TextField, BooleanField, ReferenceField, EditButton } from "react-admin";

export const AnswerOptionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <ReferenceField source="questionId" reference="questions" label="Вопрос">
        <TextField source="text" />
      </ReferenceField>
      <TextField source="text" label="Текст ответа" />
      <BooleanField source="isCorrect" label="Правильный" />
      <EditButton />
    </Datagrid>
  </List>
);