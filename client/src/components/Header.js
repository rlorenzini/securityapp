import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styling/Header.css';
import './styling/navbar.css';


class Header extends Component {
  handleLogoutClick = () => {
    localStorage.removeItem('jsonwebtoken')
    this.props.onLogout()
    this.props.history.push('/login-page')
  }
  render() {
    return (
      <div className="headerMenu">
      <NavLink to='/'>
        <p className="websiteTitle">Last Call</p>
        </NavLink>
          <div className="dropdown">
            <button className="dropbtn">
            <p className="websiteTitle">Menu</p><i className="fa fa-caret-down"></i></button>
                <div className="dropdown-content">
                  {this.props.isAuthenticated ? <NavLink to='/userMovies'>Whats Leaving</NavLink> : <NavLink to='/exampleMovies'>Whats Leaving</NavLink>}
                  {this.props.isAuthenticated ? <NavLink to="/user-watchList">My Watch List</NavLink> : <NavLink to='/example-watchList'>Watch List</NavLink>}
                  {this.props.isAuthenticated ? <NavLink to="#" onClick={this.handleLogoutClick}>Logout</NavLink> : <NavLink to='/login-page'>Login</NavLink>}

                </div>
          </div>

      </div>
    )
  };
}

export default Header;
