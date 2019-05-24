import React, { Component } from 'react';
import Register from './Register.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuthenticationHeader } from './utils/authentication.js'
import store from '../components/stores/store'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmitLogin = () => (
    axios.post('http://localhost:8080/login', {
      username: this.state.username,
      password: this.state.password,
    })
      .then(response => {
        let token = response.data.token
        let username = response.data.username
        let userid = response.data.id
        console.log(token)
        console.log(userid)

        localStorage.setItem('userid', userid)  //Mike TEST
        localStorage.setItem('jsonwebtoken', token)
        this.props.onAuthenticated(username, token)
        this.props.history.push('/')

        setAuthenticationHeader(token)
      })
      .catch(error => console.log(error))
  )

  handleInputChange = (e) => (

    this.setState({
      [e.target.name]: e.target.value
    })
  )



  render() {
    return (
      <div>
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
