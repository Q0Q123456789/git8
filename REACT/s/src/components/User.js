import React, { Component } from 'react';


var Store=require('../stores/CountStore');


var CountAction=require('../actions/CountAction');
console.log(CountAction);

class User extends Component{



    constructor(props){
        super(props);

        this.state={

            count:Store.count
        }



    }

    componentWillMount(){


        var that=this;
        Store.addChangeListener(function(){  /*注册监听事件*/

            that.setState({   /*改变以后  store通知view  view接收到广播以后要更新数据*/

                count:Store.count
            })
        })
    }

    chageStateCount(){

        CountAction.addCount();  /*点击视图调用action里面的addcount方法*/

    }

    render(){

        return(

            <div>
                <div>
                这是一个首页组件
                </div>


                <div>         {this.state.count}</div>


                <button onClick={this.chageStateCount}>改变store的数据</button>
            
            </div>
        )
    }
}

export default User;