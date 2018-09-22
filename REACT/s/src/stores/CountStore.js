var EventEmitter = require('events').EventEmitter;    /*事件驱动的模块  广播模块*/
var assign = require('object-assign');   // Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。


//Store放数据   可以存储  修改数据
var CountStore = assign({}, 
    EventEmitter.prototype,
     {
      count: 1,  /*数据*/
      
      addCount: function () {  /*修改数据*/
        this.count++;
      },
      getCount:function(){  /*获取数据*/

           return this.count; 
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
  module.exports = CountStore;

