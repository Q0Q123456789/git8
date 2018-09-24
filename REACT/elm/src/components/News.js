
import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import './news.less'

class News extends Component {
  constructor(props) {
    super(props)
    this.state={
      active:'1',
      list:[]
    }
    this.$http = this.$http.bind(this);
  };

  componentWillMount() {
    console.log(1)
    this.$http();
  };

  componentDidMount() {
    console.log(2)
  };
  componentWillUnmount() {
    console.log(7)
  };

  render() {
    return (
      <div id='news' className="news">
        <ul className='list-inline'>
          {this.state.list.map(function(item,key){
            return <li key={key}><Link to={'/News/newsDetails/' + item.aid}>{key+1}、{item.title}</Link></li>
          })}
        </ul>
        {this.props.children}
      </div>
    )
  };
  $http(){
    const that = this;
    let url = 'http://www.phonegap100.com/appapi.php';
    axios.get(url,{
      params:{
        a:'getPortalList',
        catid:20,
        page:0
      }
    })
    .then(response => {
      that.setState({
        list:response.data.result
      });
    })
    .catch(error => console.log(error));
  };
}

export default News;