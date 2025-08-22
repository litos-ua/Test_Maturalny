import { Create, SimpleForm, TextInput, required } from "react-admin";

export const DisciplineCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="name" 
        label="Название дисциплины" 
        validate={[required()]} 
        fullWidth 
      />
    </SimpleForm>
  </Create>
);