import React,{Component} from 'react';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './Header.js';
import './styling/BaseLayout.css';

class BaseLayout extends Component {
  render(){
  return (
    <div>
      <Header className="headerOrientation"/>
      {this.props.children}
    </div>
  )};
}

export default BaseLayout;
