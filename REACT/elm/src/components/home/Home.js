import React, { Component } from 'react';
import './home.less';
import logo from '../../logo.svg'
import {Link } from "react-router-dom";

import { SearchBar, Grid } from 'antd-mobile';

const Action = require('../../stores/action');

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      active:'123456',
      title:'张萌这个吊毛',
      list:[
        {name:'富强',vlaue:'1',id:1},
        {name:'民主',vlaue:'2',id:2},
        {name:'文明',vlaue:'3',id:3},
        {name:'和谐',vlaue:'4',id:4},
        {name:'自由',vlaue:'5',id:5},
        {name:'平等',vlaue:'6',id:6},
        {name:'公正',vlaue:'7',id:7},
        {name:'法治',vlaue:'8',id:8},
        {name:'爱国',vlaue:'9',id:9},
        {name:'敬业',vlaue:'10',id:10},
        {name:'诚信',vlaue:'11',id:11},
        {name:'友善',vlaue:'12',id:12},
      ],
      inputValue:''
    }
  }
  componentWillMount(){

  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  
  render() {
    // const items = [];
    // this.state.list.map(function(item){
    //   items.push(<Link to={'/Home/HomeHeader/'+ item.id +'/' + item.name} >{item.name}</Link>);
    // })
    const data = this.state.list.map((_val, i) => ({
      name: _val.name,
      vlaue: _val.vlaue,
      id: _val.id
    }));
    const dateTime = this.dateTime();
    return (
      
        <div id='home' className="home">
          <nav className="nav">
            <SearchBar placeholder="搜索" ref={ref => this.autoFocusInst = ref} onSubmit={value => this.Input(value)}  onBlur={() => console.log(123)} />
          </nav>
          <div className='mian'>
            <div>
            <Grid data={data} hasLine={true} columnNum={4} renderItem={ Item => (
            <div onClick={() => this.changeVisible(false) }><Link to={'/Home/HomeHeader/'+ Item.id +'/' + Item.name +'/'+ dateTime}  >{Item.name}</Link></div>
            )} />
              {/* <ul className='mian_ul'> */}
                {/* {items} */}
                  {/* {this.state.list.map(function (item,key){ */}
                    {/* return <li key={key} ><Link to={'/Home/HomeHeader/'+ item.id +'/' + item.name +'/'+ dateTime} >{item.name}</Link></li> */}
                  {/* })} </ul> */}
            </div>
          </div>
          <div className='input_value'>{this.state.inputValue}</div>
          <div className='logo'><img src={logo} className="App-logo" alt="logo"/></div>
          {this.props.children}
        </div>
    );
  }
  Input(value){
    this.setState({
      inputValue:value
    })
  }
  dateTime(){
    let date = new Date();
    let Time = date.toLocaleTimeString();
    return Time;
  }
  changeVisible(v){
    Action.addNewItem(v);
  }
}

export default Home;
