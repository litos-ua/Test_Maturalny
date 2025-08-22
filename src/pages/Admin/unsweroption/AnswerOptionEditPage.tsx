import { Edit, SimpleForm, TextInput, BooleanInput, ReferenceInput, SelectInput, required } from "react-admin";

export const AnswerOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="questionId" reference="questions" label="Вопрос">
        <SelectInput optionText="text" validate={[required()]} />
      </ReferenceInput>
      <TextInput source="text" label="Текст ответа" validate={[required()]} fullWidth />
      <BooleanInput source="isCorrect" label="Правильный ответ" />
      <TextInput source="explanation" label="Объяснение" fullWidth />
      <TextInput source="groupKey" label="Группа (для сопоставления)" />
      <TextInput source="matchLabel" label="Метка сопоставления" />
    </SimpleForm>
  </Edit>
);