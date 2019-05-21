import React,{Component} from 'react';
// import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './Header.js';
import './styling/BaseLayout.css';

class BaseLayout extends Component {
  render(){
  return (
    <div>
      <Header className="headerOrientation" onLogout={this.props.onLogout} isAuthenticated={this.props.isAuthenticated}
      history={this.props.history}/>
      {this.props.children}
    </div>
  )};
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onLogout:()=>dispatch({type:"LOGOUT"})
  }
}

const mapStateToProps=(state)=>{
  return{
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BaseLayout))
