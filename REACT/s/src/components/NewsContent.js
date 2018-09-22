import React, { Component } from 'react';

import { Link } from 'react-router';

import axios from 'axios';

import img1 from '../static/images/collect.png'

import img2 from '../static/images/nocollect.png'


//引入自定义模块


import storage  from '../module/Storage.js';


// console.log(storage);

/*解析html

https://facebook.github.io/react/docs/dom-elements.html


function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}



*/
class NewsContent extends Component{



    constructor(props){
        super(props);

        this.state={

            list:'',
            isColect:false
        }



        this.requestData=this.requestData.bind(this);

        this.collect=this.collect.bind(this);
    }

    componentWillMount(){


        console.log(this.props.params);  /*获取动态路由传值*/

        var aid=this.props.params.aid;
        this.requestData(aid);
    }


    getContent(){

        return {__html:this.state.list.content};

    }

    //请求数据的方法
    requestData(aid){    

            var that=this;    
            var  url='http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid='+aid;
            axios.get(url)
            .then(function (response) {
                console.log(response.data.result);

                that.setState({

                        list:response.data.result[0]
                });



                  //判断有没有收藏

                     var collectStorageData=storage.get('collect');

                    if(storage.hasCollect(response.data.result[0].aid,collectStorageData)){

                            that.setState({

                                isColect:true
                            })

                    }else{

                             that.setState({                            
                                    isColect:false
                            })

                    }
        
                
            })
            .catch(function (error) {
                    console.log(error);
            });
    
    }   
    //收藏的方法
    collect(){
        

        //获取收藏的内容

        var collectData=[{
            aid:this.state.list.aid,
            title:this.state.list.title
        }];


        //1.从localstorag获取数据

        var collectStorageData=storage.get('collect');

        //2.判断是否存在

        if(collectStorageData){





            //判断localstorage有没有收藏的数据
            if(storage.hasCollect(this.state.list.aid,collectStorageData)){  /*有数据*/

                //删除数据

                for(var i=0;i<collectStorageData.length;i++){
                    
                    if(this.state.list.aid==collectStorageData[i].aid){
                        collectStorageData.splice(i,1);                        
                    }
                }

                //重新写入数据
  
                storage.set('collect',collectStorageData);   

                 //改变收藏的状态 
                 this.setState({
                    
                         isColect:false
                 })



            }else{ /*没有数据*/
                var newData=collectData.concat(collectStorageData);
                
                storage.set('collect',newData);   
                //改变收藏的状态 
                this.setState({
                    
                         isColect:true
                 })

            }
            


            //如果没有要增加 ，如果有要删除            


        }else{ /*第一次*/

            storage.set('collect',collectData);   

            //改变收藏的状态 
            this.setState({
                
                     isColect:true
             })

        }





    }
    render(){

        //判断加载的图片
        var collectImg=this.state.isColect?img1:img2;

        return(

            <div>
            
            
              <h2>{this.state.list.title}----  <div onClick={this.collect}><img src={collectImg} /></div></h2>


              <div className="content">
                    {/*<div dangerouslySetInnerHTML={this.getContent()} />;*/}



                    <div dangerouslySetInnerHTML={{__html:this.state.list.content}} />;


              </div>
            
            
            </div>
        )
    }
}

export default NewsContent;