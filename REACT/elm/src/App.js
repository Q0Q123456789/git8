import React, {Component} from 'react';
import './App.less';
import {NavLink} from "react-router-dom";
import common from './config/common';

const Store = require('./stores/stores');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: '1',
      visible: Store.isHide
    }
  }
  componentWillMount() {
    let that = this;
    common.fontSizeRem();
    Store.addChangeListener(function () {
      that.setState({
        visible: Store.isHide
      })
    })
  }
  tabclick(index) {
    this.setState({
      active: index
    })
  }
  render() {
    return ( 
    <div className = "App" id = 'app' > 
      {React.Children.map(this.props.children, function (params) {
          return <div ref = 'div' > {params } </div>
        })
      } 
      <div className={this.state.visible ?"show":"hide"}>
        <ul className ='Navigation'>
          <li > < NavLink to = '/' exact activeClassName = "pitchOn" > 首页 </NavLink></li >
          <li > < NavLink to = '/News' activeClassName = "pitchOn" > 新闻 </NavLink></li >
          <li > < NavLink to = '/Header' activeClassName = "pitchOn" > 子页 </NavLink></li >
          <li > < NavLink to = '/Footer' activeClassName = "pitchOn" > 子页 </NavLink></li >
        </ul>
      </div>
    </div>
    );
  }
}

export default App;