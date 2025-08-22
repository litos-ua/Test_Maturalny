import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, NumberInput, required } from "react-admin";

export const TopicCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="title" 
        label="Название темы" 
        validate={[required()]} 
        fullWidth 
      />
      <TextInput 
        source="description" 
        label="Описание" 
        multiline 
        fullWidth 
      />
      <ReferenceInput 
        source="disciplineId" 
        reference="disciplines" 
        label="Дисциплина"
      >
        <SelectInput 
          optionText="name" 
          validate={[required()]}  
        />
      </ReferenceInput>
      <NumberInput 
        source="level" 
        label="Уровень сложности" 
        validate={[required()]} 
        min={0} 
        max={1} 
      />
    </SimpleForm>
  </Create>
);