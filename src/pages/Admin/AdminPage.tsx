import { Admin, Resource } from "react-admin";
import dataProvider from "../../providers/dataProvider";
import {authProvider} from "../../providers/authProvider";
import { UsersList, UserEdit, UserCreate } from "../Admin/user";
import { DisciplineList, DisciplineEdit, DisciplineCreate } from "../Admin/discipline";
import { TopicList, TopicEdit, TopicCreate } from "../Admin/topic";
import { QuestionList, QuestionEdit, QuestionCreate } from "../Admin/question";
import { AnswerOptionList, AnswerOptionEdit, AnswerOptionCreate } from "../Admin/unsweroption";

export const AdminPage = () => (
  <Admin 
     basename="/admin"
    dataProvider={dataProvider} 
    authProvider={authProvider} 
  >
    <Resource
      name="users"
      list={UsersList}
      edit={UserEdit}
      create={UserCreate}
      // show={UserShow} // если нужен просмотр
    />
    <Resource
      name="disciplines"
      list={DisciplineList}
      edit={DisciplineEdit}
      create={DisciplineCreate}
    />
    <Resource
      name="topics"
      list={TopicList}
      edit={TopicEdit}
      create={TopicCreate}
    />
    <Resource
      name="questions"
      list={QuestionList}
      edit={QuestionEdit}
      create={QuestionCreate}
    />

    <Resource
      name="answer-options"
      list={AnswerOptionList}
      edit={AnswerOptionEdit}
      create={AnswerOptionCreate}
    />
  </Admin>
);

export default AdminPage;