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
      </ul>
    </div>
  )};
}

export default Header;
