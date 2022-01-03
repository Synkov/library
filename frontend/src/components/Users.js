import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr class="table">
            <td>
                {user.username}
            </td>
            <td>
               <p> {user.first_name}</p>
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table class="table">
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                email
            </th>
            {users.map((user) => <UserItem user = {user}/>)}
        </table>
    )
}


export default UserList;