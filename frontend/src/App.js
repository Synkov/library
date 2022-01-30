import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js';
import FooterComponent from './components/Footer.js';
import MenuList from './components/Menu.js';
import ProjectList from './components/Projects.js';
import ToDoList from './components/ToDo.js';
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

        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ users: [] })
            })

        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({ projects: [] })
            })

        axios.get('http://127.0.0.1:8000/api/todo/', { headers })
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
            username: username,
            password: password
        })
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

    render () {
       return (
           <div class="container">
               <div class="block">
                   <BrowserRouter>
                       <div class="sidenav">
                           <div>
                               <MenuList menuItems={this.state.menuItems} />

                           </div>
                           <div>
                               {this.is_authenticated() ?
                                   <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                           </div>
                       </div>
                       <div class="content">
                           <Routes>
                               <Route exact path='/' element={<UserList users={this.state.users} />} />
                               <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                               <Route exact path='/todo' element={<ToDoList todos={this.state.todos} />} />
                               <Route path="/users" element={<Navigate replace to="/" />} />
                               <Route exact path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                               <Route path='*' element={<NotFound404 />} />
                           </Routes>
                       </div>
                   </BrowserRouter>
               </div>
               <div class="footer">
                   <FooterComponent footerComponent={this.state.footerComponent} />
               </div>
           </div>
       )
    }
}


export default App;