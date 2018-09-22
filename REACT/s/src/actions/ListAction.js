

//action 里面需要引入派发器

var ListDispatch = require('../dispatchers/ListDispatch');



var ListActions = {
    
      addList: function (text) {
        ListDispatch.dispatch({
          actionType: 'ADD_LIST',
          text: text
        });
      }
    };

 module.exports = ListActions;