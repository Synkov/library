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
           'footer': []
       }
   }

   componentDidMount() {

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

       axios.get('http://127.0.0.1:8000/api/users/')
           .then(response => {
               const users = response.data.results
                   this.setState(
                   {
                       'users': users,
                       'menuItems': menuItems,
                       'footer': FooterComponent,
                   }
               );
           }).catch(error => console.log(error));


       axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => console.log(error))
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
                       </div>
                       <div class="content">
                           <Routes>
                               <Route exact path='/' element={<UserList users={this.state.users} />} />
                               <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                               <Route exact path='/todo' element={<ToDoList todos={this.state.todos} />} />
                               <Route path="/users" element={<Navigate replace to="/" />} />
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