// import { List, Datagrid, TextField, NumberField, ReferenceField, EditButton } from "react-admin";

// export const QuestionList = () => (
//   <List>
//     <Datagrid rowClick="edit" expand={<QuestionShow />}>
//       <TextField source="id" label="ID" />
//       <TextField source="text" label="Текст вопроса" />
//       <ReferenceField source="topicId" reference="topics" label="Тема">
//         <TextField source="title" />
//       </ReferenceField>
//       <NumberField source="maxScore" label="Макс. балл" />
//       <EditButton />
//     </Datagrid>
//   </List>
// );

// const QuestionShow = () => (
//   <div style={{ padding: '20px' }}>
//     <h4>Варианты ответов:</h4>
//     <ul>
//       <li>Вариант 1 (правильный)</li>
//       <li>Вариант 2</li>
//     </ul>
//   </div>
// );


// // Работает с фильтрацией вопросов в соответствии с дисциплиной, но список тем не зависит от дисциплини
// import {
//   List,
//   Datagrid,
//   TextField,
//   NumberField,
//   ReferenceField,
//   EditButton,
//   ReferenceInput,
//   SelectInput,
//   Filter
// } from "react-admin";

// // фильтры
// const QuestionFilters = [
//   <ReferenceInput source="disciplineId" reference="disciplines" label="Дисциплина">
//     <SelectInput optionText="name" />
//   </ReferenceInput>,
//   <ReferenceInput source="topicId" reference="topics" label="Тема">
//     <SelectInput optionText="title" />
//   </ReferenceInput>
// ];

// export const QuestionList = () => (
//   <List filters={QuestionFilters}>
//     <Datagrid rowClick="edit" expand={<QuestionShow />}>
//       <TextField source="id" label="ID" />
//       <TextField source="text" label="Текст вопроса" />
//       <ReferenceField source="topicId" reference="topics" label="Тема">
//         <TextField source="title" />
//       </ReferenceField>
//       <NumberField source="maxScore" label="Макс. балл" />
//       <EditButton />
//     </Datagrid>
//   </List>
// );

// const QuestionShow = () => (
//   <div style={{ padding: "20px" }}>
//     <h4>Варианты ответов:</h4>
//     <ul>
//       <li>Вариант 1 (правильный)</li>
//       <li>Вариант 2</li>
//     </ul>
//   </div>
// );

// Работает с фильтрацией вопросов в соответствии с дисциплиной, список тем зависит от дисциплини
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  EditButton,
  ReferenceInput,
  SelectInput,
  Filter,
  useListContext,
} from "react-admin";

// Фильтры
const QuestionFilter = (props: any) => {
  const { filterValues } = useListContext();

  return (
    <Filter {...props}>
      {/* Фильтр по дисциплине */}
      <ReferenceInput source="disciplineId" reference="disciplines" label="Дисциплина" alwaysOn>
        <SelectInput optionText="name" />
      </ReferenceInput>

      {/* Фильтр по теме, зависит от выбранной дисциплины */}
      <ReferenceInput
        source="topicId"
        reference="topics"
        label="Тема"
        filter={filterValues.disciplineId ? { disciplineId: filterValues.disciplineId } : {}}
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
    </Filter>
  );
};

// Список вопросов
export const QuestionList = () => (
  <List filters={<QuestionFilter />} perPage={10}>
    <Datagrid rowClick="edit" expand={<QuestionShow />}>
      <TextField source="id" label="ID" />
      <TextField source="text" label="Текст вопроса" />

      <ReferenceField source="topicId" reference="topics" label="Тема">
        <TextField source="title" />
      </ReferenceField>

      <NumberField source="maxScore" label="Макс. балл" />
      <EditButton />
    </Datagrid>
  </List>
);

// Раскрытая часть строки с вариантами ответов
const QuestionShow = () => (
  <div style={{ padding: "20px" }}>
    <h4>Варианты ответов:</h4>
    <ul>
      <li>Вариант 1 (правильный)</li>
      <li>Вариант 2</li>
    </ul>
  </div>
);
