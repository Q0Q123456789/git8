var EventEmitter = require('events').EventEmitter;    /*事件驱动的模块  广播模块*/
var assign = require('object-assign');   // Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。


//Store放数据   可以存储  修改数据
var ListStore = assign({}, 
    EventEmitter.prototype,
     {
      list: [],  /*数据*/
      
      addData: function (listData) {  /*修改数据*/
        // this.list.concat(listData);   /*不能这样写*/


        this.list=this.list.concat(listData);
      },
      getData:function(){  /*获取数据*/

           return this.list; 
      },    
  
      emitChange: function () {  /*store改变以后通知 视图要改变数据的方法*/
            this.emit('change');  /*发送广播*/
      },
        
      addChangeListener: function(callback) {   /*注册监听广播的事件   在组件里面用*/
            this.on('change', callback);
      },
  
      removeChangeListener: function(callback) {  /*移除事件监听*/
        this.removeListener('change', callback);
      }    
        
  });  
  module.exports = ListStore;

