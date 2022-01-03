import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js';
import FooterComponent from './components/Footer.js';
import MenuList from './components/Menu.js';



class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'menu': []
       }
   }

   componentDidMount() {

       axios.get('http://127.0.0.1:8000/api/users')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users,
                       'menu': this.state.menuItems
                   }
               )
           }).catch(error => console.log(error))

       this.setState({
           'users': this.state.users,
           'menu': [
               {
                   'title': 'главная',
                   'link': 'http://localhost:8000/'
               }
           ]
       });
   }

   render () {
       return (
           <div>
                <div>
                    <MenuList menuItems={this.state.menuItems} />
                </div>
                <div>
                    <UserList users={this.state.users} />
                </div>
                <div>
                    <FooterComponent footerComponent={this.state.footerComponent} />
                </div>
           </div>
       )
   }
}


export default App;