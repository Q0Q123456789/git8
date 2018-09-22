var Dispatcher = require('flux').Dispatcher;   /*引入Dispatcher*/
var ListDispatch = new Dispatcher();   /*实例化派发器*/

var ListStore = require('../stores/ListStore');





ListDispatch.register(function (action) {   /*监听 action发送的数据*/
    switch(action.actionType) {
      case 'ADD_LIST':
         ListStore.addData(action.text); /*调用store更新 count的数据*/  /*action.text数据*/
         ListStore.emitChange();   /*广播数据通知视图  数据改变*/
        break;
      default:
        // no op
    }
  })


  module.exports=ListDispatch;
 
  