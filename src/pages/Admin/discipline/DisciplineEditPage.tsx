import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const DisciplineEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput 
        source="name" 
        label="Название дисциплины" 
        validate={[required()]} 
        fullWidth 
      />
    </SimpleForm>
  </Edit>
);