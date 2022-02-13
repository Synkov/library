import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js';
import FooterComponent from './components/Footer.js';
import MenuList from './components/Menu.js';
import ProjectList from './components/Projects.js';
import ProjectForm from "./components/ProjectForm";
import ToDoList from './components/ToDo.js';
import ToDoForm from "./components/ToDoForm";
import {BrowserRouter, Route, Link, Routes, Navigate} from 'react-router-dom';
import './style.css';
import Cookies from 'universal-cookie';
import LoginForm from './components/Auth.js';



const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница не найдена</h1>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'menuItems': [],
           'projects': [],
           'todos': [],
           'footer': [],
           'token': '',
       }
    }

    load_data() {

       const menuItems = [
            {
                'title': 'Главная',
                'url': '/'
            },
           {
                'title': 'Проекты',
                'url': '/projects'
           },
           {
               'title': 'ToDo',
                'url': '/todo'
           }
       ]

       this.setState(
           {
                    'menuItems': menuItems,
                }
       )

       const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/v0.1/users/', { headers })
            .then(response => {
                // const users = response.data.results
                // this.setState(
                //     {
                //         'users': users,
                //     }
                    this.setState({users: response.data}
                )
            }).catch(error => {
                console.log(error)
                this.setState({ 'users': [] })
            })

        axios.get('http://127.0.0.1:8000/api/v0.1/projects/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ 'projects': [] })
            })

        axios.get('http://127.0.0.1:8000/api/v0.1/todo/', { headers })
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ todos: [] })
            })
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/v0.1/projects/${id}`, { headers })
            .then(response => {
                const projects = this.state.projects.filter((item) => item.id !== id)
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }

    createProject(name, repository, users) {
        const headers = this.get_headers()
        const data = { name, repository, users }

        axios.post(`http://127.0.0.1:8000/api/v0.1/projects/`, data, { headers })
            .then(response => {
                let new_project = response.data
                const user = this.state.users.filter((item) => item.id === new_project.user)[0]
                new_project.user = user
                this.setState(
                    {
                        projects: [...this.state.projects, new_project],
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }

    createToDo(text, project, creator) {
        const headers = this.get_headers()
        const data = { text, project, creator }
        console.log(data)

        axios.post(`http://127.0.0.1:8000/api/v0.1/todo/`, data, { headers })
            .then(response => {
                let new_ToDo = response.data
                const creator = this.state.users.filter((item) => item.id === new_ToDo.creator)[0]
                new_ToDo.creator = creator
                const project = this.state.projects.filter((item) => item.id === new_ToDo.project)[0]
                new_ToDo.project = project
                this.setState(
                    {
                        todos: [...this.state.todos, new_ToDo],
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }

    deleteToDo(id) {
        const headers = this.get_headers()

        axios.delete(`http://127.0.0.1:8000/api/v0.1/todo/${id}`, { headers })
            .then(response => {
                const todos = this.state.todos.filter((item) => item.id !== id)
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => {
                console.log(error)
            })
    }


    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({ 'token': token }, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username, password: password })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
   }


    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
    return (
        <div className="App">
          <BrowserRouter>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Users</Link>
                </li>
                <li>
                  <Link to='/books'>Books</Link>
                </li>
                <li>
                    {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                </li>
              </ul>
            </nav>
            <Routes>
                <Route exact path='/' element={<UserList users={this.state.users} />} />
                <Route exact path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>} />
                <Route exact path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, repository, users) => this.createProject(name, repository, users)} />} />
                <Route exact path='/todo' element={<ToDoList todos={this.state.todos} deleteToDo={(id) => this.deleteToDo(id)}/>} />
                <Route exact path='/todo/create' element={<ToDoForm users={this.state.users} projects={this.state.projects} createToDo={(text, project, creator) => this.createToDo(text, project, creator)} />} />
                <Route path="/users" element={<Navigate replace to="/" />} />
                <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
          </BrowserRouter>
          <div className="footer">
              <FooterComponent footerComponent={this.state.footerComponent}/>
          </div>
        </div>
    )
  }
}

export default App
