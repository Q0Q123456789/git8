var Dispatcher = require('flux').Dispatcher;   /*引入Dispatcher*/
var CountDispatcher = new Dispatcher();   /*实例化派发器*/

var CountStore = require('../stores/CountStore');





CountDispatcher.register(function (action) {   /*监听 action发送的数据*/
    switch(action.actionType) {
      case 'ADD_COUNT':
         CountStore.addCount(); /*调用store更新 count的数据*/  /*action.text数据*/
         CountStore.emitChange();   /*广播数据通知视图  数据改变*/
        break;
      default:
        // no op
    }
  })


  module.exports=CountDispatcher;
 
  