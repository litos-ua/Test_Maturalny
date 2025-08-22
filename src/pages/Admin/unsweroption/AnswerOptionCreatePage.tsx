import { Create, SimpleForm, TextInput, BooleanInput, ReferenceInput, SelectInput, required } from "react-admin";

export const AnswerOptionCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="QuestionId" reference="questions" label="Вопрос">
        <SelectInput optionText="text" validate={[required()]} />
      </ReferenceInput>
      <TextInput source="Text" label="Текст ответа" validate={[required()]} fullWidth />
      <BooleanInput source="IsCorrect" label="Правильный ответ" />
      <TextInput source="Explanation" label="Объяснение" fullWidth />
      <TextInput source="GroupKey" label="Группа (для сопоставления)" />
      <TextInput source="MatchLabel" label="Метка сопоставления" />
    </SimpleForm>
  </Create>
);