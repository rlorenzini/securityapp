import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styling/Header.css';
// import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';


class Header extends Component {
  handleLogoutClick = () => {
    localStorage.removeItem('jsonwebtoken')
    this.props.onLogout()
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="headerMenu">
        <ul>
          <li><NavLink exact to='/'>Home</NavLink></li>
          {this.props.isAuthenticated ? <li><NavLink to='/userMovies'>Whats Leaving</NavLink></li> : <li><NavLink to='/exampleMovies'>Whats Leaving</NavLink></li>}
          {this.props.isAuthenticated ? <li><NavLink to="#" onClick={this.handleLogoutClick}>Logout</NavLink></li> : <li><NavLink to='/login-page'>Login</NavLink></li>}
          {this.props.isAuthenticated ? <li><NavLink to="/user-watchList">My Watch List</NavLink></li> : <li><NavLink to='/example-watchList'>Watch List</NavLink></li>}


        </ul>
      </div>
    )
  };
}

export default Header;
