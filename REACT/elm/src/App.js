import React, { Component } from 'react';
import './App.css';
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
    console.log(common)
    common.fontSizeRem();
  }
  tabclick(index){
      this.setState({
        active:index
      })
  }
  render() {
    return (
      <div className="App">
      {this.props.children}
        <ul>
          <li onClick={() => this.tabclick('1')} ><NavLink to='/' exact  activeClassName="pitchOn">首页</NavLink></li>
          <li onClick={() => this.tabclick('2')} ><NavLink to='/News' activeClassName="pitchOn">子页</NavLink></li>
          <li onClick={() => this.tabclick('3')} ><NavLink to='/Header'activeClassName="pitchOn">子页</NavLink></li>
          <li onClick={() => this.tabclick('4')} ><NavLink to='/Footer' activeClassName="pitchOn">子页</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default App;
