import React from 'react'
import { Admin, Resource } from 'react-admin'
// import restProvider from 'ra-data-simple-rest'
import { authProvider } from "./components/authProvider";
import { PostList, PostEdit, PostCreate} from './components/Post';
import { UserList, UserEdit, UserCreate} from './components/User';


function Admin()  {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
      <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
    </Admin>
  );
}

export default Admin;