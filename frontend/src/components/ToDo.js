import React from 'react'


const ToDoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.create}
            </td>
            <td>
                {todo.update}
            </td>
            <td>
                {todo.is_active}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.creator}
            </td>
        </tr>
    )
}


const ToDoList = ({ todos }) => {
    return (
        <table>
            <th>
                Text
            </th>
            <th>
                Create
            </th>
            <th>
                Update
            </th>
            <th>
                Active
            </th>
            <th>
                Project
            </th>
            <th>
                Creator
            </th>
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}


export default ToDoList