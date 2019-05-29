import React,{Component} from 'react';
import axios from 'axios';
import {setAuthenticationHeader} from './utils/authentication'
import './styling/login.css'

class Register extends Component {
  constructor(){
    super()
    this.state={
      username:'',
      password:'',
      firstName:'',
      lastName:'',
      email:'',
      message:''
    }
  }

  handleTextBoxChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmitRegistration=()=>(
    axios.post('http://localhost:8080/register',{
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    })
    .then(response=>{
      let token = response.data.token
      localStorage.setItem('jsonwebtoken',token)
      this.props.onAuthenticated(token)
      setAuthenticationHeader(token)
    })
    .catch(error=>alert("Username, password, or email is incorrect! Username must be 6-20 characters. Password must be 6-20 characters with one uppercase and lowercase letter and at least one number. Must use a valid email."))
  )

  render(){
    return(
      <div>
      <h1>Register</h1>
      <input name="username" onChange={this.handleTextBoxChange} placeholder="New Username"/>
      <input name="password" onChange={this.handleTextBoxChange} type="password" placeholder="New Password"/>
      <input name="firstName" onChange={this.handleTextBoxChange} placeholder="First Name"/>
      <input name="lastName" onChange={this.handleTextBoxChange} placeholder="Last Name"/>
      <input name="email" type='email' onChange={this.handleTextBoxChange} placeholder="Email"/>
      <button onClick={this.handleSubmitRegistration}>Register</button>
      </div>
    )
  }
}
export default Register
