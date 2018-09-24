var AppDispatcher = require('./dispatch');

var ButtonActions = {
  addNewItem: function (text) {
    AppDispatcher.dispatch({
      actionType: 'IS_HIDE',
      text: text,
    });
  }
};
module.exports = ButtonActions;
