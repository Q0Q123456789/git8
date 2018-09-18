import React, { Component } from 'react';
import './home.less';
import {Link } from "react-router-dom";

import { Input } from 'antd';

const Search = Input.Search;
class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      active:'123456',
      title:'张萌这个吊毛'
    }
  }
  
  render() {
    return (
        <div id='home' className="home">
          <nav className="nav">
            <Search placeholder="input search text" onSearch={value => this.Input(value)} style={{ width: 200 }} />
          </nav>
            {this.props.children}
            <Link to={'/Home/HomeHeader/'+ this.state.active +'/' + this.state.title} >111</Link>
        </div>  
    );
  }
  Input(value){
    console.log(value)
  }
}

export default Home;