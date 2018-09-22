import React, { Component } from 'react';

import { Link } from 'react-router';

import axios from 'axios';

var ListStore=require('../stores/ListStore');

// console.log(ListStore);


var ListAction=require('../actions/ListAction');


class News extends Component{



    constructor(props){
        super(props);


        this.state={


            list:[]
        }

        this.requestData=this.requestData.bind(this);

    }

    componentWillMount(){       
        
    //ListStore.list 就是store里面的数据

        if(ListStore.list.length>0){   /*liststore有数据*/

            this.setState({
                    list:ListStore.list
            })
        }else{

            this.requestData();      
        }
      
        
        
        ListStore.addChangeListener(function(){   /*监听数据改变*/


            console.log(ListStore.list);
        })
    }

    render(){

        return(

            <div>
            
            
                <ul>

                    {

                        this.state.list.map(function(value,key){

                                return <li key={key}><Link to={"/newscontent/"+value.aid}>{value.title}</Link></li>
                        })
                    }
                 
                </ul>
            
            
            </div>
        )
    }
    //请求数据的方法
    requestData(){

        var that=this;

        var  url='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
        axios.get(url)
        .then(function (response) {
            //  console.log(response.data.result);


            that.setState({
                    list:response.data.result
            })

            //请求完成数据 把数据放在store里面

            ListAction.addList(response.data.result);

        })
        .catch(function (error) {
              console.log(error);
        });

    }
}

export default News;