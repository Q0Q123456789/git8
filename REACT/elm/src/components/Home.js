import React, { Component } from 'react';
import '../index.css';
import './home.less';
import {Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
        <div id='home' className="home">
            HOME；
            {this.props.children}
            <Link to='/Home/HomeHeader'>111</Link>
        </div>  
    );
  }
}

export default Home;