// import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator, BooleanInput, required } from "react-admin";
// import { QuestionType, DifficultyOfQuestion } from "../../../types";

// const questionTypeChoices = Object.entries(QuestionType).map(([key, value]) => ({
//   id: value,
//   name: key,
// }));

// const difficultyChoices = Object.entries(DifficultyOfQuestion).map(([key, value]) => ({
//   id: value,
//   name: key,
// }));

// export const QuestionEdit = () => (
//   <Edit>
//     <SimpleForm>
//       <TextInput source="text" label="Текст вопроса" validate={[required()]} fullWidth />
//       <TextInput source="imageUrl" label="URL изображения" fullWidth />
//       <ReferenceInput source="topicId" reference="topics" label="Тема">
//         <SelectInput optionText="title" validate={[required()]} />
//       </ReferenceInput>
//       <SelectInput source="type" label="Тип вопроса" choices={questionTypeChoices} validate={[required()]} />
//       <NumberInput source="maxScore" label="Макс. балл" min={0} step={0.5} validate={[required()]} />
//       <SelectInput source="difficulty" label="Сложность" choices={difficultyChoices} validate={[required()]} />
      
//       <ArrayInput source="options" label="Варианты ответов">
//         <SimpleFormIterator>
//           <TextInput source="text" label="Текст" validate={[required()]} />
//           <BooleanInput source="isCorrect" label="Правильный?" />
//           <TextInput source="explanation" label="Объяснение" />
//           <TextInput source="groupKey" label="Группа (для сопоставления)" />
//           <TextInput source="matchLabel" label="Метка сопоставления" />
//         </SimpleFormIterator>
//       </ArrayInput>
//     </SimpleForm>
//   </Edit>
// );


import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  required,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { QuestionType, DifficultyOfQuestion } from "../../../types";

const questionTypeChoices = Object.entries(QuestionType).map(([key, value]) => ({
  id: value,
  name: key,
}));

const difficultyChoices = Object.entries(DifficultyOfQuestion).map(([key, value]) => ({
  id: value,
  name: key,
}));

// Зависимый выбор темы
const TopicInput = () => {
  const disciplineId = useWatch({ name: "disciplineId" });

  return (
    <ReferenceInput
      source="topicId"
      reference="topics"
      label="Тема"
      filter={disciplineId ? { disciplineId } : {}}
    >
      <SelectInput optionText="title" validate={[required()]} />
    </ReferenceInput>
  );
};

export const QuestionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="text" label="Текст вопроса" validate={[required()]} fullWidth />
      <TextInput source="imageUrl" label="URL изображения" fullWidth />

      {/* Сначала дисциплина */}
      <ReferenceInput source="disciplineId" reference="disciplines" label="Дисциплина">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>

      {/* Потом темы этой дисциплины */}
      <TopicInput />

      <SelectInput source="type" label="Тип вопроса" choices={questionTypeChoices} validate={[required()]} />
      <NumberInput source="maxScore" label="Макс. балл" min={0} step={0.5} validate={[required()]} />
      <SelectInput source="difficulty" label="Сложность" choices={difficultyChoices} validate={[required()]} />

      <ArrayInput source="options" label="Варианты ответов">
        <SimpleFormIterator>
          <TextInput source="text" label="Текст" validate={[required()]} />
          <BooleanInput source="isCorrect" label="Правильный?" />
          <TextInput source="explanation" label="Объяснение" />
          <TextInput source="groupKey" label="Группа (для сопоставления)" />
          <TextInput source="matchLabel" label="Метка сопоставления" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
