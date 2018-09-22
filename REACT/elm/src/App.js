import React, { Component } from 'react';
import './App.less';
import {NavLink} from "react-router-dom";
import common from './config/common';
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      active:'1',
      visible:true
    }
  }
  componentWillMount(){
    common.fontSizeRem();
    console.log(this.refs.div)
    
  }
  tabclick(index){
      this.setState({
        active:index
      })
  }
  visible(v){
    console.log(v)
  }
  render() {
    return (
      <div className="App" id='app'>
      {React.Children.map(this.props.children,function (params) {
          return <div ref='div'>{params}</div>
      })}
      {/* <Switch visible={this.visible.bind(this)}>{this.props.children}</Switch> */}
      {this.state.visible?( <ul className="Navigation" >
          <li ><NavLink to='/' exact  activeClassName="pitchOn">首页</NavLink></li>
          <li ><NavLink to='/News' activeClassName="pitchOn">子页</NavLink></li>
          <li ><NavLink to='/Header' activeClassName="pitchOn">子页</NavLink></li>
          <li ><NavLink to='/Footer' activeClassName="pitchOn">子页</NavLink></li>
        </ul>):('')}
      </div>
    );
  }
}

export default App;
