import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js';
import FooterComponent from './components/Footer.js';
import MenuList from './components/Menu.js';
import './style.css';



class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'menuItems': [],
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
                'title': 'Настройки',
                'url': '/settings'
            },
       ]

       axios.get('http://127.0.0.1:8000/api/users')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users,
                       'menuItems': menuItems,
                   }
               );
           }).catch(error => console.log(error));

       // this.setState({
       //     'users': this.state.users,
       //     'menu': [
       //         {
       //             'title': 'главная',
       //             'url': 'http://localhost:8000/'
       //         }
       //     ]
       // });
   }

   render () {
       return (
           <div class="container">
               <div class="block">
                   <div class="sidenav">
                       <div>
                           <MenuList menuItems={this.state.menuItems} />
                       </div>
                   </div>
                   <div class="content">
                       <div>
                           <UserList users={this.state.users} />
                       </div>
                   </div>
               </div>
               <div class="footer">
                   <FooterComponent footerComponent={this.state.footerComponent} />
               </div>
           </div>
       )
   }
}


export default App;