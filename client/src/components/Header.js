import React,{Component} from 'react';
import {Link,NavLink} from 'react-router-dom';
import './styling/Header.css';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';


class Header extends Component {
  render(){
  return (
    <div className="headerMenu">
      <ul>
      <li><NavLink exact to='/'>Home</NavLink></li>
      <li><NavLink to='/login-page'>Login</NavLink></li>
      {this.props.isAuthenticated ?
      <li><a onClick={this.handleLogoutClick} href='#'>Logout</a></li> : null}
      </ul>
    </div>
  )};
}

export default Header;
