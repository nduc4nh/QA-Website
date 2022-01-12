import React from 'react'
import { List, Create, Edit, SimpleForm, TextInput, DateInput, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

export const PostList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <DateField source="publishedAt" />
                <EditButton basePath="/posts" />
                <DeleteButton basePath="/posts" />
            </Datagrid>
        </List>
    )
}

export const PostCreate = (props) => {
    return (
        <Create title='Create a Post' {...props}>
            <SimpleForm>
                <TextInput source='title' />
                <TextInput multiline source='body' />
                <DateInput label='Published' source='publishedAt' />
            </SimpleForm>
        </Create>
    )
}

export const PostEdit = (props) => {
    return (
        <Edit title='Edit Post' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='title' />
                <TextInput multiline source='body' />
                <DateInput label='Published' source='publishedAt' />
            </SimpleForm>
        </Edit>
    )
}