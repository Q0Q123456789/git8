import React, { Component } from 'react';
// import logo from './logo.svg';
import './static/basic.css';

import { Link } from 'react-router' 

class App extends Component {
  render() {
    return (
      <div className="App">
      
      <div className="header">
        <ul>
          <li><Link to="/home">首页</Link></li>
          <li><Link to="/news">新闻</Link></li>
          <li><Link to="/user">用户</Link></li>
        </ul>
      </div>

        {/*显示路由动态加载的组件*/}
	       {this.props.children}
      </div>
    );
  }
}

export default App;
