import React, { Component } from 'react';
import Register from './Register.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuthenticationHeader } from './utils/authentication.js'
import './styling/login.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmitLogin = () => (
    fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
  })
      .then(response =>
        response.json()).then(json=>{
          if (json.status === 200) {
          console.log(json)
          let token = json.token
          let username = json.username
          let userid = json.id
          localStorage.setItem('userid', userid)
          localStorage.setItem('jsonwebtoken', token)
          this.props.onAuthenticated(username, token)
          this.props.history.push('/')

          setAuthenticationHeader(token)
        } else if (json.status === 500) {
          alert(json.message)
        }
      }).catch((error)=>{
        console.log(error)
      })
  )

  handleInputChange = (e) => (

    this.setState({
      [e.target.name]: e.target.value
    })
  )



  render() {
    return (
      <div className="loginBody">
        <h1>Login</h1>
        <input onChange={this.handleInputChange} name="username" placeholder="username"></input>
        <input onChange={this.handleInputChange} name="password" placeholder="password"></input>
        <button onClick={this.handleSubmitLogin}>Login</button>
        <Register />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    uname: state.username
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticated: (username, token) => dispatch({ type: 'ON_AUTH', username: username, token: token })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
