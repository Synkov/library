import React from 'react'
import { Link } from 'react-router-dom'


const ToDoItem = ({ todo, deleteToDo }) => {
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
            <td><button onClick={() => deleteToDo(todo.uuid)} type='button'>Delete</button></td>
        </tr>
    )
}


const ToDoList = ({ todos, deleteToDo }) => {
    return (
        <div>
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
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}


export default ToDoList