import React, { Component } from 'react';
import './App.less';
import 'antd/dist/antd.less';
import {NavLink } from "react-router-dom";
import common from './config/common';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      active:'1'
    }
  }
  componentWillMount(){
    console.log(this.props)
    console.log(this.state.active)
    common.fontSizeRem();
  }
  tabclick(index){
      this.setState({
        active:index
      })
  }
  render() {
    return (
      <div className="App" id='app'>
      {this.props.children}
        <ul className="Navigation">
          <li ><NavLink to='/' exact  activeClassName="pitchOn">首页</NavLink></li>
          <li ><NavLink to='/News' activeClassName="pitchOn">子页</NavLink></li>
          <li ><NavLink to='/Header'activeClassName="pitchOn">子页</NavLink></li>
          <li ><NavLink to='/Footer' activeClassName="pitchOn">子页</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default App;
