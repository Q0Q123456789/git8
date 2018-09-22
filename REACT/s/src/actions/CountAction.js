

//action 里面需要引入派发器

var CountDispatch = require('../dispatchers/CountDispatch');



var CountActions = {
    
      addCount: function (text) {
        CountDispatch.dispatch({
          actionType: 'ADD_COUNT',
          text: text
        });
      }
    };

 module.exports = CountActions;